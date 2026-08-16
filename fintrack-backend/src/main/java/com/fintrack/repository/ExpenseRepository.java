package com.fintrack.repository;

import com.fintrack.entity.Expense;
import com.fintrack.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);

    Optional<Expense> findByIdAndUser(
            Long id,
            User user
    );
}