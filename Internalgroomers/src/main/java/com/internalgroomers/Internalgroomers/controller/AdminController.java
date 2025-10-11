package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.UpdateRoleRequest;
import com.internalgroomers.Internalgroomers.entity.Appointment;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = adminService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/salons")
    public ResponseEntity<List<Salon>> getAllSalons() {
        List<Salon> salons = adminService.getAllSalons();
        return ResponseEntity.ok(salons);
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = adminService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/customers/{id}/role")
    public ResponseEntity<Customer> updateCustomerRole(
            @PathVariable Long id,
            @RequestBody @Valid UpdateRoleRequest request) {
        Customer customer = adminService.updateCustomerRole(id, request.getRoles());
        return ResponseEntity.ok(customer);
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        adminService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/salons/{id}")
    public ResponseEntity<Void> deleteSalon(@PathVariable Long id) {
        adminService.deleteSalon(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/appointments/salon/{salonId}")
    public ResponseEntity<List<Appointment>> getAppointmentsBySalon(@PathVariable Long salonId) {
        List<Appointment> appointments = adminService.getAppointmentsBySalon(salonId);
        return ResponseEntity.ok(appointments);
    }
}