package com.nuvride_backend.nuvride.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nuvride_backend.nuvride.dto.PasswordResetRequest;
import com.nuvride_backend.nuvride.dto.PasswordResetToken;
import com.nuvride_backend.nuvride.service.PasswordResetService;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetRequest request) {
        passwordResetService.sendResetLink(request);
        return ResponseEntity.ok("Password reset link sent!");
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetToken tokenRequest) {
    	System.out.println("Reset token: ");
        System.out.println("New password: " + tokenRequest.getNewPassword());
        passwordResetService.resetPassword(tokenRequest);
        return ResponseEntity.ok("Password has been reset successfully!");
    }
}