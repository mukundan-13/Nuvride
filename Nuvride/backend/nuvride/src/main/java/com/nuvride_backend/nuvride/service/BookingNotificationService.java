package com.nuvride_backend.nuvride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.nuvride_backend.nuvride.model.Booking;
import com.nuvride_backend.nuvride.model.User;
import com.nuvride_backend.nuvride.repository.BookingRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class BookingNotificationService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private JavaMailSender mailSender;

    private static final Logger log = LoggerFactory.getLogger(BookingNotificationService.class);

    // Method to handle booking status update
    public void updateBookingStatusAndNotify(Long bookingId, String newStatus) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();

            // Convert String to Enum Status
            Booking.Status status = Booking.Status.valueOf(newStatus.toUpperCase());
            booking.setStatus(status); // Set the status as enum

            // Save the updated booking status
            bookingRepository.save(booking);

            // Fetch the user associated with this booking
            User user = booking.getUser(); // Accessing user directly
            sendBookingStatusEmail(user.getEmail(), booking);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }

    // Method to send email notification about the booking status
    public void sendBookingStatusEmail(String email, Booking booking) {
        if (email == null || email.trim().isEmpty()) {
            log.error("Email address is null or empty for booking ID: {}", booking.getId());
            throw new IllegalArgumentException("Email address cannot be null or empty");
        }

        // Debugging log to check if data is correctly fetched
        log.debug("Booking Details: {}", booking);
        log.debug("User: {}", booking.getUser());  // Check if the User is populated
        log.debug("Vehicle: {}", booking.getVehicle());  // Check if the Vehicle is populated

        String subject = "Booking Confirmed - Nuvride";
        
        // Safely retrieve booking details, avoiding nulls.
        String firstName = (booking.getUser() != null && booking.getUser().getFirstName() != null) 
        ? booking.getUser().getFirstName() 
        : "User";
    
    String vehicleModel = (booking.getVehicle() != null && booking.getVehicle().getModel() != null) 
        ? booking.getVehicle().getModel() 
        : "Vehicle Model";
    
    String companyName = (booking.getVehicle() != null && booking.getVehicle().getCompanyName() != null) 
        ? booking.getVehicle().getCompanyName() 
        : "Company Name";
    
        
        String startDate = (booking.getStartDate() != null) 
            ? booking.getStartDate().toString() 
            : "N/A";
        
        String endDate = (booking.getEndDate() != null) 
            ? booking.getEndDate().toString() 
            : "N/A";
        
        Double totalPrice = (booking.getTotalPrice() != null) 
            ? booking.getTotalPrice() 
            : 0.00;

        // Constructing the email message
        String messageText = String.format(
            "Dear %s,\n\n" +
            "Your booking has been confirmed!\n\n" +
            "Here are your booking details:\n" +
            "Booking ID: %d\n" +
            "Vehicle: %s\n" +
            "Company: %s\n" +
            "Booking Start Date: %s\n" +
            "Booking End Date: %s\n" +
            "Total Amount: $%.2f\n\n" +
            "Thank you for choosing Nuvride! If you have any questions, feel free to contact us.\n\n" +
            "Best regards,\n" +
            "The Nuvride Team",
            firstName,
            booking.getId(),
            vehicleModel,
            companyName,
            startDate,
            endDate,
            totalPrice
        );

        // Create and send the email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(messageText);

        // Send the email
        mailSender.send(message);
    }

    // Method to send email notification when booking is cancelled
    public void sendBookingStatusCancelled(String email, Booking booking) {
        if (email == null || email.trim().isEmpty()) {
            log.error("Email address is null or empty for booking ID: {}", booking.getId());
            throw new IllegalArgumentException("Email address cannot be null or empty");
        }

        String subject = "Booking Cancelled - Nuvride";

        // Safely retrieve booking details for cancellation, avoiding nulls.
        String firstName = (booking.getUser() != null && booking.getUser().getFirstName() != null) 
            ? booking.getUser().getFirstName() 
            : "User";
        
        String vehicleModel = (booking.getVehicle() != null && booking.getVehicle().getModel() != null) 
            ? booking.getVehicle().getModel() 
            : "Vehicle Model";
        
        String companyName = (booking.getVehicle() != null && booking.getVehicle().getCompanyName() != null) 
            ? booking.getVehicle().getCompanyName() 
            : "Company Name";
        
        String startDate = (booking.getStartDate() != null) 
            ? booking.getStartDate().toString() 
            : "N/A";
        
        String endDate = (booking.getEndDate() != null) 
            ? booking.getEndDate().toString() 
            : "N/A";

        // Constructing the cancellation email message
        String messageText = String.format(
            "Dear %s,\n\n" +
            "We regret to inform you that your booking for vehicle '%s' has been cancelled.\n" +
            "We apologize for the inconvenience and hope to serve you better in the future.\n\n" +
            "Booking ID: %d\n" +
            "Vehicle: %s\n" +
            "Company: %s\n" +
            "Booking Start Date: %s\n" +
            "Booking End Date: %s\n\n" +
            "For any queries, feel free to contact us.\n\n" +
            "Best regards,\n" +
            "The Nuvride Team",
            firstName,
            vehicleModel,
            booking.getId(),
            vehicleModel,
            companyName,
            startDate,
            endDate
        );

        // Create and send the cancellation email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(messageText);

        // Send the email
        mailSender.send(message);
    }
}
