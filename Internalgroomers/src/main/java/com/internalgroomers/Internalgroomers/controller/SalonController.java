package com.internalgroomers.Internalgroomers.controller;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.repository.ServiceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
public class SalonController {
    private final SalonRepository salonRepository;
    private final ServiceRepository serviceRepository;

    public SalonController(SalonRepository salonRepository, ServiceRepository serviceRepository) {
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
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
}

