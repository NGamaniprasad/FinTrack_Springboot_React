package com.fintrack.service;

import com.fintrack.dto.AdminDashboardResponse;
import com.fintrack.repository.BudgetRepository;
import com.fintrack.repository.CategoryRepository;
import com.fintrack.repository.ExpenseRepository;
import com.fintrack.repository.IncomeRepository;
import com.fintrack.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    public AdminService(
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            IncomeRepository incomeRepository,
            ExpenseRepository expenseRepository,
            BudgetRepository budgetRepository
    ) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
    }

    public AdminDashboardResponse getDashboard() {

        long totalUsers =
                userRepository.count();

        long activeUsers =
                userRepository.countByActiveTrue();

        long inactiveUsers =
                userRepository.countByActiveFalse();

        long totalCategories =
                categoryRepository.count();

        long totalBudgets =
                budgetRepository.count();

        long totalIncomes =
                incomeRepository.count();

        long totalExpenses =
                expenseRepository.count();

        return new AdminDashboardResponse(
                totalUsers,
                activeUsers,
                inactiveUsers,
                totalCategories,
                totalBudgets,
                totalIncomes,
                totalExpenses
        );
    }
}