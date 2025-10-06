package com.internalgroomers.Internalgroomers.repository;

import com.internalgroomers.Internalgroomers.entity.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SalonRepository extends JpaRepository<Salon, Long> {
    @Query(value = """
      SELECT * FROM salons s
      WHERE s.latitude IS NOT NULL AND s.longitude IS NOT NULL
      """, nativeQuery = true)
    List<Salon> findAllWithCoordinates();

    // Nearby search (Haversine)
    @Query(value = """
      SELECT * FROM (
      SELECT s.*, (6371 * acos(
        cos(radians(:lat)) * cos(radians(s.latitude))
        * cos(radians(s.longitude) - radians(:lon))
        + sin(radians(:lat)) * sin(radians(s.latitude))
      )) AS distance_km
      FROM salons s
    ) AS distances
    WHERE distance_km <= :radiusKm
    ORDER BY distance_km
    """, nativeQuery = true)
    List<Salon> findNearby(@Param("lat") double lat,
                           @Param("lon") double lon,
                           @Param("radiusKm") double radiusKm);
}
