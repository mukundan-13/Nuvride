package com.nuvride_backend.nuvride.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String licenseNumber;
    private String vehicleType;
    private double rating;
    @Column(name = "isAvailable", nullable = false)
    private boolean isAvailable;
    private double latitude;
    private double longitude;
    private String city;
}
