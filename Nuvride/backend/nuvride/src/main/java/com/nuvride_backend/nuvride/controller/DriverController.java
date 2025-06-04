package com.nuvride_backend.nuvride.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.nuvride_backend.nuvride.dto.DriverLoginRequest;
import com.nuvride_backend.nuvride.dto.DriverRegisterRequest;
import com.nuvride_backend.nuvride.model.Driver;
import com.nuvride_backend.nuvride.repository.DriverRepository;
import com.nuvride_backend.nuvride.service.DriverService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private DriverRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register driver (no JWT)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody DriverRegisterRequest req) {
        if (repo.findByEmail(req.email).isPresent())
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));

        Driver d = new Driver();
        d.setName(req.name);
        d.setEmail(req.email);
        d.setPassword(passwordEncoder.encode(req.password));
        d.setPhoneNumber(req.phoneNumber);
        d.setLicenseNumber(req.licenseNumber);
        d.setVehicleType(req.vehicleType);
        d.setCity(req.city);
        d.setAvailable(false);

        repo.save(d);

        return ResponseEntity.ok(Map.of("message", "Driver registered", "driverId", d.getId()));
    }

    // Login driver (no JWT)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DriverLoginRequest req) {
        Driver d = repo.findByEmail(req.email).orElse(null);
        if (d == null || !passwordEncoder.matches(req.password, d.getPassword()))
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));

        return ResponseEntity.ok(Map.of("message", "Login successful", "driverId", d.getId()));
    }

    // Get nearby drivers
    @GetMapping("/nearby")
    public ResponseEntity<List<Driver>> getNearbyDrivers(@RequestParam double latitude,
                                                         @RequestParam double longitude,
                                                         @RequestParam double maxDistanceKm) {
        List<Driver> nearbyDrivers = driverService.getNearbyDrivers(latitude, longitude, maxDistanceKm);
        if (nearbyDrivers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(nearbyDrivers);
    }

    // Get available drivers
    @GetMapping("/available")
    public ResponseEntity<List<Driver>> getAvailableDrivers() {
        List<Driver> availableDrivers = driverService.getAvailableDrivers();
        if (availableDrivers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(availableDrivers);
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriverById(@PathVariable long id) {
        Driver driver = driverService.getDriverById(id);
        if (driver == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(driver);
    }

    // Add driver (admin use)
    @PostMapping
    public ResponseEntity<Driver> addDriver(@RequestBody Driver driver) {
        Driver savedDriver = driverService.addDriver(driver);
        return ResponseEntity.ok(savedDriver);
    }

    // Update driver
    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable long id, @RequestBody Driver driver) {
        Driver updatedDriver = driverService.updateDriver(id, driver);
        if (updatedDriver == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedDriver);
    }

    // Delete driver
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable long id) {
        boolean isDeleted = driverService.deleteDriver(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Get all drivers
    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        if (drivers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(drivers);
    }

    // Get available drivers by city
    @GetMapping("/available-in-city")
    public ResponseEntity<List<Driver>> getAvailableDriversByCity(@RequestParam String city) {
        List<Driver> drivers = driverService.getAvailableDriversByCity(city);
        if (drivers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(drivers);
    }
    @PutMapping("/{id}/update-status")
public ResponseEntity<?> updateDriverStatus(@PathVariable Long id,
                                            @RequestBody Map<String, Object> payload) {
    Driver driver = driverService.getDriverById(id);
    if (driver == null) {
        return ResponseEntity.notFound().build();
    }

    if (payload.containsKey("isAvailable")) {
        driver.setAvailable((Boolean) payload.get("isAvailable"));
    }

    if (payload.containsKey("latitude") && payload.containsKey("longitude")) {
        driver.setLatitude(Double.parseDouble(payload.get("latitude").toString()));
        driver.setLongitude(Double.parseDouble(payload.get("longitude").toString()));
    }

    driverService.saveDriver(driver);
    return ResponseEntity.ok(Map.of("message", "Driver status/location updated successfully"));
}
}
