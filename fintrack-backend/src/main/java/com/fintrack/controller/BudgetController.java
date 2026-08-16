package com.fintrack.controller;

import com.fintrack.dto.BudgetRequest;
import com.fintrack.dto.BudgetResponse;
import com.fintrack.service.BudgetService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public ResponseEntity<BudgetResponse> addBudget(
            @RequestBody BudgetRequest request,
            Authentication authentication) {

        BudgetResponse response = budgetService.addBudget(
                request,
                authentication.getName()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<BudgetResponse>> getBudgets(
            Authentication authentication) {

        return ResponseEntity.ok(
                budgetService.getBudgets(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetResponse> updateBudget(
            @PathVariable Long id,
            @RequestBody BudgetRequest request,
            Authentication authentication) {

        BudgetResponse response = budgetService.updateBudget(
                id,
                request,
                authentication.getName()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBudget(
            @PathVariable Long id,
            Authentication authentication) {

        budgetService.deleteBudget(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok("Budget deleted successfully");
    }
}