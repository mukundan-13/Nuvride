package com.nuvride_backend.nuvride.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Wallet {
    @Id
    private Long userId;
    private Double balance;

    // Getters and Setters
}
