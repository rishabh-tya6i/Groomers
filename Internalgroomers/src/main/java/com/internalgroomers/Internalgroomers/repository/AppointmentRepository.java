package com.internalgroomers.Internalgroomers.repository;

import com.internalgroomers.Internalgroomers.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT a FROM Appointment a WHERE a.salon.id = :salonId AND (a.startTime < :end AND a.endTime > :start)")
    List<Appointment> findConflicting(@Param("salonId") Long salonId,
                                      @Param("start") OffsetDateTime start,
                                      @Param("end") OffsetDateTime end);
    List<Appointment> findByCustomerId(Long customerId);
}
