package com.fintrack.service;

import com.fintrack.dto.IncomeRequest;
import com.fintrack.dto.IncomeResponse;
import com.fintrack.entity.Category;
import com.fintrack.entity.Income;
import com.fintrack.entity.User;
import com.fintrack.repository.CategoryRepository;
import com.fintrack.repository.IncomeRepository;
import com.fintrack.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public IncomeService(
            IncomeRepository incomeRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {

        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    // ADD INCOME
    public IncomeResponse addIncome(
            IncomeRequest request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Category category = categoryRepository
                .findByIdAndUser(request.getCategoryId(), user)
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));

        Income income = new Income();

        income.setDescription(request.getDescription());
        income.setAmount(request.getAmount());
        income.setDate(request.getDate());

        // Required by the incomes table
        income.setIncomeType("OTHER");

        income.setUser(user);
        income.setCategory(category);

        Income savedIncome =
                incomeRepository.save(income);

        return toResponse(savedIncome);
    }

    // GET ALL INCOME
    public List<IncomeResponse> getIncomes(
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return incomeRepository
                .findByUser(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // UPDATE INCOME
    public IncomeResponse updateIncome(
            Long id,
            IncomeRequest request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Income income = incomeRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Income not found"));

        Category category = categoryRepository
                .findByIdAndUser(request.getCategoryId(), user)
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));

        income.setDescription(request.getDescription());
        income.setAmount(request.getAmount());
        income.setDate(request.getDate());
        income.setCategory(category);

        // Keep existing income type during update.
        if (income.getIncomeType() == null ||
                income.getIncomeType().isBlank()) {

            income.setIncomeType("OTHER");
        }

        Income updatedIncome =
                incomeRepository.save(income);

        return toResponse(updatedIncome);
    }

    // DELETE INCOME
    public void deleteIncome(
            Long id,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Income income = incomeRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Income not found"));

        incomeRepository.delete(income);
    }

    // ENTITY → RESPONSE
    private IncomeResponse toResponse(
            Income income) {

        return new IncomeResponse(
                income.getId(),
                income.getDescription(),
                income.getAmount(),
                income.getDate(),
                income.getCategory().getId(),
                income.getCategory().getName()
        );
    }
}