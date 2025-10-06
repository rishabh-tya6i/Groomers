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

    public AppointmentService(AppointmentRepository appointmentRepository,
                              ServiceRepository serviceRepository,
                              CustomerRepository customerRepository,
                              SalonRepository salonRepository) {
        this.appointmentRepository = appointmentRepository;
        this.serviceRepository = serviceRepository;
        this.customerRepository = customerRepository;
        this.salonRepository = salonRepository;
    }

    @Transactional
    public Appointment createAppointment(Long customerId, Long salonId, Long serviceId, OffsetDateTime startTime) {
        ServiceEntity svc = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id " + serviceId));

        Customer cust = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id " + customerId));

        Salon salon = salonRepository.findById(salonId)
                .orElseThrow(() -> new IllegalArgumentException("Salon not found with id " + salonId));

        OffsetDateTime endTime = startTime.plusMinutes(svc.getDurationMinutes());

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
        appt.setStatus("CONFIRMED");

        return appointmentRepository.save(appt);
    }

    public List<Appointment> getBookingsForCustomer(Long customerId) {
        return appointmentRepository.findByCustomerId(customerId);
    }

    @Transactional
    public void cancelAppointment(Long appointmentId, Long customerId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        if (!appointment.getCustomer().getId().equals(customerId)) {
            throw new IllegalStateException("You are not authorized to cancel this appointment");
        }

        appointment.setStatus("CANCELLED");
        appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment rescheduleAppointment(Long appointmentId, Long customerId, OffsetDateTime newStartTime) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        if (!appointment.getCustomer().getId().equals(customerId)) {
            throw new IllegalStateException("You are not authorized to reschedule this appointment");
        }

        ServiceEntity svc = appointment.getService();
        OffsetDateTime newEndTime = newStartTime.plusMinutes(svc.getDurationMinutes());

        List<Appointment> conflicts = appointmentRepository.findConflicting(appointment.getSalon().getId(), newStartTime, newEndTime);
        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Time slot not available");
        }

        appointment.setStartTime(newStartTime);
        appointment.setEndTime(newEndTime);

        return appointmentRepository.save(appointment);
    }
}
