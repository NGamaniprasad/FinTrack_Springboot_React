package com.fintrack.dto;

public class AdminDashboardResponse {

    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private long totalCategories;
    private long totalBudgets;
    private long totalIncomes;
    private long totalExpenses;

    public AdminDashboardResponse(
            long totalUsers,
            long activeUsers,
            long inactiveUsers,
            long totalCategories,
            long totalBudgets,
            long totalIncomes,
            long totalExpenses
    ) {
        this.totalUsers = totalUsers;
        this.activeUsers = activeUsers;
        this.inactiveUsers = inactiveUsers;
        this.totalCategories = totalCategories;
        this.totalBudgets = totalBudgets;
        this.totalIncomes = totalIncomes;
        this.totalExpenses = totalExpenses;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getActiveUsers() {
        return activeUsers;
    }

    public long getInactiveUsers() {
        return inactiveUsers;
    }

    public long getTotalCategories() {
        return totalCategories;
    }

    public long getTotalBudgets() {
        return totalBudgets;
    }

    public long getTotalIncomes() {
        return totalIncomes;
    }

    public long getTotalExpenses() {
        return totalExpenses;
    }
}