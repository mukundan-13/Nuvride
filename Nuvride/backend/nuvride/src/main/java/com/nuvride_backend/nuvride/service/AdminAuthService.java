package com.nuvride_backend.nuvride.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;


@Service
public class AdminAuthService {
    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.role}")
    private String adminRole;

    public boolean authenticate(String username,String password)
    {
        return username.equals(adminUsername) && password.equals(adminPassword);
    }

    public String getRole()
    {
        return adminRole;
    }
    public String getUsername()
    {
        return adminUsername;
    }

}
