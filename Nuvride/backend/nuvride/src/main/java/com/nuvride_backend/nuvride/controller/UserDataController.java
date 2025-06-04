package com.nuvride_backend.nuvride.controller;

import com.nuvride_backend.nuvride.model.User;
import com.nuvride_backend.nuvride.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allusers")
@CrossOrigin(origins = "*")
public class UserDataController {

    @Autowired
    private UserDataService userDataService;

    @GetMapping
    public List<User> getAllUsers() {
        return userDataService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userDataService.saveUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = userDataService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userDataService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
