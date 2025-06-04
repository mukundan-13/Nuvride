// package com.nuvride_backend.nuvride.dto;

// import com.nuvride_backend.nuvride.model.Driver;

// import lombok.Data;

// @Data
// public class DriverDTO {
//     private Long id;
//     private String name;
//     private double latitude;
//     private double longitude;
//     private double rating;
//     private String vehicleType;
//     private boolean available;
//     private double distance;

//     public DriverDTO(Driver driver) {
//         this.id = driver.getId();
//         this.name = driver.getName();
//         this.latitude = driver.getLatitude();
//         this.longitude = driver.getLongitude();
//         this.rating = driver.getRating();
//         this.vehicleType = driver.getVehicleType();
//         this.available = driver.isAvailable();
//     }

//     // Getters and Setters for the DTO fields
//     public double getDistance() {
//         return distance;
//     }

//     public void setDistance(double distance) {
//         this.distance = distance;
//     }

//     // Other getters and setters for the DriverDTO fields
// }