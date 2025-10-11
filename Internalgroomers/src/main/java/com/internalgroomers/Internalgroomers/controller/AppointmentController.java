package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.CreateAppointmentRequest;
import com.internalgroomers.Internalgroomers.dto.RescheduleAppointmentRequest;
import com.internalgroomers.Internalgroomers.dto.RejectAppointmentRequest;
import com.internalgroomers.Internalgroomers.entity.Appointment;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Appointment> book(@RequestBody @Valid CreateAppointmentRequest req,
                                            @AuthenticationPrincipal Customer customer) {
        Appointment appt = appointmentService.createAppointment(
                customer.getId(),
                req.getSalonId(),
                req.getServiceId(),
                req.getStartTime(),
                req.getSlotId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(appt);
    }

    @GetMapping("/my-bookings")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Appointment>> getMyBookings(@AuthenticationPrincipal Customer customer) {
        List<Appointment> bookings = appointmentService.getBookingsForCustomer(customer.getId());
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id,
                                                  @AuthenticationPrincipal Customer customer) {
        appointmentService.cancelAppointment(id, customer.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/reschedule")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Appointment> rescheduleAppointment(@PathVariable Long id,
                                                             @RequestBody @Valid RescheduleAppointmentRequest req,
                                                             @AuthenticationPrincipal Customer customer) {
        Appointment appointment = appointmentService.rescheduleAppointment(
                id, customer.getId(), req.getNewStartTime(), req.getNewSlotId());
        return ResponseEntity.ok(appointment);
    }

    // Salon endpoints
    @GetMapping("/salon/pending")
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<List<Appointment>> getPendingAppointments(@AuthenticationPrincipal Customer customer) {
        // Get salon by owner and then get pending appointments
        List<Appointment> appointments = appointmentService.getPendingBookingsForSalon(
                customer.getId()); // This will be fixed in service layer
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/{id}/confirm")
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<Appointment> confirmAppointment(@PathVariable Long id,
                                                          @AuthenticationPrincipal Customer customer) {
        Appointment appointment = appointmentService.confirmAppointment(id, customer);
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<Appointment> rejectAppointment(@PathVariable Long id,
                                                         @RequestBody @Valid RejectAppointmentRequest req,
                                                         @AuthenticationPrincipal Customer customer) {
        Appointment appointment = appointmentService.rejectAppointment(id, customer, req.getReason());
        return ResponseEntity.ok(appointment);
    }
}