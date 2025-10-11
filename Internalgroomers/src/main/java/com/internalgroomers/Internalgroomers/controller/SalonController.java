package com.internalgroomers.Internalgroomers.controller;
import com.internalgroomers.Internalgroomers.dto.SalonDto;
import com.internalgroomers.Internalgroomers.entity.Appointment;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.repository.ServiceRepository;
import com.internalgroomers.Internalgroomers.service.AppointmentService;
import com.internalgroomers.Internalgroomers.service.SalonService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
public class SalonController {
    private final SalonService salonService;
    private final SalonRepository salonRepository;
    private final ServiceRepository serviceRepository;
    private final AppointmentService appointmentService;

    public SalonController(SalonService salonService, SalonRepository salonRepository, ServiceRepository serviceRepository, AppointmentService appointmentService) {
        this.salonService = salonService;
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Salon> getAll() {
        return salonRepository.findAll();
    }

    @GetMapping("/{id}")
    public Salon getById(@PathVariable Long id) {
        return salonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salon not found"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SalonDto createSalon(@RequestBody SalonDto salonDto) {
        return salonService.createSalon(salonDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public SalonDto updateSalon(@PathVariable Long id, @RequestBody SalonDto salonDto) {
        return salonService.updateSalon(id, salonDto);
    }

    @GetMapping("/nearby")
    public List<Salon> searchNearby(@RequestParam double lat,
                                    @RequestParam double lon,
                                    @RequestParam(defaultValue = "5") double radiusKm) {
        return salonRepository.findNearby(lat, lon, radiusKm);
    }

    @GetMapping("/{id}/services")
    public List<ServiceEntity> getSalonServices(@PathVariable Long id) {
        return serviceRepository.findBySalonId(id);
    }

    @GetMapping("/{salonId}/appointments")
    public List<Appointment> getSalonAppointments(@PathVariable Long salonId) {
        return appointmentService.getBookingsForSalon(salonId);
    }

    @GetMapping("/my-salon")
    @PreAuthorize("hasRole('ADMIN')")
    public SalonDto getMySalon(@AuthenticationPrincipal com.internalgroomers.Internalgroomers.entity.Customer customer) {
        return salonRepository.findByOwner(customer)
                .map(salonService::convertToDto)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));
    }

    @PostMapping("/{salonId}/services")
    @PreAuthorize("hasRole('ADMIN')")
    public com.internalgroomers.Internalgroomers.entity.ServiceEntity createService(@PathVariable Long salonId, @Valid @RequestBody com.internalgroomers.Internalgroomers.dto.ServiceDto serviceDto) {
        return salonService.createService(salonId, serviceDto);
    }
}

