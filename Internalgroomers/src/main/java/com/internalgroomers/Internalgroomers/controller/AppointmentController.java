package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.CreateAppointmentRequest;
import com.internalgroomers.Internalgroomers.dto.RescheduleAppointmentRequest;
import com.internalgroomers.Internalgroomers.entity.Appointment;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Appointment> book(@RequestBody @Valid CreateAppointmentRequest req, @AuthenticationPrincipal Customer customer) {
        Appointment appt = appointmentService.createAppointment(customer.getId(),
                req.getSalonId(),
                req.getServiceId(),
                req.getStartTime());
        return ResponseEntity.status(HttpStatus.CREATED).body(appt);
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Appointment>> getMyBookings(@AuthenticationPrincipal Customer customer) {
        List<Appointment> bookings = appointmentService.getBookingsForCustomer(customer.getId());
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id, @AuthenticationPrincipal Customer customer) {
        appointmentService.cancelAppointment(id, customer.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<Appointment> rescheduleAppointment(@PathVariable Long id, @RequestBody @Valid RescheduleAppointmentRequest req, @AuthenticationPrincipal Customer customer) {
        Appointment appointment = appointmentService.rescheduleAppointment(id, customer.getId(), req.getNewStartTime());
        return ResponseEntity.ok(appointment);
    }
}
