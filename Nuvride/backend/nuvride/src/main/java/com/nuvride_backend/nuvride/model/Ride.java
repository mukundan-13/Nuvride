package com.nuvride_backend.nuvride.model;

import java.time.LocalDateTime;

import com.nuvride_backend.nuvride.enums.RideStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long driverId;

    private double sourceLat;
    private double sourceLng;
    private double destLat;
    private double destLng;

    private String sourceAddress;
    private String destAddress;

    private double distanceInKm;
    private double fareAmount;

    @Enumerated(EnumType.STRING)
    private RideStatus status;

    private LocalDateTime createdAt;
}




