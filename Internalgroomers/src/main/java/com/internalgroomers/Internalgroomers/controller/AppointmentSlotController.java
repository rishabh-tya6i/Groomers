package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.AppointmentSlotDto;
import com.internalgroomers.Internalgroomers.entity.AppointmentSlot;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.service.AppointmentSlotService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class AppointmentSlotController {

    private final AppointmentSlotService slotService;

    public AppointmentSlotController(AppointmentSlotService slotService) {
        this.slotService = slotService;
    }

    @PostMapping
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<AppointmentSlot> createSlot(
            @RequestBody @Valid AppointmentSlotDto slotDto,
            @AuthenticationPrincipal Customer customer) {
        AppointmentSlot slot = slotService.createSlot(customer, slotDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(slot);
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<List<AppointmentSlot>> createBulkSlots(
            @RequestBody @Valid List<AppointmentSlotDto> slotDtos,
            @AuthenticationPrincipal Customer customer) {
        List<AppointmentSlot> slots = slotService.createBulkSlots(customer, slotDtos);
        return ResponseEntity.status(HttpStatus.CREATED).body(slots);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<AppointmentSlot>> getSalonSlots(
            @PathVariable Long salonId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime endDate,
            @RequestParam(required = false, defaultValue = "true") Boolean availableOnly) {

        List<AppointmentSlot> slots;
        if (startDate != null && endDate != null) {
            slots = slotService.getAvailableSlotsByDateRange(salonId, startDate, endDate);
        } else if (availableOnly) {
            slots = slotService.getAvailableSlots(salonId);
        } else {
            slots = slotService.getAllSlots(salonId);
        }

        return ResponseEntity.ok(slots);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SALON')")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id, @AuthenticationPrincipal Customer customer) {
        slotService.deleteSlot(id, customer);
        return ResponseEntity.noContent().build();
    }
}