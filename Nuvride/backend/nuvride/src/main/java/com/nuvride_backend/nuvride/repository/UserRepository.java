package com.nuvride_backend.nuvride.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nuvride_backend.nuvride.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByResetToken(String resetToken);
}
