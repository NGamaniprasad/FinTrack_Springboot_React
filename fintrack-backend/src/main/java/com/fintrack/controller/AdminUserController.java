
package com.fintrack.controller;

import com.fintrack.dto.UserResponse;
import com.fintrack.dto.UserUpdateRequest;
import com.fintrack.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }


    // =====================================================
    // GET ALL USERS
    // GET /api/admin/users
    // =====================================================

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }


    // =====================================================
    // GET USER BY ID
    // GET /api/admin/users/{id}
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }


    // =====================================================
    // UPDATE USER
    // PUT /api/admin/users/{id}
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateRequest request
    ) {

        return ResponseEntity.ok(
                userService.updateUser(id, request)
        );
    }


    // =====================================================
    // ACTIVATE USER
    // PATCH /api/admin/users/{id}/activate
    // =====================================================

    @PatchMapping("/{id}/activate")
    public ResponseEntity<UserResponse> activateUser(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                userService.activateUser(id)
        );
    }


    // =====================================================
    // DEACTIVATE USER
    // PATCH /api/admin/users/{id}/deactivate
    // =====================================================

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<UserResponse> deactivateUser(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                userService.deactivateUser(id)
        );
    }


    // =====================================================
    // DELETE USER
    // DELETE /api/admin/users/{id}
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id
    ) {

        userService.deleteUser(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}

