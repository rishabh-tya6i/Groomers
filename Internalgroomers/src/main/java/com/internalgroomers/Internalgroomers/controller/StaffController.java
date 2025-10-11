package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.StaffDto;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Staff;
import com.internalgroomers.Internalgroomers.service.StaffService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<Staff> createStaff(
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "specialization", required = false) String specialization,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal Customer customer) {

        Staff staff = staffService.createStaff(customer, name, phone, email, specialization, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(staff);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<Staff>> getSalonStaff(@PathVariable Long salonId) {
        List<Staff> staff = staffService.getStaffBySalon(salonId);
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaff(@PathVariable Long id) {
        Staff staff = staffService.getStaffById(id);
        return ResponseEntity.ok(staff);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<Staff> updateStaff(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "specialization", required = false) String specialization,
            @RequestParam(value = "isActive", required = false, defaultValue = "true") Boolean isActive,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal Customer customer) {

        Staff staff = staffService.updateStaff(id, customer, name, phone, email, specialization, isActive, image);
        return ResponseEntity.ok(staff);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id, @AuthenticationPrincipal Customer customer) {
        staffService.deleteStaff(id, customer);
        return ResponseEntity.noContent().build();
    }
}