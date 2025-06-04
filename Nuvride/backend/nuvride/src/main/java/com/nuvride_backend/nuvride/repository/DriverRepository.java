package com.nuvride_backend.nuvride.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.nuvride_backend.nuvride.model.Driver;
import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    List<Driver> findByCityIgnoreCaseAndIsAvailableTrue(String city);

    @Query("SELECT d FROM Driver d WHERE " +
           "FUNCTION('ST_Distance_Sphere', POINT(d.longitude, d.latitude), POINT(?1, ?2)) <= ?3 * 1000")
    List<Driver> findDriversNear(double latitude, double longitude, double maxDistanceKm);
    Optional<Driver> findByEmail(String email);
}
