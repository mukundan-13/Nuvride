// package com.nuvride_backend.nuvride.service;

// import com.nuvride_backend.nuvride.model.Driver;
// import com.nuvride_backend.nuvride.repository.DriverRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class DriverServiceImpl implements DriverService {

//     @Autowired
//     private DriverRepository driverRepository;

//     @Override
//     public List<Driver> getFilteredDrivers(double minRating, double centerLat, double centerLon, double radius) {
//         double minLat = centerLat - radius;
//         double maxLat = centerLat + radius;
//         double minLon = centerLon - radius;
//         double maxLon = centerLon + radius;
//         return driverRepository.findNearbyDrivers(minRating, minLat, maxLat, minLon, maxLon);
//     }
// }
