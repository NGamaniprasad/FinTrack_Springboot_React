//package com.fintrack.controller;
//
//import com.fintrack.dto.ProfileResponse;
//import com.fintrack.entity.User;
//import com.fintrack.repository.UserRepository;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//    private final UserRepository userRepository;
//
//    // Explicit constructor
//    public UserController(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @GetMapping("/profile")
//    public ResponseEntity<ProfileResponse> getProfile(
//            Authentication authentication
//    ) {
//
//        User user = userRepository
//                .findByEmail(authentication.getName())
//                .orElseThrow();
//
//        return ResponseEntity.ok(
//                new ProfileResponse(
//                        user.getId(),
//                        user.getFullName(),
//                        user.getEmail(),
//                        user.getRole()
//                )
//        );
//    }
//}



package com.fintrack.controller;

import com.fintrack.dto.ChangePasswordRequest;
import com.fintrack.dto.ProfileResponse;
import com.fintrack.entity.User;
import com.fintrack.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }


    // =====================================================
    // GET USER PROFILE
    // GET /api/users/profile
    // =====================================================

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile(
            Authentication authentication
    ) {

        User user = userService.getProfile(
                authentication.getName()
        );

        return ResponseEntity.ok(
                new ProfileResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole()
                )
        );
    }


    // =====================================================
    // UPDATE USER PROFILE
    // PUT /api/users/profile
    // =====================================================

    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateRequest request
    ) {

        User user = userService.updateProfile(
                authentication.getName(),
                request.getFullName(),
                request.getEmail()
        );

        return ResponseEntity.ok(
                new ProfileResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole()
                )
        );
    }


    // =====================================================
    // CHANGE PASSWORD
    // PUT /api/users/change-password
    // =====================================================

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            Authentication authentication,
            @RequestBody ChangePasswordRequest request
    ) {

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body("New password and confirm password do not match");
        }


        userService.changePassword(
                authentication.getName(),
                request.getCurrentPassword(),
                request.getNewPassword()
        );


        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }


    // =====================================================
    // PROFILE UPDATE REQUEST
    // =====================================================

    public static class ProfileUpdateRequest {

        private String fullName;

        private String email;


        public ProfileUpdateRequest() {
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
}