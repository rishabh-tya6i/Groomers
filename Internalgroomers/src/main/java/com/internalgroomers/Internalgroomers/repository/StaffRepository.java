package com.internalgroomers.Internalgroomers.repository;

import com.internalgroomers.Internalgroomers.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    List<Staff> findBySalonId(Long salonId);
    List<Staff> findBySalonIdAndIsActive(Long salonId, Boolean isActive);
}