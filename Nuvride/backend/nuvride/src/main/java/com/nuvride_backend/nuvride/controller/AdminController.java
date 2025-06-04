package com.nuvride_backend.nuvride.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nuvride_backend.nuvride.dto.AdminLoginRequest;
import com.nuvride_backend.nuvride.security.JwtUtil;
import com.nuvride_backend.nuvride.service.AdminAuthService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired private AdminAuthService adminAuthService;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest req)
    {
        if(adminAuthService.authenticate(req.getUsername(),req.getPassword())){
            String token=jwtUtil.generateToken(adminAuthService.getUsername(),adminAuthService.getRole());
            return ResponseEntity.ok(Map.of("token",token));
        }
        throw new BadCredentialsException("Invalid Admin Credentials");
    }
    @GetMapping("path")
    public ResponseEntity<?> dashboard(){
        return ResponseEntity.ok("welcome to Nuvride Admin Panel");
    }
    
}
