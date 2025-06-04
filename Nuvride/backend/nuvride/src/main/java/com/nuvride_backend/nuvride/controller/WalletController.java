package com.nuvride_backend.nuvride.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nuvride_backend.nuvride.model.Wallet;
import com.nuvride_backend.nuvride.service.WalletService;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    @Autowired
    private WalletService walletService;

    @GetMapping("/{userId}")
    public Wallet getWallet(@PathVariable Long userId) {
        return walletService.getWallet(userId);
    }

    @PostMapping("/recharge")
    public Wallet recharge(@RequestParam Long userId, @RequestParam Double amount) {
        return walletService.recharge(userId, amount);
    }

    @PostMapping("/deduct")
    public Wallet deduct(@RequestParam Long userId, @RequestParam Double amount) {
        return walletService.deduct(userId, amount);
    }
}
