package com.nuvride_backend.nuvride.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nuvride_backend.nuvride.model.Review;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByVehicleId(Long vehicleId); // Fetch all reviews for a specific vehicle

    List<Review> findByUserId(Long userId); // Fetch all reviews by a specific user

    List<Review> findByBookingId(Long bookingId); // Fetch all reviews for a specific booking

    boolean existsByVehicleIdAndUserId(Long vehicleId, Long userId); // Check if a user has reviewed a vehicle

    boolean existsByBookingId(Long bookingId); // Check if a booking already has a review
}
