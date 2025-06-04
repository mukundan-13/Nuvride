package com.nuvride_backend.nuvride.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nuvride_backend.nuvride.dto.RideRequestDTO;
import com.nuvride_backend.nuvride.enums.RideStatus;
import com.nuvride_backend.nuvride.model.Ride;
import com.nuvride_backend.nuvride.service.RideService;

@RestController
@RequestMapping("/api/rides")
@CrossOrigin(origins = "*")
public class RideController {

    @Autowired
    private RideService rideService;

    @PostMapping("/book")
    public ResponseEntity<?> bookRide(@RequestBody RideRequestDTO requestDTO) {
        Ride ride = rideService.createRide(requestDTO);
        if (ride != null) {
            return ResponseEntity.ok(ride);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Driver Unavailable");
        }
    }

    @PutMapping("/{rideId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long rideId, @RequestParam RideStatus status) {
        rideService.updateRideStatus(rideId, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ride>> getUserRides(@PathVariable Long userId) {
        return ResponseEntity.ok(rideService.getUserRides(userId));
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Ride>> getDriverRides(@PathVariable Long driverId) {
        return ResponseEntity.ok(rideService.getDriverRides(driverId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ride> getRideById(@PathVariable Long id) {
        Optional<Ride> ride = rideService.getRideById(id);
        return ride.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Ride>> getAllRides() {
        return ResponseEntity.ok(rideService.getAllRides());
    }

    // Only keep this if you want admin/manual creation
    @PostMapping
    public ResponseEntity<Ride> createRideDirect(@RequestBody Ride ride) {
        return ResponseEntity.ok(rideService.createRide(ride));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ride> updateRide(@PathVariable Long id, @RequestBody Ride ride) {
        Ride updated = rideService.updateRide(id, ride);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRide(@PathVariable Long id) {
        if (rideService.deleteRide(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
