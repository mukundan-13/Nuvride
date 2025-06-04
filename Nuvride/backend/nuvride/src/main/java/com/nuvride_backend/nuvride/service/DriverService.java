package com.nuvride_backend.nuvride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nuvride_backend.nuvride.model.Driver;
import com.nuvride_backend.nuvride.repository.DriverRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getNearbyDrivers(double latitude, double longitude, double maxDistanceKm) {
        return driverRepository.findDriversNear(latitude, longitude, maxDistanceKm);
    }

    public List<Driver> getAvailableDrivers() {
        return driverRepository.findAll().stream()
                .filter(Driver::isAvailable)
                .collect(Collectors.toList());
    }

    public Driver getDriverById(long id) {
        Optional<Driver> driver = driverRepository.findById(id);
        return driver.orElse(null);
    }

    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public Driver updateDriver(long id, Driver driver) {
        if (!driverRepository.existsById(id)) {
            return null;
        }
        driver.setId(id);
        return driverRepository.save(driver);
    }

    public boolean deleteDriver(long id) {
        if (driverRepository.existsById(id)) {
            driverRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Driver> getAvailableDriversByCity(String city) {
        return driverRepository.findByCityIgnoreCaseAndIsAvailableTrue(city);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Driver saveDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public Driver updateDriver(Long id, Driver updatedDriver) {
        Driver driver = driverRepository.findById(id).orElseThrow();
        driver.setName(updatedDriver.getName());
        driver.setEmail(updatedDriver.getEmail());
        driver.setPassword(updatedDriver.getPassword());
        driver.setPhoneNumber(updatedDriver.getPhoneNumber());
        driver.setLicenseNumber(updatedDriver.getLicenseNumber());
        driver.setVehicleType(updatedDriver.getVehicleType());
        driver.setRating(updatedDriver.getRating());
        driver.setAvailable(updatedDriver.isAvailable());
        driver.setLatitude(updatedDriver.getLatitude());
        driver.setLongitude(updatedDriver.getLongitude());
        driver.setCity(updatedDriver.getCity());
        return driverRepository.save(driver);
    }

    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }
}
