package com.fintrack.controller;

import com.fintrack.dto.ExpenseRequest;
import com.fintrack.dto.ExpenseResponse;
import com.fintrack.service.ExpenseService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(
            ExpenseService expenseService
    ) {
        this.expenseService = expenseService;
    }


    // =====================================================
    // ADD EXPENSE
    // POST /api/expenses
    // =====================================================

    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(
            @RequestBody ExpenseRequest request,
            Authentication authentication
    ) {

        ExpenseResponse response =
                expenseService.addExpense(
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // GET ALL EXPENSES
    // GET /api/expenses
    // =====================================================

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getExpenses(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                expenseService.getExpenses(
                        authentication.getName()
                )
        );
    }


    // =====================================================
    // UPDATE EXPENSE
    // PUT /api/expenses/{id}
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request,
            Authentication authentication
    ) {

        ExpenseResponse response =
                expenseService.updateExpense(
                        id,
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // DELETE EXPENSE
    // DELETE /api/expenses/{id}
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(
            @PathVariable Long id,
            Authentication authentication
    ) {

        expenseService.deleteExpense(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                "Expense deleted successfully"
        );
    }
}