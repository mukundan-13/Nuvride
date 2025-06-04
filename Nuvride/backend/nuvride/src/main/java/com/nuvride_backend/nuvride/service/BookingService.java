package com.nuvride_backend.nuvride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nuvride_backend.nuvride.model.Booking;
import com.nuvride_backend.nuvride.model.Booking.Status;
import com.nuvride_backend.nuvride.repository.BookingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    public String getUserEmailByBookingId(Long bookingId) {
        return bookingRepository.findUserEmailByBookingId(bookingId);
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    public List<Booking> getBookingsForUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Booking cancelBooking(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            // Change status to 'Cancelled'
            booking.setStatus(Status.CANCELED);
            return bookingRepository.save(booking);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }

    public Booking updateBooking(Long id, Booking booking) {
        Optional<Booking> existingBooking = bookingRepository.findById(id);
        if (existingBooking.isPresent()) {
            Booking updatedBooking = existingBooking.get();
            updatedBooking.setStatus(booking.getStatus());
            updatedBooking.setStartDate(booking.getStartDate());
            updatedBooking.setEndDate(booking.getEndDate());
            updatedBooking.setTotalPrice(booking.getTotalPrice());
            return bookingRepository.save(updatedBooking);
        }
        return null;
    }

        // Get bookings by userId
        public List<Booking> getBookingsByUserId(Long userId) {
            return bookingRepository.findByUserId(userId);
        }

        public Booking getBooking(Long id)
        {
            Booking booking=bookingRepository.findById(id).orElseThrow();
            Status original=booking.getStatus();
            booking.refreshStatus();
            if(original !=booking.getStatus())
            {
                booking=bookingRepository.save(booking);
            }
            return booking;
        }

}
