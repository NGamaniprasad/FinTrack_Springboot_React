
package com.fintrack.controller;

import com.fintrack.entity.User;
import com.fintrack.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminProfileController {

    private final UserService userService;

    public AdminProfileController(
            UserService userService
    ) {
        this.userService = userService;
    }


    // =====================================================
    // GET ADMIN PROFILE
    // =====================================================

    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        User user =
                userService.getProfile(email);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "id",
                user.getId()
        );

        response.put(
                "fullName",
                user.getFullName()
        );

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "role",
                user.getRole()
        );

        response.put(
                "active",
                user.isActive()
        );

        response.put(
                "createdAt",
                user.getCreatedAt()
        );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // UPDATE ADMIN PROFILE
    // =====================================================

    @PutMapping("/profile")
    public ResponseEntity<?> updateAdminProfile(
            Authentication authentication,
            @RequestBody AdminProfileRequest request
    ) {

        try {

            String currentEmail =
                    authentication.getName();

            User updatedUser =
                    userService.updateProfile(
                            currentEmail,
                            request.getFullName(),
                            request.getEmail()
                    );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    true
            );

            response.put(
                    "message",
                    "Admin profile updated successfully."
            );

            response.put(
                    "fullName",
                    updatedUser.getFullName()
            );

            response.put(
                    "email",
                    updatedUser.getEmail()
            );

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException exception) {

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    false
            );

            response.put(
                    "message",
                    exception.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }


    // =====================================================
    // CHANGE ADMIN PASSWORD
    // =====================================================

    @PutMapping("/change-password")
    public ResponseEntity<?> changeAdminPassword(
            Authentication authentication,
            @RequestBody ChangePasswordRequest request
    ) {

        try {

            String email =
                    authentication.getName();

            userService.changePassword(
                    email,
                    request.getCurrentPassword(),
                    request.getNewPassword()
            );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    true
            );

            response.put(
                    "message",
                    "Admin password changed successfully."
            );

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException exception) {

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    false
            );

            response.put(
                    "message",
                    exception.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }


    // =====================================================
    // ADMIN PROFILE REQUEST
    // =====================================================

    public static class AdminProfileRequest {

        private String fullName;

        private String email;


        public AdminProfileRequest() {
        }


        public String getFullName() {
            return fullName;
        }


        public void setFullName(
                String fullName
        ) {
            this.fullName = fullName;
        }


        public String getEmail() {
            return email;
        }


        public void setEmail(
                String email
        ) {
            this.email = email;
        }
    }


    // =====================================================
    // CHANGE PASSWORD REQUEST
    // =====================================================

    public static class ChangePasswordRequest {

        private String currentPassword;

        private String newPassword;


        public ChangePasswordRequest() {
        }


        public String getCurrentPassword() {
            return currentPassword;
        }


        public void setCurrentPassword(
                String currentPassword
        ) {
            this.currentPassword =
                    currentPassword;
        }


        public String getNewPassword() {
            return newPassword;
        }


        public void setNewPassword(
                String newPassword
        ) {
            this.newPassword =
                    newPassword;
        }
    }
}

