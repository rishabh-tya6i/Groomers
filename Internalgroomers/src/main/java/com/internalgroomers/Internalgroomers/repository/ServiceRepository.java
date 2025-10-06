package com.internalgroomers.Internalgroomers.repository;

import com.internalgroomers.Internalgroomers.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findBySalonId(Long salonId);
}
