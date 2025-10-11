package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.entity.Staff;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.repository.StaffRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final SalonRepository salonRepository;
    private final FileStorageService fileStorageService;

    public StaffService(StaffRepository staffRepository,
                        SalonRepository salonRepository,
                        FileStorageService fileStorageService) {
        this.staffRepository = staffRepository;
        this.salonRepository = salonRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public Staff createStaff(Customer owner, String name, String phone,
                             String email, String specialization, MultipartFile image) {
        Salon salon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        Staff staff = new Staff();
        staff.setSalon(salon);
        staff.setName(name);
        staff.setPhone(phone);
        staff.setEmail(email);
        staff.setSpecialization(specialization);
        staff.setIsActive(true);

        if (image != null && !image.isEmpty()) {
            String imagePath = fileStorageService.storeFile(image, "staff");
            staff.setImagePath(imagePath);
        }

        return staffRepository.save(staff);
    }

    public List<Staff> getStaffBySalon(Long salonId) {
        return staffRepository.findBySalonId(salonId);
    }

    public Staff getStaffById(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));
    }

    @Transactional
    public Staff updateStaff(Long id, Customer owner, String name, String phone,
                             String email, String specialization, Boolean isActive,
                             MultipartFile image) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));

        Salon salon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!staff.getSalon().getId().equals(salon.getId())) {
            throw new RuntimeException("You are not authorized to update this staff member");
        }

        staff.setName(name);
        staff.setPhone(phone);
        staff.setEmail(email);
        staff.setSpecialization(specialization);
        staff.setIsActive(isActive);

        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (staff.getImagePath() != null) {
                fileStorageService.deleteFile(staff.getImagePath());
            }
            String imagePath = fileStorageService.storeFile(image, "staff");
            staff.setImagePath(imagePath);
        }

        return staffRepository.save(staff);
    }

    @Transactional
    public void deleteStaff(Long id, Customer owner) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));

        Salon salon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!staff.getSalon().getId().equals(salon.getId())) {
            throw new RuntimeException("You are not authorized to delete this staff member");
        }

        // Delete image if exists
        if (staff.getImagePath() != null) {
            fileStorageService.deleteFile(staff.getImagePath());
        }

        staffRepository.delete(staff);
    }
}