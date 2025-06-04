package com.nuvride_backend.nuvride.dto;


public class UserDTO {
	private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;
    private String role; // Include role if needed

    // Constructor
    public UserDTO(Long id, String firstName, String lastName, String email, String address, String phoneNumber, String role) {
    	this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }

    // Getters
    public Long getId() {return id;}
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getRole() { return role; }
}
