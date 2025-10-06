package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.dto.SalonDto;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalonService {

    private final SalonRepository salonRepository;

    @Autowired
    public SalonService(SalonRepository salonRepository) {
        this.salonRepository = salonRepository;
    }

    // Get all salons
    public List<SalonDto> getAllSalons() {
        return salonRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get single salon by ID
    public SalonDto getSalonById(Long id) {
        return salonRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + id));
    }

    // Save or update salon
    public SalonDto saveSalon(Salon salon) {
        Salon saved = salonRepository.save(salon);
        return convertToDto(saved);
    }

    // Convert entity to DTO
    private SalonDto convertToDto(Salon salon) {
        SalonDto dto = new SalonDto();
        dto.setId(salon.getId());
        dto.setName(salon.getName());
        dto.setDescription(salon.getDescription());
        dto.setCity(salon.getCity());
        dto.setContactPhone(salon.getContactPhone());
        dto.setContactEmail(salon.getContactEmail());
        return dto;
    }
}
