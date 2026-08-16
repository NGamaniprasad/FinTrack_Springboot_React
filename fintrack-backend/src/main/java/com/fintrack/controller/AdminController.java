package com.fintrack.controller;

import com.fintrack.dto.AdminCreateRequest;
import com.fintrack.dto.AdminDashboardResponse;
import com.fintrack.entity.User;
import com.fintrack.repository.UserRepository;
import com.fintrack.service.AdminService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminService adminService;

    public AdminController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AdminService adminService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminService = adminService;
    }

    // =====================================================
    // CREATE ADMIN
    // =====================================================

    @PostMapping("/create")
    public ResponseEntity<?> createAdmin(
            @RequestBody AdminCreateRequest request
    ) {

        if (request.getFullName() == null ||
            request.getEmail() == null ||
            request.getPassword() == null) {

            return ResponseEntity.badRequest()
                    .body("Full name, email and password are required");
        }

        if (userRepository.existsByEmail(request.getEmail())) {

            return ResponseEntity.badRequest()
                    .body("Email already exists");
        }

        User admin = new User();

        admin.setFullName(request.getFullName());
        admin.setEmail(request.getEmail());

        admin.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        admin.setRole("ADMIN");
        admin.setActive(true);

        userRepository.save(admin);

        return ResponseEntity.ok(
                "Admin created successfully"
        );
    }


    // =====================================================
    // ADMIN DASHBOARD
    // =====================================================

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                adminService.getDashboard()
        );
    }
}