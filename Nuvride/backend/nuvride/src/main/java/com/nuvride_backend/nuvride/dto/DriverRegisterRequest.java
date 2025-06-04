package com.nuvride_backend.nuvride.dto;

import lombok.Data;

@Data
public class DriverRegisterRequest {
    public String name;
    public String email;
    public String password;
    public String phoneNumber;
    public String licenseNumber;
    public String vehicleType;
    public String city;
}
