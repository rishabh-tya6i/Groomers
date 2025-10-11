package com.internalgroomers.Internalgroomers.service;

import com.internalgroomers.Internalgroomers.dto.AppointmentSlotDto;
import com.internalgroomers.Internalgroomers.entity.AppointmentSlot;
import com.internalgroomers.Internalgroomers.entity.Customer;
import com.internalgroomers.Internalgroomers.entity.Salon;
import com.internalgroomers.Internalgroomers.entity.Staff;
import com.internalgroomers.Internalgroomers.repository.AppointmentSlotRepository;
import com.internalgroomers.Internalgroomers.repository.SalonRepository;
import com.internalgroomers.Internalgroomers.repository.StaffRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentSlotService {

    private final AppointmentSlotRepository slotRepository;
    private final SalonRepository salonRepository;
    private final StaffRepository staffRepository;

    public AppointmentSlotService(AppointmentSlotRepository slotRepository,
                                  SalonRepository salonRepository,
                                  StaffRepository staffRepository) {
        this.slotRepository = slotRepository;
        this.salonRepository = salonRepository;
        this.staffRepository = staffRepository;
    }

    @Transactional
    public AppointmentSlot createSlot(Customer owner, AppointmentSlotDto slotDto) {
        Salon salon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        AppointmentSlot slot = new AppointmentSlot();
        slot.setSalon(salon);
        slot.setStartTime(slotDto.getStartTime());
        slot.setEndTime(slotDto.getEndTime());
        slot.setIsAvailable(true);

        if (slotDto.getStaffId() != null) {
            Staff staff = staffRepository.findById(slotDto.getStaffId())
                    .orElseThrow(() -> new RuntimeException("Staff not found"));

            if (!staff.getSalon().getId().equals(salon.getId())) {
                throw new RuntimeException("Staff does not belong to your salon");
            }
            slot.setStaff(staff);
        }

        return slotRepository.save(slot);
    }

    @Transactional
    public List<AppointmentSlot> createBulkSlots(Customer owner, List<AppointmentSlotDto> slotDtos) {
        Salon salon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        List<AppointmentSlot> slots = new ArrayList<>();

        for (AppointmentSlotDto slotDto : slotDtos) {
            AppointmentSlot slot = new AppointmentSlot();
            slot.setSalon(salon);
            slot.setStartTime(slotDto.getStartTime());
            slot.setEndTime(slotDto.getEndTime());
            slot.setIsAvailable(true);

            if (slotDto.getStaffId() != null) {
                Staff staff = staffRepository.findById(slotDto.getStaffId())
                        .orElseThrow(() -> new RuntimeException("Staff not found"));

                if (!staff.getSalon().getId().equals(salon.getId())) {
                    throw new RuntimeException("Staff does not belong to your salon");
                }
                slot.setStaff(staff);
            }

            slots.add(slot);
        }

        return slotRepository.saveAll(slots);
    }

    public List<AppointmentSlot> getAllSlots(Long salonId) {
        return slotRepository.findBySalonId(salonId);
    }

    public List<AppointmentSlot> getAvailableSlots(Long salonId) {
        return slotRepository.findBySalonIdAndIsAvailable(salonId, true);
    }

    public List<AppointmentSlot> getAvailableSlotsByDateRange(Long salonId,
                                                              OffsetDateTime startDate,
                                                              OffsetDateTime endDate) {
        return slotRepository.findAvailableSlotsBySalonAndDateRange(salonId, startDate, endDate);
    }

    @Transactional
    public void deleteSlot(Long slotId, Customer owner) {
        AppointmentSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        Salon salon = salonRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Salon not found for the current user"));

        if (!slot.getSalon().getId().equals(salon.getId())) {
            throw new RuntimeException("You are not authorized to delete this slot");
        }

        slotRepository.delete(slot);
    }
}