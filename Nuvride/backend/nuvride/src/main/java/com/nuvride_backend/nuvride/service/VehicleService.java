package com.nuvride_backend.nuvride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nuvride_backend.nuvride.model.Vehicle;
import com.nuvride_backend.nuvride.repository.VehicleRepository;
import java.util.Optional;
import java.time.LocalDate;
import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;
    public List<Vehicle> getAvailableVehicles(LocalDate startDate, LocalDate endDate, String companyName, 
            String sortBy, Integer capacity, Integer rating) {
        // Default sorting: ascending by pricePerDay
        Sort sort = Sort.by(Sort.Direction.ASC, "pricePerDay");
        if ("desc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "pricePerDay");
        }

        // Step 1: Retrieve vehicles available in the specified date range
        List<Vehicle> availableVehicles = vehicleRepository.findAvailableVehicles(startDate, endDate, sort);

        // Step 2: Apply filters on available vehicles
        if (companyName != null && !companyName.isEmpty()) {
            availableVehicles = availableVehicles.stream()
                    .filter(v -> v.getCompanyName().toLowerCase().contains(companyName.toLowerCase()))
                    .toList();
        }

        if (capacity != null) {
            availableVehicles = availableVehicles.stream()
                    .filter(v -> v.getCapacity().equals(capacity))
                    .toList();
        }

        if (rating != null) {
            availableVehicles = availableVehicles.stream()
                    .filter(v -> v.getRating() >= rating)
                    .toList();
        }

        return availableVehicles;
    }
	
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + id));
    }

     // Get all vehicles
     public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Add a new vehicle
    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // Update vehicle details
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        Optional<Vehicle> existingVehicle = vehicleRepository.findById(id);
        if (existingVehicle.isPresent()) {
            Vehicle updatedVehicle = existingVehicle.get();
            updatedVehicle.setCompanyName(vehicle.getCompanyName());
            updatedVehicle.setNumberPlate(vehicle.getNumberPlate());
            updatedVehicle.setModel(vehicle.getModel());
            updatedVehicle.setType(vehicle.getType());
            updatedVehicle.setCapacity(vehicle.getCapacity());
            updatedVehicle.setPricePerDay(vehicle.getPricePerDay());
            updatedVehicle.setManufacturingYear(vehicle.getManufacturingYear());
            updatedVehicle.setRating(vehicle.getRating());
            updatedVehicle.setImageUrl(vehicle.getImageUrl());
            return vehicleRepository.save(updatedVehicle);
        }
        return null;
    }

    // Delete vehicle by ID
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
    
    
}
