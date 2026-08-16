package com.fintrack.service;

import com.fintrack.dto.UserResponse;
import com.fintrack.dto.UserUpdateRequest;
import com.fintrack.entity.User;
import com.fintrack.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // =====================================================
    // USER PROFILE
    // =====================================================

    public User getProfile(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }


    // =====================================================
    // UPDATE USER PROFILE
    // =====================================================

    public User updateProfile(
            String currentEmail,
            String fullName,
            String email
    ) {

        User user = userRepository
                .findByEmail(currentEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        if (fullName == null ||
                fullName.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Full name is required"
            );
        }


        if (email == null ||
                email.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email is required"
            );
        }


        String newEmail =
                email.trim();


        // Check whether another user
        // already has this email

        if (!newEmail.equalsIgnoreCase(
                user.getEmail()
        )) {

            if (userRepository.existsByEmail(
                    newEmail
            )) {

                throw new IllegalArgumentException(
                        "Email already registered"
                );
            }
        }


        user.setFullName(
                fullName.trim()
        );

        user.setEmail(
                newEmail
        );


        return userRepository.save(user);
    }


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    public void changePassword(
            String email,
            String currentPassword,
            String newPassword
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        // Check current password

        if (!passwordEncoder.matches(
                currentPassword,
                user.getPassword()
        )) {

            throw new IllegalArgumentException(
                    "Current password is incorrect"
            );
        }


        // Validate new password

        if (newPassword == null ||
                newPassword.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "New password is required"
            );
        }


        if (newPassword.length() < 6) {

            throw new IllegalArgumentException(
                    "New password must be at least 6 characters"
            );
        }


        // Prevent same password

        if (passwordEncoder.matches(
                newPassword,
                user.getPassword()
        )) {

            throw new IllegalArgumentException(
                    "New password must be different from current password"
            );
        }


        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );


        userRepository.save(user);
    }


    // =====================================================
    // ADMIN - GET ALL USERS
    // =====================================================

    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(this::convertToUserResponse)
                .toList();
    }


    // =====================================================
    // ADMIN - GET USER BY ID
    // =====================================================

    public UserResponse getUserById(
            Long id
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        return convertToUserResponse(user);
    }


    // =====================================================
    // ADMIN - UPDATE USER
    // =====================================================

    public UserResponse updateUser(
            Long id,
            UserUpdateRequest request
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        // Full name

        if (request.getFullName() != null &&
                !request.getFullName()
                        .trim()
                        .isEmpty()) {

            user.setFullName(
                    request.getFullName()
                            .trim()
            );
        }


        // Email

        if (request.getEmail() != null &&
                !request.getEmail()
                        .trim()
                        .isEmpty()) {

            String email =
                    request.getEmail()
                            .trim();


            // Check duplicate email

            if (!email.equalsIgnoreCase(
                    user.getEmail()
            )) {

                if (userRepository.existsByEmail(
                        email
                )) {

                    throw new IllegalArgumentException(
                            "Email already registered"
                    );
                }
            }


            user.setEmail(email);
        }


        User savedUser =
                userRepository.save(user);


        return convertToUserResponse(
                savedUser
        );
    }


    // =====================================================
    // ADMIN - ACTIVATE USER
    // =====================================================

    public UserResponse activateUser(
            Long id
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        user.setActive(true);


        User savedUser =
                userRepository.save(user);


        return convertToUserResponse(
                savedUser
        );
    }


    // =====================================================
    // ADMIN - DEACTIVATE USER
    // =====================================================

    public UserResponse deactivateUser(
            Long id
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        user.setActive(false);


        User savedUser =
                userRepository.save(user);


        return convertToUserResponse(
                savedUser
        );
    }


    // =====================================================
    // ADMIN - DELETE USER
    // =====================================================

    public void deleteUser(
            Long id
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        userRepository.delete(user);
    }


    // =====================================================
    // CONVERT USER -> USER RESPONSE
    // =====================================================

    private UserResponse convertToUserResponse(
            User user
    ) {

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt()
        );
    }
}