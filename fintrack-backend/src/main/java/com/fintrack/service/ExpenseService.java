package com.fintrack.service;

import com.fintrack.dto.ExpenseRequest;
import com.fintrack.dto.ExpenseResponse;
import com.fintrack.entity.Category;
import com.fintrack.entity.Expense;
import com.fintrack.entity.User;
import com.fintrack.repository.CategoryRepository;
import com.fintrack.repository.ExpenseRepository;
import com.fintrack.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository
    ) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }


    // =====================================================
    // ADD EXPENSE
    // =====================================================

    public ExpenseResponse addExpense(
            ExpenseRequest request,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        Category category = categoryRepository
                .findByIdAndUser(
                        request.getCategoryId(),
                        user
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Category not found"
                        )
                );


        Expense expense = new Expense();

        expense.setDescription(
                request.getDescription()
        );

        expense.setAmount(
                request.getAmount()
        );

        expense.setDate(
                request.getDate()
        );

        expense.setUser(user);

        expense.setCategory(category);


        Expense savedExpense =
                expenseRepository.save(expense);


        return toResponse(savedExpense);
    }


    // =====================================================
    // GET ALL EXPENSES
    // =====================================================

    public List<ExpenseResponse> getExpenses(
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        return expenseRepository
                .findByUser(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =====================================================
    // UPDATE EXPENSE
    // =====================================================

    public ExpenseResponse updateExpense(
            Long id,
            ExpenseRequest request,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        Expense expense = expenseRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Expense not found"
                        )
                );


        Category category = categoryRepository
                .findByIdAndUser(
                        request.getCategoryId(),
                        user
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Category not found"
                        )
                );


        expense.setDescription(
                request.getDescription()
        );

        expense.setAmount(
                request.getAmount()
        );

        expense.setDate(
                request.getDate()
        );

        expense.setCategory(category);


        Expense updatedExpense =
                expenseRepository.save(expense);


        return toResponse(updatedExpense);
    }


    // =====================================================
    // DELETE EXPENSE
    // =====================================================

    public void deleteExpense(
            Long id,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        Expense expense = expenseRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Expense not found"
                        )
                );


        expenseRepository.delete(expense);
    }


    // =====================================================
    // ENTITY → RESPONSE
    // =====================================================

    private ExpenseResponse toResponse(
            Expense expense
    ) {

        return new ExpenseResponse(
                expense.getId(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getDate(),
                expense.getCategory().getId(),
                expense.getCategory().getName()
        );
    }
}