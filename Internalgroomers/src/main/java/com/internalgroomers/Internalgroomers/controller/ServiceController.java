package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import com.internalgroomers.Internalgroomers.service.SalonService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final SalonService salonService;

    public ServiceController(SalonService salonService) {
        this.salonService = salonService;
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SALON')")
    public ServiceEntity updateService(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("priceCents") Long priceCents,
            @RequestParam("durationMinutes") Integer durationMinutes,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal Customer customer) {
        return salonService.updateService(id, customer, name, description,
                priceCents, durationMinutes, image);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SALON')")
    public void deleteService(@PathVariable Long id, @AuthenticationPrincipal Customer customer) {
        salonService.deleteService(id, customer);
    }
}