package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.SalonDto;
import com.internalgroomers.Internalgroomers.entity.Appointment;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.repository.ServiceRepository;
import com.internalgroomers.Internalgroomers.service.AppointmentService;
import com.internalgroomers.Internalgroomers.service.SalonService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
public class SalonController {
    private final SalonService salonService;
    private final SalonRepository salonRepository;
    private final ServiceRepository serviceRepository;
    private final AppointmentService appointmentService;

    public SalonController(SalonService salonService, SalonRepository salonRepository,
                           ServiceRepository serviceRepository, AppointmentService appointmentService) {
        this.salonService = salonService;
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Salon> getAll() {
        return salonService.getAll();
    }

    @GetMapping("/{id}")
    public Salon getById(@PathVariable Long id) {
        return salonService.getByIdEntity(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public SalonDto createSalon(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("city") String city,
            @RequestParam("contactPhone") String contactPhone,
            @RequestParam("contactEmail") String contactEmail,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        return salonService.createSalon(name, description, city, contactPhone, contactEmail, image);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SALON')")
    public SalonDto updateSalon(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("city") String city,
            @RequestParam("contactPhone") String contactPhone,
            @RequestParam("contactEmail") String contactEmail,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal Customer customer) {
        return salonService.updateSalon(id, customer, name, description, city, contactPhone, contactEmail, image);
    }

    @GetMapping("/nearby")
    public List<Salon> searchNearby(@RequestParam double lat,
                                    @RequestParam double lon,
                                    @RequestParam(defaultValue = "5") double radiusKm) {
        return salonRepository.findNearby(lat, lon, radiusKm);
    }

    @GetMapping("/{id}/services")
    public List<ServiceEntity> getSalonServices(@PathVariable Long id) {
        return salonService.getSalonServices(id);
    }

    @GetMapping("/{salonId}/appointments")
    @PreAuthorize("hasRole('SALON')")
    public List<Appointment> getSalonAppointments(@PathVariable Long salonId,
                                                  @AuthenticationPrincipal Customer customer) {
        // Verify salon ownership in service layer
        return appointmentService.getBookingsForSalon(salonId);
    }

    @GetMapping("/my-salon")
    @PreAuthorize("hasRole('SALON')")
    public SalonDto getMySalon(@AuthenticationPrincipal Customer customer) {
        return salonRepository.findByOwner(customer)
                .map(salonService::convertToDto)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));
    }

    @PostMapping(value = "/{salonId}/services", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SALON')")
    public ServiceEntity createService(
            @PathVariable Long salonId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("priceCents") Long priceCents,
            @RequestParam("durationMinutes") Integer durationMinutes,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal Customer customer) {
        return salonService.createService(salonId, customer, name, description,
                priceCents, durationMinutes, image);
    }
}