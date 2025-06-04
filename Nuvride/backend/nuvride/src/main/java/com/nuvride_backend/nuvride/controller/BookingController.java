package com.nuvride_backend.nuvride.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nuvride_backend.nuvride.model.Booking;
import com.nuvride_backend.nuvride.service.BookingNotificationService;
import com.nuvride_backend.nuvride.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private BookingNotificationService bookingNotificationService;

    // Create a new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        // Save the booking
        Booking savedBooking = bookingService.saveBooking(booking);
        
        // Fetch user email associated with the saved booking
        String email = bookingService.getUserEmailByBookingId(savedBooking.getId());
        
        if (email != null) {
            System.out.println("User email: " + email);
        } else {
            System.out.println("User not associated with the booking.");
        }
        bookingNotificationService.sendBookingStatusEmail(email, savedBooking);

        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    
    
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        try {
            Booking cancelledBooking = bookingService.cancelBooking(id);
            String email = bookingService.getUserEmailByBookingId(cancelledBooking.getId());
            
            if (email != null) {
                System.out.println("User email: " + email);
            } else {
                System.out.println("User not associated with the booking.");
            }
            bookingNotificationService.sendBookingStatusCancelled(email, cancelledBooking);
            return ResponseEntity.ok(cancelledBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
 
    }

    // Get a booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Delete a booking by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getAllBookingsForUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsForUser(userId);
        return ResponseEntity.ok(bookings);
    }


   

    // Get bookings by userId
    @GetMapping("/users/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    // Update booking status
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        return bookingService.updateBooking(id, booking);
    }

    
}
