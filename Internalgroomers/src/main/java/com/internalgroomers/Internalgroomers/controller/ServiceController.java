
package com.internalgroomers.Internalgroomers.controller;

import com.internalgroomers.Internalgroomers.dto.ServiceDto;
import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import com.internalgroomers.Internalgroomers.service.SalonService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final SalonService salonService;

    public ServiceController(SalonService salonService) {
        this.salonService = salonService;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ServiceEntity updateService(@PathVariable Long id, @Valid @RequestBody ServiceDto serviceDto) {
        return salonService.updateService(id, serviceDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteService(@PathVariable Long id) {
        salonService.deleteService(id);
    }
}
