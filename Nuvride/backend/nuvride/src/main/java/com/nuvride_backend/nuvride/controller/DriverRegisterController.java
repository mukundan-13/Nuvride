// package com.nuvride_backend.nuvride.controller;

// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.nuvride_backend.nuvride.dto.DriverLoginRequest;
// import com.nuvride_backend.nuvride.dto.DriverRegisterRequest;
// import com.nuvride_backend.nuvride.model.Driver;
// import com.nuvride_backend.nuvride.repository.DriverRepository;

// @RestController
// @RequestMapping("/api/driver")
// public class DriverRegisterController {

//     @Autowired private DriverRepository repo;
//     @Autowired private PasswordEncoder passwordEncoder;

//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody DriverRegisterRequest req) {
//         if (repo.findByEmail(req.email).isPresent()) return ResponseEntity.badRequest().body("Email exists");
//         Driver d = new Driver();
//         d.setName(req.name);
//         d.setEmail(req.email);
//         d.setPassword(passwordEncoder.encode(req.password));
//         d.setAvailable(false);
//         repo.save(d);
//         return ResponseEntity.ok("Registered");
//     }

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody DriverLoginRequest req) {
//         Driver d = repo.findByEmail(req.email).orElse(null);
//         if (d == null || !passwordEncoder.matches(req.password, d.getPassword()))
//             return ResponseEntity.status(401).body("Invalid credentials");
//         return ResponseEntity.ok(Map.of("driverId", d.getId()));
//     }

//     @PostMapping("/{id}/update-location")
//     public ResponseEntity<?> updateLocation(@PathVariable Long id, @RequestBody Map<String, Double> loc) {
//         Driver d = repo.findById(id).orElse(null);
//         if (d == null) return ResponseEntity.status(404).body("Driver not found");
//         d.setLatitude(loc.get("lat"));
//         d.setLongitude(loc.get("lng"));
//         repo.save(d);
//         return ResponseEntity.ok("Location updated");
//     }

//     @PostMapping("/{id}/toggle-availability")
//     public ResponseEntity<?> toggleAvailability(@PathVariable Long id) {
//         Driver d = repo.findById(id).orElse(null);
//         if (d == null) return ResponseEntity.status(404).body("Driver not found");
//         d.setAvailable(!d.isAvailable());
//         repo.save(d);
//         return ResponseEntity.ok(Map.of("available", d.isAvailable()));
//     }

//     @GetMapping("/{id}/requests")
//     public ResponseEntity<?> getRequests(@PathVariable Long id) {
//         Driver d = repo.findById(id).orElse(null);
//         if (d == null) return ResponseEntity.status(404).body("Driver not found");

//         // Replace with actual logic to fetch customer requests based on location
//         List<String> dummy = List.of("User A - 2.5km", "User B - 4km");
//         return ResponseEntity.ok(dummy);
//     }
// }