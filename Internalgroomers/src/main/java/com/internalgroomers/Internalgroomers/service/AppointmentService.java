package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.entity.*;
import com.internalgroomers.Internalgroomers.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final ServiceRepository serviceRepository;
    private final CustomerRepository customerRepository;
    private final SalonRepository salonRepository;
    private final AppointmentSlotRepository slotRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              ServiceRepository serviceRepository,
                              CustomerRepository customerRepository,
                              SalonRepository salonRepository,
                              AppointmentSlotRepository slotRepository) {
        this.appointmentRepository = appointmentRepository;
        this.serviceRepository = serviceRepository;
        this.customerRepository = customerRepository;
        this.salonRepository = salonRepository;
        this.slotRepository = slotRepository;
    }

    @Transactional
    public Appointment createAppointment(Long customerId, Long salonId, Long serviceId,
                                         OffsetDateTime startTime, Long slotId) {
        ServiceEntity svc = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id " + serviceId));

        Customer cust = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id " + customerId));

        Salon salon = salonRepository.findById(salonId)
                .orElseThrow(() -> new IllegalArgumentException("Salon not found with id " + salonId));

        OffsetDateTime endTime = startTime.plusMinutes(svc.getDurationMinutes());

        // Check if slot is provided and available
        AppointmentSlot slot = null;
        if (slotId != null) {
            slot = slotRepository.findById(slotId)
                    .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

            if (!slot.getIsAvailable()) {
                throw new IllegalStateException("Selected slot is not available");
            }

            if (!slot.getSalon().getId().equals(salonId)) {
                throw new IllegalStateException("Slot does not belong to this salon");
            }
        }

        // Check for conflicts
        List<Appointment> conflicts = appointmentRepository.findConflicting(salonId, startTime, endTime);
        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Time slot not available");
        }

        Appointment appt = new Appointment();
        appt.setSalon(salon);
        appt.setService(svc);
        appt.setCustomer(cust);
        appt.setStartTime(startTime);
        appt.setEndTime(endTime);
        appt.setStatus("PENDING"); // Changed from CONFIRMED to PENDING
        appt.setSlot(slot);

        if (slot != null && slot.getStaff() != null) {
            appt.setStaff(slot.getStaff());
        }

        // Mark slot as unavailable if used
        if (slot != null) {
            slot.setIsAvailable(false);
            slotRepository.save(slot);
        }

        return appointmentRepository.save(appt);
    }

    public List<Appointment> getBookingsForCustomer(Long customerId) {
        return appointmentRepository.findByCustomerId(customerId);
    }

    public List<Appointment> getBookingsForSalon(Long salonId) {
        return appointmentRepository.findBySalonId(salonId);
    }

    public List<Appointment> getPendingBookingsForSalon(Long salonId) {
        return appointmentRepository.findBySalonIdAndStatus(salonId, "PENDING");
    }

    @Transactional
    public void cancelAppointment(Long appointmentId, Long customerId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        if (!appointment.getCustomer().getId().equals(customerId)) {
            throw new IllegalStateException("You are not authorized to cancel this appointment");
        }

        appointment.setStatus("CANCELLED");

        // Free up the slot if it was used
        if (appointment.getSlot() != null) {
            AppointmentSlot slot = appointment.getSlot();
            slot.setIsAvailable(true);
            slotRepository.save(slot);
        }

        appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment confirmAppointment(Long appointmentId, Customer salonOwner) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        Salon salon = salonRepository.findByOwner(salonOwner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!appointment.getSalon().getId().equals(salon.getId())) {
            throw new IllegalStateException("You are not authorized to confirm this appointment");
        }

        if (!"PENDING".equals(appointment.getStatus())) {
            throw new IllegalStateException("Only pending appointments can be confirmed");
        }

        appointment.setStatus("CONFIRMED");
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment rejectAppointment(Long appointmentId, Customer salonOwner, String reason) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        Salon salon = salonRepository.findByOwner(salonOwner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!appointment.getSalon().getId().equals(salon.getId())) {
            throw new IllegalStateException("You are not authorized to reject this appointment");
        }

        if (!"PENDING".equals(appointment.getStatus())) {
            throw new IllegalStateException("Only pending appointments can be rejected");
        }

        appointment.setStatus("REJECTED");
        appointment.setRejectionReason(reason);

        // Free up the slot
        if (appointment.getSlot() != null) {
            AppointmentSlot slot = appointment.getSlot();
            slot.setIsAvailable(true);
            slotRepository.save(slot);
        }

        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment rescheduleAppointment(Long appointmentId, Long customerId,
                                             OffsetDateTime newStartTime, Long newSlotId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        if (!appointment.getCustomer().getId().equals(customerId)) {
            throw new IllegalStateException("You are not authorized to reschedule this appointment");
        }

        ServiceEntity svc = appointment.getService();
        OffsetDateTime newEndTime = newStartTime.plusMinutes(svc.getDurationMinutes());

        // Check for conflicts
        List<Appointment> conflicts = appointmentRepository.findConflicting(
                appointment.getSalon().getId(), newStartTime, newEndTime);
        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Time slot not available");
        }

        // Free up old slot if exists
        if (appointment.getSlot() != null) {
            AppointmentSlot oldSlot = appointment.getSlot();
            oldSlot.setIsAvailable(true);
            slotRepository.save(oldSlot);
        }

        // Handle new slot
        AppointmentSlot newSlot = null;
        if (newSlotId != null) {
            newSlot = slotRepository.findById(newSlotId)
                    .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

            if (!newSlot.getIsAvailable()) {
                throw new IllegalStateException("Selected slot is not available");
            }

            newSlot.setIsAvailable(false);
            slotRepository.save(newSlot);
        }

        appointment.setStartTime(newStartTime);
        appointment.setEndTime(newEndTime);
        appointment.setSlot(newSlot);
        appointment.setStatus("PENDING"); // Reset to pending after rescheduling

        return appointmentRepository.save(appointment);
    }
}