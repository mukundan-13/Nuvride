package com.nuvride_backend.nuvride.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nuvride_backend.nuvride.model.Ride;
import java.util.List;


public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findByUserId(Long userId);
    List<Ride> findByDriverId(Long driverId);
}