package com.internalgroomers.Internalgroomers.repository;

import com.internalgroomers.Internalgroomers.entity.AppointmentSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;

public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, Long> {

    List<AppointmentSlot> findBySalonId(Long salonId);

    List<AppointmentSlot> findBySalonIdAndIsAvailable(Long salonId, Boolean isAvailable);

    @Query("SELECT a FROM AppointmentSlot a WHERE a.salon.id = :salonId " +
            "AND a.startTime >= :startDate AND a.endTime <= :endDate " +
            "AND a.isAvailable = true")
    List<AppointmentSlot> findAvailableSlotsBySalonAndDateRange(
            @Param("salonId") Long salonId,
            @Param("startDate") OffsetDateTime startDate,
            @Param("endDate") OffsetDateTime endDate
    );

    @Query("SELECT a FROM AppointmentSlot a WHERE a.staff.id = :staffId " +
            "AND a.startTime >= :startDate AND a.endTime <= :endDate")
    List<AppointmentSlot> findByStaffAndDateRange(
            @Param("staffId") Long staffId,
            @Param("startDate") OffsetDateTime startDate,
            @Param("endDate") OffsetDateTime endDate
    );
}