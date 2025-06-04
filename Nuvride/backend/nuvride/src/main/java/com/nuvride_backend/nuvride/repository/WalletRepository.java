package com.nuvride_backend.nuvride.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nuvride_backend.nuvride.model.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
}
