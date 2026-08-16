//package com.fintrack.service;
//
//import com.fintrack.entity.Budget;
//import com.fintrack.entity.Category;
//import com.fintrack.entity.Expense;
//import com.fintrack.entity.Income;
//import com.fintrack.entity.User;
//import com.fintrack.repository.BudgetRepository;
//import com.fintrack.repository.CategoryRepository;
//import com.fintrack.repository.ExpenseRepository;
//import com.fintrack.repository.IncomeRepository;
//import com.fintrack.repository.UserRepository;
//
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.time.DayOfWeek;
//import java.time.LocalDate;
//import java.time.YearMonth;
//import java.time.temporal.TemporalAdjusters;
//import java.util.List;
//
//@Service
//public class ExportService {
//
//    private final UserRepository userRepository;
//    private final IncomeRepository incomeRepository;
//    private final ExpenseRepository expenseRepository;
//    private final BudgetRepository budgetRepository;
//    private final CategoryRepository categoryRepository;
//
//    public ExportService(
//            UserRepository userRepository,
//            IncomeRepository incomeRepository,
//            ExpenseRepository expenseRepository,
//            BudgetRepository budgetRepository,
//            CategoryRepository categoryRepository) {
//
//        this.userRepository = userRepository;
//        this.incomeRepository = incomeRepository;
//        this.expenseRepository = expenseRepository;
//        this.budgetRepository = budgetRepository;
//        this.categoryRepository = categoryRepository;
//    }
//
//    public String generateCsv(
//            String email,
//            String period) {
//
//        User user = userRepository
//                .findByEmail(email)
//                .orElseThrow(() ->
//                        new RuntimeException("User not found"));
//
//        LocalDate today = LocalDate.now();
//
//        LocalDate startDate;
//        LocalDate endDate;
//
//        switch (period.toLowerCase()) {
//
//            case "weekly":
//
//                startDate = today.with(
//                        TemporalAdjusters.previousOrSame(
//                                DayOfWeek.MONDAY));
//
//                endDate = startDate.plusDays(6);
//
//                break;
//
//            case "monthly":
//
//                YearMonth currentMonth =
//                        YearMonth.from(today);
//
//                startDate =
//                        currentMonth.atDay(1);
//
//                endDate =
//                        currentMonth.atEndOfMonth();
//
//                break;
//
//            case "yearly":
//
//                startDate =
//                        LocalDate.of(
//                                today.getYear(),
//                                1,
//                                1);
//
//                endDate =
//                        LocalDate.of(
//                                today.getYear(),
//                                12,
//                                31);
//
//                break;
//
//            default:
//
//                throw new IllegalArgumentException(
//                        "Invalid period. Use weekly, monthly or yearly.");
//        }
//
//        List<Income> incomes =
//                incomeRepository.findByUser(user);
//
//        List<Expense> expenses =
//                expenseRepository.findByUser(user);
//
//        List<Budget> budgets =
//                budgetRepository.findByUser(user);
//
//        List<Category> categories =
//                categoryRepository.findByUser(user);
//
//        StringBuilder csv =
//                new StringBuilder();
//
//        csv.append("FINTRACK ACCOUNT DATA\n");
//        csv.append("Period,")
//                .append(period.toUpperCase())
//                .append("\n");
//
//        csv.append("Start Date,")
//                .append(startDate)
//                .append("\n");
//
//        csv.append("End Date,")
//                .append(endDate)
//                .append("\n\n");
//
//
//        // =====================================================
//        // INCOME
//        // =====================================================
//
//        csv.append("INCOME\n");
//
//        csv.append(
//                "Date,Description,Amount,Category\n"
//        );
//
//        BigDecimal totalIncome =
//                BigDecimal.ZERO;
//
//        for (Income income : incomes) {
//
//            /*
//             * Adjust these getter names only if your
//             * Income entity uses different names.
//             */
//
//            LocalDate date =
//                    income.getDate();
//
//            if (date != null
//                    && !date.isBefore(startDate)
//                    && !date.isAfter(endDate)) {
//
//                BigDecimal amount =
//                        income.getAmount();
//
//                totalIncome =
//                        totalIncome.add(
//                                amount != null
//                                        ? amount
//                                        : BigDecimal.ZERO);
//
//                csv.append(csvValue(date))
//                        .append(",")
//                        .append(csvValue(
//                                income.getDescription()))
//                        .append(",")
//                        .append(csvValue(amount))
//                        .append(",")
//                        .append(csvValue(
//                                income.getCategory() != null
//                                        ? income.getCategory().getName()
//                                        : ""))
//                        .append("\n");
//            }
//        }
//
//        csv.append("Total Income,,,")
//                .append(totalIncome)
//                .append("\n\n");
//
//
//        // =====================================================
//        // EXPENSE
//        // =====================================================
//
//        csv.append("EXPENSES\n");
//
//        csv.append(
//                "Date,Description,Amount,Category\n"
//        );
//
//        BigDecimal totalExpense =
//                BigDecimal.ZERO;
//
//        for (Expense expense : expenses) {
//
//            LocalDate date =
//                    expense.getDate();
//
//            if (date != null
//                    && !date.isBefore(startDate)
//                    && !date.isAfter(endDate)) {
//
//                BigDecimal amount =
//                        expense.getAmount();
//
//                totalExpense =
//                        totalExpense.add(
//                                amount != null
//                                        ? amount
//                                        : BigDecimal.ZERO);
//
//                csv.append(csvValue(date))
//                        .append(",")
//                        .append(csvValue(
//                                expense.getDescription()))
//                        .append(",")
//                        .append(csvValue(amount))
//                        .append(",")
//                        .append(csvValue(
//                                expense.getCategory() != null
//                                        ? expense.getCategory().getName()
//                                        : ""))
//                        .append("\n");
//            }
//        }
//
//        csv.append("Total Expenses,,,")
//                .append(totalExpense)
//                .append("\n\n");
//
//
//        // =====================================================
//        // BUDGET
//        // =====================================================
//
//        csv.append("BUDGETS\n");
//
//        csv.append(
//                "Month,Category,Amount\n"
//        );
//
//        BigDecimal totalBudget =
//                BigDecimal.ZERO;
//
//        for (Budget budget : budgets) {
//
//            String budgetMonth =
//                    budget.getMonth();
//
//            if (budgetMonth != null) {
//
//                YearMonth budgetYearMonth =
//                        YearMonth.parse(budgetMonth);
//
//                YearMonth startMonth =
//                        YearMonth.from(startDate);
//
//                YearMonth endMonth =
//                        YearMonth.from(endDate);
//
//                if (!budgetYearMonth.isBefore(startMonth)
//                        && !budgetYearMonth.isAfter(endMonth)) {
//
//                    BigDecimal amount =
//                            budget.getAmount();
//
//                    totalBudget =
//                            totalBudget.add(
//                                    amount != null
//                                            ? amount
//                                            : BigDecimal.ZERO);
//
//                    csv.append(csvValue(budgetMonth))
//                            .append(",")
//                            .append(csvValue(
//                                    budget.getCategory() != null
//                                            ? budget.getCategory().getName()
//                                            : ""))
//                            .append(",")
//                            .append(csvValue(amount))
//                            .append("\n");
//                }
//            }
//        }
//
//        csv.append("Total Budget,,")
//                .append(totalBudget)
//                .append("\n\n");
//
//
//        // =====================================================
//        // CATEGORIES
//        // =====================================================
//
//        csv.append("CATEGORIES\n");
//
//        csv.append(
//                "Name,Type\n"
//        );
//
//        for (Category category : categories) {
//
//            csv.append(
//                    csvValue(category.getName()))
//                    .append(",")
//                    .append(
//                            csvValue(category.getType()))
//                    .append("\n");
//        }
//
//
//        // =====================================================
//        // SUMMARY
//        // =====================================================
//
//        csv.append("\n");
//
//        csv.append("SUMMARY\n");
//
//        csv.append("Total Income,")
//                .append(totalIncome)
//                .append("\n");
//
//        csv.append("Total Expenses,")
//                .append(totalExpense)
//                .append("\n");
//
//        csv.append("Balance,")
//                .append(
//                        totalIncome.subtract(
//                                totalExpense))
//                .append("\n");
//
//        csv.append("Total Budget,")
//                .append(totalBudget)
//                .append("\n");
//
//        return csv.toString();
//    }
//
//
//    private String csvValue(
//            Object value) {
//
//        if (value == null) {
//            return "";
//        }
//
//        String text =
//                String.valueOf(value);
//
//        text = text.replace(
//                "\"",
//                "\"\"");
//
//        return "\"" + text + "\"";
//    }
//}




