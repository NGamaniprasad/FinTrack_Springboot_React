package com.fintrack.controller;

import com.fintrack.dto.IncomeRequest;
import com.fintrack.dto.IncomeResponse;
import com.fintrack.service.IncomeService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping
    public ResponseEntity<IncomeResponse> addIncome(
            @RequestBody IncomeRequest request,
            Authentication authentication) {

        IncomeResponse response =
                incomeService.addIncome(
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<IncomeResponse>> getIncomes(
            Authentication authentication) {

        return ResponseEntity.ok(
                incomeService.getIncomes(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<IncomeResponse> updateIncome(
            @PathVariable Long id,
            @RequestBody IncomeRequest request,
            Authentication authentication) {

        IncomeResponse response =
                incomeService.updateIncome(
                        id,
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIncome(
            @PathVariable Long id,
            Authentication authentication) {

        incomeService.deleteIncome(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                "Income deleted successfully"
        );
    }
}