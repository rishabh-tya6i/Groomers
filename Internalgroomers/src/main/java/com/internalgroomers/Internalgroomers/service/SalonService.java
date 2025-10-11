package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.dto.SalonDto;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalonService {

    private final SalonRepository salonRepository;
    private final ServiceRepository serviceRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public SalonService(SalonRepository salonRepository, ServiceRepository serviceRepository,
                        FileStorageService fileStorageService) {
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<SalonDto> getAllSalons() {
        return salonRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public SalonDto getSalonById(Long id) {
        return salonRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + id));
    }

    @Transactional
    public SalonDto createSalon(String name, String description, String city,
                                String contactPhone, String contactEmail, MultipartFile image) {
        Salon salon = new Salon();
        salon.setName(name);
        salon.setDescription(description);
        salon.setCity(city);
        salon.setContactPhone(contactPhone);
        salon.setContactEmail(contactEmail);

        if (image != null && !image.isEmpty()) {
            String imagePath = fileStorageService.storeFile(image, "salons");
            salon.setImagePath(imagePath);
        }

        Salon savedSalon = salonRepository.save(salon);
        return convertToDto(savedSalon);
    }

    @Transactional
    public SalonDto updateSalon(Long id, Customer owner, String name, String description,
                                String city, String contactPhone, String contactEmail,
                                MultipartFile image) {
        Salon existingSalon = salonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + id));

        // Verify ownership
        Salon ownedSalon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!existingSalon.getId().equals(ownedSalon.getId())) {
            throw new RuntimeException("You are not authorized to update this salon");
        }

        existingSalon.setName(name);
        existingSalon.setDescription(description);
        existingSalon.setCity(city);
        existingSalon.setContactPhone(contactPhone);
        existingSalon.setContactEmail(contactEmail);

        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (existingSalon.getImagePath() != null) {
                fileStorageService.deleteFile(existingSalon.getImagePath());
            }
            String imagePath = fileStorageService.storeFile(image, "salons");
            existingSalon.setImagePath(imagePath);
        }

        Salon updatedSalon = salonRepository.save(existingSalon);
        return convertToDto(updatedSalon);
    }

    @Transactional
    public ServiceEntity createService(Long salonId, Customer owner, String name,
                                       String description, Long priceCents,
                                       Integer durationMinutes, MultipartFile image) {
        Salon salon = salonRepository.findById(salonId)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + salonId));

        // Verify ownership
        Salon ownedSalon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!salon.getId().equals(ownedSalon.getId())) {
            throw new RuntimeException("You are not authorized to create services for this salon");
        }

        ServiceEntity service = new ServiceEntity();
        service.setName(name);
        service.setDescription(description);
        service.setPriceCents(priceCents);
        service.setDurationMinutes(durationMinutes);
        service.setSalon(salon);

        if (image != null && !image.isEmpty()) {
            String imagePath = fileStorageService.storeFile(image, "services");
            service.setImagePath(imagePath);
        }

        return serviceRepository.save(service);
    }

    @Transactional
    public ServiceEntity updateService(Long serviceId, Customer owner, String name,
                                       String description, Long priceCents,
                                       Integer durationMinutes, MultipartFile image) {
        ServiceEntity existingService = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + serviceId));

        // Verify ownership
        Salon ownedSalon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!existingService.getSalon().getId().equals(ownedSalon.getId())) {
            throw new RuntimeException("You are not authorized to update this service");
        }

        existingService.setName(name);
        existingService.setDescription(description);
        existingService.setPriceCents(priceCents);
        existingService.setDurationMinutes(durationMinutes);

        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (existingService.getImagePath() != null) {
                fileStorageService.deleteFile(existingService.getImagePath());
            }
            String imagePath = fileStorageService.storeFile(image, "services");
            existingService.setImagePath(imagePath);
        }

        return serviceRepository.save(existingService);
    }

    @Transactional
    public void deleteService(Long serviceId, Customer owner) {
        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + serviceId));

        // Verify ownership
        Salon ownedSalon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!service.getSalon().getId().equals(ownedSalon.getId())) {
            throw new RuntimeException("You are not authorized to delete this service");
        }

        // Delete image if exists
        if (service.getImagePath() != null) {
            fileStorageService.deleteFile(service.getImagePath());
        }

        serviceRepository.deleteById(serviceId);
    }

    public SalonDto convertToDto(Salon salon) {
        SalonDto dto = new SalonDto();
        dto.setId(salon.getId());
        dto.setName(salon.getName());
        dto.setDescription(salon.getDescription());
        dto.setCity(salon.getCity());
        dto.setContactPhone(salon.getContactPhone());
        dto.setContactEmail(salon.getContactEmail());
        dto.setImageUrl(salon.getImagePath()); // Changed from imageUrl to imagePath
        return dto;
    }
}