package com.fintrack.service;

import com.fintrack.entity.Budget;
import com.fintrack.entity.Category;
import com.fintrack.entity.Expense;
import com.fintrack.entity.Income;
import com.fintrack.entity.User;
import com.fintrack.repository.BudgetRepository;
import com.fintrack.repository.CategoryRepository;
import com.fintrack.repository.ExpenseRepository;
import com.fintrack.repository.IncomeRepository;
import com.fintrack.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
public class ExportService {

    private final UserRepository userRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;

    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("dd-MMM-yyyy");

    private static final DateTimeFormatter MONTH_FORMAT =
            DateTimeFormatter.ofPattern("MMMM yyyy");

    public ExportService(
            UserRepository userRepository,
            IncomeRepository incomeRepository,
            ExpenseRepository expenseRepository,
            BudgetRepository budgetRepository,
            CategoryRepository categoryRepository) {

        this.userRepository = userRepository;
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
        this.categoryRepository = categoryRepository;
    }

    public String generateCsv(
            String email,
            String period) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (period == null || period.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Period is required. Use weekly, monthly or yearly."
            );
        }

        period = period.trim().toLowerCase();

        LocalDate today = LocalDate.now();

        LocalDate startDate;
        LocalDate endDate;

        switch (period) {

            case "weekly":

                startDate = today.with(
                        TemporalAdjusters.previousOrSame(
                                DayOfWeek.MONDAY
                        )
                );

                endDate = startDate.plusDays(6);

                break;

            case "monthly":

                YearMonth currentMonth =
                        YearMonth.from(today);

                startDate = currentMonth.atDay(1);
                endDate = currentMonth.atEndOfMonth();

                break;

            case "yearly":

                startDate = LocalDate.of(
                        today.getYear(),
                        1,
                        1
                );

                endDate = LocalDate.of(
                        today.getYear(),
                        12,
                        31
                );

                break;

            default:

                throw new IllegalArgumentException(
                        "Invalid period. Use weekly, monthly or yearly."
                );
        }

        List<Income> incomes =
                incomeRepository.findByUser(user);

        List<Expense> expenses =
                expenseRepository.findByUser(user);

        List<Budget> budgets =
                budgetRepository.findByUser(user);

        List<Category> categories =
                categoryRepository.findByUser(user);

        StringBuilder csv = new StringBuilder();

        /*
         * UTF-8 BOM.
         * This helps Microsoft Excel correctly recognize UTF-8.
         */
        csv.append("\uFEFF");

        // =====================================================
        // FINTRACK HEADER
        // =====================================================

        csv.append("FINTRACK ACCOUNT DATA\n");
        csv.append("\n");

        csv.append("Period,")
                .append(csvValue(capitalize(period)))
                .append("\n");

        csv.append("Start Date,")
                .append(csvValue(formatDate(startDate)))
                .append("\n");

        csv.append("End Date,")
                .append(csvValue(formatDate(endDate)))
                .append("\n");

        csv.append("Generated Date,")
                .append(csvValue(formatDate(today)))
                .append("\n");

        csv.append("\n");

        // =====================================================
        // INCOME
        // =====================================================

        csv.append("INCOME\n");

        csv.append(
                "Date,Description,Amount,Category,Income Type\n"
        );

        BigDecimal totalIncome = BigDecimal.ZERO;

        for (Income income : incomes) {

            LocalDate date = income.getDate();

            if (date == null) {
                continue;
            }

            if (date.isBefore(startDate)
                    || date.isAfter(endDate)) {
                continue;
            }

            BigDecimal amount = income.getAmount();

            if (amount == null) {
                amount = BigDecimal.ZERO;
            }

            totalIncome = totalIncome.add(amount);

            csv.append(csvValue(formatDate(date)))
                    .append(",")

                    .append(csvValue(
                            income.getDescription()
                    ))
                    .append(",")

                    .append(csvValue(
                            amount
                    ))
                    .append(",")

                    .append(csvValue(
                            income.getCategory() != null
                                    ? income.getCategory().getName()
                                    : ""
                    ))
                    .append(",")

                    .append(csvValue(
                            income.getIncomeType()
                    ))
                    .append("\n");
        }

        csv.append("\n");

        csv.append("Total Income,")
                .append(csvValue(totalIncome))
                .append("\n");

        csv.append("\n");

        // =====================================================
        // EXPENSES
        // =====================================================

        csv.append("EXPENSES\n");

        csv.append(
                "Date,Description,Amount,Category\n"
        );

        BigDecimal totalExpense = BigDecimal.ZERO;

        for (Expense expense : expenses) {

            LocalDate date = expense.getDate();

            if (date == null) {
                continue;
            }

            if (date.isBefore(startDate)
                    || date.isAfter(endDate)) {
                continue;
            }

            BigDecimal amount = expense.getAmount();

            if (amount == null) {
                amount = BigDecimal.ZERO;
            }

            totalExpense = totalExpense.add(amount);

            csv.append(csvValue(formatDate(date)))
                    .append(",")

                    .append(csvValue(
                            expense.getDescription()
                    ))
                    .append(",")

                    .append(csvValue(
                            amount
                    ))
                    .append(",")

                    .append(csvValue(
                            expense.getCategory() != null
                                    ? expense.getCategory().getName()
                                    : ""
                    ))
                    .append("\n");
        }

        csv.append("\n");

        csv.append("Total Expenses,")
                .append(csvValue(totalExpense))
                .append("\n");

        csv.append("\n");

        // =====================================================
        // BUDGETS
        // =====================================================

        csv.append("BUDGETS\n");

        csv.append(
                "Month,Category,Amount\n"
        );

        BigDecimal totalBudget = BigDecimal.ZERO;

        YearMonth startMonth =
                YearMonth.from(startDate);

        YearMonth endMonth =
                YearMonth.from(endDate);

        for (Budget budget : budgets) {

            String budgetMonth = budget.getMonth();

            if (budgetMonth == null
                    || budgetMonth.trim().isEmpty()) {
                continue;
            }

            try {

                YearMonth budgetYearMonth =
                        YearMonth.parse(budgetMonth);

                if (budgetYearMonth.isBefore(startMonth)
                        || budgetYearMonth.isAfter(endMonth)) {
                    continue;
                }

                BigDecimal amount = budget.getAmount();

                if (amount == null) {
                    amount = BigDecimal.ZERO;
                }

                totalBudget =
                        totalBudget.add(amount);

                csv.append(
                        csvValue(
                                budgetYearMonth.format(
                                        MONTH_FORMAT
                                )
                        )
                )
                .append(",")

                .append(
                        csvValue(
                                budget.getCategory() != null
                                        ? budget.getCategory().getName()
                                        : ""
                        )
                )
                .append(",")

                .append(
                        csvValue(amount)
                )
                .append("\n");

            } catch (Exception exception) {

                System.out.println(
                        "Invalid budget month: "
                                + budgetMonth
                );
            }
        }

        csv.append("\n");

        csv.append("Total Budget,")
                .append(csvValue(totalBudget))
                .append("\n");

        csv.append("\n");

        // =====================================================
        // CATEGORIES
        // =====================================================

        csv.append("CATEGORIES\n");

        csv.append(
                "Name,Type,Status,Default\n"
        );

        for (Category category : categories) {

            csv.append(
                    csvValue(
                            category.getName()
                    )
            )
            .append(",")

            .append(
                    csvValue(
                            category.getType()
                    )
            )
            .append(",")

            .append(
                    csvValue(
                            category.isActive()
                                    ? "Active"
                                    : "Inactive"
                    )
            )
            .append(",")

            .append(
                    csvValue(
                            category.isDefault()
                                    ? "Yes"
                                    : "No"
                    )
            )
            .append("\n");
        }

        csv.append("\n");

        // =====================================================
        // SUMMARY
        // =====================================================

        BigDecimal balance =
                totalIncome.subtract(totalExpense);

        csv.append("SUMMARY\n");

        csv.append(
                "Item,Amount\n"
        );

        csv.append(
                "Total Income,"
        )
        .append(
                csvValue(totalIncome)
        )
        .append("\n");

        csv.append(
                "Total Expenses,"
        )
        .append(
                csvValue(totalExpense)
        )
        .append("\n");

        csv.append(
                "Balance,"
        )
        .append(
                csvValue(balance)
        )
        .append("\n");

        csv.append(
                "Total Budget,"
        )
        .append(
                csvValue(totalBudget)
        )
        .append("\n");

        return csv.toString();
    }

    // =========================================================
    // DATE FORMAT
    // =========================================================

    private String formatDate(LocalDate date) {

        if (date == null) {
            return "";
        }

        return date.format(DATE_FORMAT);
    }

    // =========================================================
    // CAPITALIZE
    // =========================================================

    private String capitalize(String value) {

        if (value == null || value.isEmpty()) {
            return "";
        }

        return value.substring(0, 1).toUpperCase()
                + value.substring(1).toLowerCase();
    }

    // =========================================================
    // CSV VALUE
    // =========================================================

    private String csvValue(Object value) {

        if (value == null) {
            return "";
        }

        String text = String.valueOf(value);

        text = text.replace(
                "\"",
                "\"\""
        );

        return "\"" + text + "\"";
    }
}

