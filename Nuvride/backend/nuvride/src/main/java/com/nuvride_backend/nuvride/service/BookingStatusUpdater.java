package com.nuvride_backend.nuvride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.nuvride_backend.nuvride.repository.BookingRepository;

@Service
public class BookingStatusUpdater {

    @Autowired
    private BookingRepository bookingRepository;

    // Run this task daily at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void updateBookingStatuses() {
        try {
            bookingRepository.updateCompletedBookings();
            System.out.println("Booking statuses updated successfully!");
        } catch (Exception e) {
            System.err.println("Error updating booking statuses: " + e.getMessage());
        }
    }
}
