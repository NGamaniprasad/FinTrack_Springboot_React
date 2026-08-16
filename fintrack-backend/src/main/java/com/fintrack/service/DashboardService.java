package com.fintrack.service;

import com.fintrack.dto.DashboardResponse;
import com.fintrack.entity.User;
import com.fintrack.repository.BudgetRepository;
import com.fintrack.repository.ExpenseRepository;
import com.fintrack.repository.IncomeRepository;
import com.fintrack.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    public DashboardService(
            UserRepository userRepository,
            IncomeRepository incomeRepository,
            ExpenseRepository expenseRepository,
            BudgetRepository budgetRepository) {

        this.userRepository = userRepository;
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
    }

    public DashboardResponse getDashboard(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        BigDecimal totalIncome =
                incomeRepository.findByUser(user)
                        .stream()
                        .map(income -> income.getAmount())
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense =
                expenseRepository.findByUser(user)
                        .stream()
                        .map(expense -> expense.getAmount())
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalBudget =
                budgetRepository.findByUser(user)
                        .stream()
                        .map(budget -> budget.getAmount())
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal balance =
                totalIncome.subtract(totalExpense);

        return new DashboardResponse(
                totalIncome,
                totalExpense,
                balance,
                totalBudget
        );
    }
}