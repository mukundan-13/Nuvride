package com.nuvride_backend.nuvride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nuvride_backend.nuvride.model.Wallet;
import com.nuvride_backend.nuvride.repository.WalletRepository;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepo;

    public Wallet getWallet(Long userId) {
        return walletRepo.findById(userId).orElseGet(() -> {
            Wallet wallet = new Wallet();
            wallet.setUserId(userId);
            wallet.setBalance(0.0);
            return walletRepo.save(wallet);
        });
    }

    public Wallet recharge(Long userId, Double amount) {
        Wallet wallet = getWallet(userId);
        wallet.setBalance(wallet.getBalance() + amount);
        return walletRepo.save(wallet);
    }

    public Wallet deduct(Long userId, Double amount) {
        Wallet wallet = getWallet(userId);
        if (wallet.getBalance() < amount) throw new RuntimeException("Insufficient balance");
        wallet.setBalance(wallet.getBalance() - amount);
        return walletRepo.save(wallet);
    }
}
