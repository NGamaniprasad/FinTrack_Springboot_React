
package com.fintrack.service;

import com.fintrack.entity.ContactMessage;
import com.fintrack.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository) {

        this.contactMessageRepository =
                contactMessageRepository;
    }

    // =========================================================
    // SAVE CUSTOMER MESSAGE
    // =========================================================

    public ContactMessage saveMessage(
            String name,
            String email,
            String message) {

        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Name is required"
            );
        }

        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Email is required"
            );
        }

        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Message is required"
            );
        }

        ContactMessage contactMessage =
                new ContactMessage();

        contactMessage.setName(name.trim());
        contactMessage.setEmail(email.trim());
        contactMessage.setMessage(message.trim());

        // New customer message
        contactMessage.setStatus("NEW");

        return contactMessageRepository.save(
                contactMessage
        );
    }

    // =========================================================
    // GET ALL MESSAGES
    // =========================================================

    public List<ContactMessage> getAllMessages() {

        return contactMessageRepository
                .findAllByOrderByCreatedAtDesc();
    }

    // =========================================================
    // GET NEW MESSAGES
    // =========================================================

    public List<ContactMessage> getNewMessages() {

        return contactMessageRepository
                .findByStatusOrderByCreatedAtDesc(
                        "NEW"
                );
    }

    // =========================================================
    // GET MESSAGE BY ID
    // =========================================================

    public ContactMessage getMessageById(Long id) {

        return contactMessageRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Contact message not found"
                        )
                );
    }

    // =========================================================
    // MARK MESSAGE AS READ
    // =========================================================

    public ContactMessage markAsRead(Long id) {

        ContactMessage contactMessage =
                getMessageById(id);

        contactMessage.setStatus("READ");

        return contactMessageRepository.save(
                contactMessage
        );
    }

    // =========================================================
    // DELETE MESSAGE
    // =========================================================

    public void deleteMessage(Long id) {

        if (!contactMessageRepository.existsById(id)) {

            throw new RuntimeException(
                    "Contact message not found"
            );
        }

        contactMessageRepository.deleteById(id);
    }
}
