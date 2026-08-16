
package com.fintrack.controller;

import com.fintrack.entity.ContactMessage;
import com.fintrack.service.ContactMessageService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(
            ContactMessageService contactMessageService) {

        this.contactMessageService =
                contactMessageService;
    }

    // =========================================================
    // CUSTOMER SEND MESSAGE
    // =========================================================

    @PostMapping
    public ResponseEntity<?> sendMessage(
            @RequestBody ContactMessageRequest request) {

        try {

            ContactMessage savedMessage =
                    contactMessageService.saveMessage(
                            request.getName(),
                            request.getEmail(),
                            request.getMessage()
                    );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    true
            );

            response.put(
                    "message",
                    "Your message has been received successfully."
            );

            response.put(
                    "id",
                    savedMessage.getId()
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

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

    // =========================================================
    // GET ALL MESSAGES
    // =========================================================

    @GetMapping
    public ResponseEntity<List<ContactMessage>>
    getAllMessages() {

        return ResponseEntity.ok(
                contactMessageService.getAllMessages()
        );
    }

    // =========================================================
    // GET NEW MESSAGES
    // =========================================================

    @GetMapping("/new")
    public ResponseEntity<List<ContactMessage>>
    getNewMessages() {

        return ResponseEntity.ok(
                contactMessageService.getNewMessages()
        );
    }

    // =========================================================
    // GET MESSAGE BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage>
    getMessageById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                contactMessageService.getMessageById(id)
        );
    }

    // =========================================================
    // MARK MESSAGE AS READ
    // =========================================================

    @PutMapping("/{id}/read")
    public ResponseEntity<ContactMessage>
    markAsRead(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                contactMessageService.markAsRead(id)
        );
    }

    // =========================================================
    // DELETE MESSAGE
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(
            @PathVariable Long id) {

        contactMessageService.deleteMessage(id);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "success",
                true
        );

        response.put(
                "message",
                "Contact message deleted successfully."
        );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // REQUEST DTO
    // =========================================================

    public static class ContactMessageRequest {

        private String name;

        private String email;

        private String message;

        public ContactMessageRequest() {
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
