package com.fintrack.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public ContactMessage() {
    }

    // =========================================================
    // GET ID
    // =========================================================

    public Long getId() {
        return id;
    }

    // =========================================================
    // GET NAME
    // =========================================================

    public String getName() {
        return name;
    }

    // =========================================================
    // SET NAME
    // =========================================================

    public void setName(String name) {
        this.name = name;
    }

    // =========================================================
    // GET EMAIL
    // =========================================================

    public String getEmail() {
        return email;
    }

    // =========================================================
    // SET EMAIL
    // =========================================================

    public void setEmail(String email) {
        this.email = email;
    }

    // =========================================================
    // GET MESSAGE
    // =========================================================

    public String getMessage() {
        return message;
    }

    // =========================================================
    // SET MESSAGE
    // =========================================================

    public void setMessage(String message) {
        this.message = message;
    }

    // =========================================================
    // GET STATUS
    // =========================================================

    public String getStatus() {
        return status;
    }

    // =========================================================
    // SET STATUS
    // =========================================================

    public void setStatus(String status) {
        this.status = status;
    }

    // =========================================================
    // GET CREATED AT
    // =========================================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // =========================================================
    // SET CREATED AT
    // =========================================================

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // =========================================================
    // AUTOMATIC CREATED DATE
    // =========================================================

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (status == null || status.trim().isEmpty()) {
            status = "NEW";
        }
    }
}