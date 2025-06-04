package com.nuvride_backend.nuvride.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nuvride_backend.nuvride.dto.RideRequestDTO;
import com.nuvride_backend.nuvride.enums.RideStatus;
import com.nuvride_backend.nuvride.model.Driver;
import com.nuvride_backend.nuvride.model.Ride;
import com.nuvride_backend.nuvride.repository.DriverRepository;
import com.nuvride_backend.nuvride.repository.RideRepository;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private DriverRepository driverRepository;

    public Ride createRide(RideRequestDTO dto) {
        double distance = haversine(dto.getSourceLat(), dto.getSourceLng(),
                                    dto.getDestLat(), dto.getDestLng());

        double fare = calculateFare(distance);

        Ride ride = new Ride();
        ride.setUserId(dto.getUserId());
        ride.setDriverId(dto.getDriverId());
        ride.setSourceLat(dto.getSourceLat());
        ride.setSourceLng(dto.getSourceLng());
        ride.setDestLat(dto.getDestLat());
        ride.setDestLng(dto.getDestLng());
        ride.setSourceAddress(dto.getSourceAddress());
        ride.setDestAddress(dto.getDestAddress());
        ride.setDistanceInKm(distance);
        ride.setFareAmount(fare);
        ride.setStatus(RideStatus.REQUESTED);
        ride.setCreatedAt(LocalDateTime.now());

        // Set driver as unavailable
        Driver driver = driverRepository.findById(dto.getDriverId()).orElseThrow();
        driver.setAvailable(false);
        driverRepository.save(driver);

        return rideRepository.save(ride);
    }

    public void updateRideStatus(Long rideId, RideStatus status) {
        Ride ride = rideRepository.findById(rideId).orElseThrow();
        ride.setStatus(status);
        rideRepository.save(ride);

        if (status == RideStatus.COMPLETED || status == RideStatus.CANCELLED) {
            Driver driver = driverRepository.findById(ride.getDriverId()).orElseThrow();
            driver.setAvailable(true);
            driverRepository.save(driver);
        }
    }

    public List<Ride> getUserRides(Long userId) {
        return rideRepository.findByUserId(userId);
    }

    public List<Ride> getDriverRides(Long driverId) {
        return rideRepository.findByDriverId(driverId);
    }

    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private double calculateFare(double distanceKm) {
        double baseFare = 20;
        double perKmRate = 10;
        return baseFare + (distanceKm * perKmRate);
    }

    public Optional<Ride> getRideById(Long id) {
        return rideRepository.findById(id);
    }

    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }


    public Ride createRide(Ride ride) {
        ride.setCreatedAt(LocalDateTime.now());
        return rideRepository.save(ride);
    }

    public Ride updateRide(Long id, Ride updatedRide) {
        Optional<Ride> optionalRide = rideRepository.findById(id);
        if (optionalRide.isPresent()) {
            Ride ride = optionalRide.get();
            ride.setUserId(updatedRide.getUserId());
            ride.setDriverId(updatedRide.getDriverId());
            ride.setSourceLat(updatedRide.getSourceLat());
            ride.setSourceLng(updatedRide.getSourceLng());
            ride.setDestLat(updatedRide.getDestLat());
            ride.setDestLng(updatedRide.getDestLng());
            ride.setSourceAddress(updatedRide.getSourceAddress());
            ride.setDestAddress(updatedRide.getDestAddress());
            ride.setDistanceInKm(updatedRide.getDistanceInKm());
            ride.setFareAmount(updatedRide.getFareAmount());
            ride.setStatus(updatedRide.getStatus());
            return rideRepository.save(ride);
        }
        return null;
    }

    public boolean deleteRide(Long id) {
        if (rideRepository.existsById(id)) {
            rideRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

