
///

package com.fintrack.service;

import com.fintrack.dto.BudgetRequest;
import com.fintrack.dto.BudgetResponse;
import com.fintrack.entity.Budget;
import com.fintrack.entity.Category;
import com.fintrack.entity.User;
import com.fintrack.repository.BudgetRepository;
import com.fintrack.repository.CategoryRepository;
import com.fintrack.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public BudgetService(
            BudgetRepository budgetRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {

        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public BudgetResponse addBudget(
            BudgetRequest request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));

        if (!"EXPENSE".equalsIgnoreCase(category.getType())) {
            throw new RuntimeException(
                    "Budget category must be an expense category");
        }

        Budget budget = new Budget();

        budget.setMonth(request.getMonth());
        budget.setAmount(request.getAmount());
        budget.setUser(user);
        budget.setCategory(category);

        Budget savedBudget =
                budgetRepository.save(budget);

        return convertToResponse(savedBudget);
    }

    public List<BudgetResponse> getBudgets(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return budgetRepository
                .findByUser(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public BudgetResponse updateBudget(
            Long id,
            BudgetRequest request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Budget budget = budgetRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Budget not found"));

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));

        if (!"EXPENSE".equalsIgnoreCase(category.getType())) {
            throw new RuntimeException(
                    "Budget category must be an expense category");
        }

        budget.setMonth(request.getMonth());
        budget.setAmount(request.getAmount());
        budget.setCategory(category);

        Budget updatedBudget =
                budgetRepository.save(budget);

        return convertToResponse(updatedBudget);
    }

    public void deleteBudget(
            Long id,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Budget budget = budgetRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Budget not found"));

        budgetRepository.delete(budget);
    }

    private BudgetResponse convertToResponse(
            Budget budget) {

        return new BudgetResponse(
                budget.getId(),
                budget.getMonth(),
                budget.getAmount(),
                budget.getCategory().getId(),
                budget.getCategory().getName()
        );
    }
}