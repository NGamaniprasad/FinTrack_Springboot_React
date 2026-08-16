package com.fintrack.dto;

import java.math.BigDecimal;
import java.util.List;

public class AnalysisResponse {

    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal balance;

    private List<CategoryAnalysis> categoryAnalysis;

    public AnalysisResponse() {
    }

    public AnalysisResponse(
            BigDecimal totalIncome,
            BigDecimal totalExpense,
            BigDecimal balance,
            List<CategoryAnalysis> categoryAnalysis) {

        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
        this.categoryAnalysis = categoryAnalysis;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public List<CategoryAnalysis> getCategoryAnalysis() {
        return categoryAnalysis;
    }

    public void setCategoryAnalysis(
            List<CategoryAnalysis> categoryAnalysis) {

        this.categoryAnalysis = categoryAnalysis;
    }

    public static class CategoryAnalysis {

        private String categoryName;
        private BigDecimal amount;

        public CategoryAnalysis() {
        }

        public CategoryAnalysis(
                String categoryName,
                BigDecimal amount) {

            this.categoryName = categoryName;
            this.amount = amount;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }
    }
}