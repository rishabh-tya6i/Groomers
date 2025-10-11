package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.dto.SalonDto;
import com.internalgroomers.Internalgroomers.dto.ServiceDto;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalonService {

    private final SalonRepository salonRepository;
    private final ServiceRepository serviceRepository;

    @Autowired
    public SalonService(SalonRepository salonRepository, ServiceRepository serviceRepository) {
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
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

    public SalonDto createSalon(SalonDto salonDto) {
        Salon salon = convertToEntity(salonDto);
        Salon savedSalon = salonRepository.save(salon);
        return convertToDto(savedSalon);
    }

    public SalonDto updateSalon(Long id, SalonDto salonDto) {
        Salon existingSalon = salonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + id));

        existingSalon.setName(salonDto.getName());
        existingSalon.setDescription(salonDto.getDescription());
        existingSalon.setCity(salonDto.getCity());
        existingSalon.setContactPhone(salonDto.getContactPhone());
        existingSalon.setContactEmail(salonDto.getContactEmail());
        existingSalon.setImageUrl(salonDto.getImageUrl());

        Salon updatedSalon = salonRepository.save(existingSalon);
        return convertToDto(updatedSalon);
    }

    public ServiceEntity createService(Long salonId, ServiceDto serviceDto) {
        Salon salon = salonRepository.findById(salonId)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + salonId));

        ServiceEntity service = new ServiceEntity();
        service.setName(serviceDto.getName());
        service.setDescription(serviceDto.getDescription());
        service.setPriceCents(serviceDto.getPriceCents());
        service.setDurationMinutes(serviceDto.getDurationMinutes());
        service.setSalon(salon);

        return serviceRepository.save(service);
    }

    public ServiceEntity updateService(Long serviceId, ServiceDto serviceDto) {
        ServiceEntity existingService = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + serviceId));

        existingService.setName(serviceDto.getName());
        existingService.setDescription(serviceDto.getDescription());
        existingService.setPriceCents(serviceDto.getPriceCents());
        existingService.setDurationMinutes(serviceDto.getDurationMinutes());

        return serviceRepository.save(existingService);
    }

    public void deleteService(Long serviceId) {
        serviceRepository.deleteById(serviceId);
    }

    private Salon convertToEntity(SalonDto dto) {
        Salon salon = new Salon();
        salon.setName(dto.getName());
        salon.setDescription(dto.getDescription());
        salon.setCity(dto.getCity());
        salon.setContactPhone(dto.getContactPhone());
        salon.setContactEmail(dto.getContactEmail());
        salon.setImageUrl(dto.getImageUrl());
        return salon;
    }

    // Convert entity to DTO
    public SalonDto convertToDto(Salon salon) {
        SalonDto dto = new SalonDto();
        dto.setId(salon.getId());
        dto.setName(salon.getName());
        dto.setDescription(salon.getDescription());
        dto.setCity(salon.getCity());
        dto.setContactPhone(salon.getContactPhone());
        dto.setContactEmail(salon.getContactEmail());
        dto.setImageUrl(salon.getImageUrl());
        return dto;
    }
}
