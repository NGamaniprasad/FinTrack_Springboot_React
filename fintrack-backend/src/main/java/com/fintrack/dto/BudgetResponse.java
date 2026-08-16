//package com.fintrack.dto;
//
//import java.math.BigDecimal;
//
//public class BudgetResponse {
//
//    private Long id;
//
//    private String month;
//
//    private BigDecimal amount;
//
//    private Long categoryId;
//
//    private String categoryName;
//
//    public BudgetResponse() {
//    }
//
//    public BudgetResponse(
//            Long id,
//            String month,
//            BigDecimal amount,
//            Long categoryId,
//            String categoryName
//    ) {
//        this.id = id;
//        this.month = month;
//        this.amount = amount;
//        this.categoryId = categoryId;
//        this.categoryName = categoryName;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getMonth() {
//        return month;
//    }
//
//    public void setMonth(String month) {
//        this.month = month;
//    }
//
//    public BigDecimal getAmount() {
//        return amount;
//    }
//
//    public void setAmount(BigDecimal amount) {
//        this.amount = amount;
//    }
//
//    public Long getCategoryId() {
//        return categoryId;
//    }
//
//    public void setCategoryId(Long categoryId) {
//        this.categoryId = categoryId;
//    }
//
//    public String getCategoryName() {
//        return categoryName;
//    }
//
//    public void setCategoryName(String categoryName) {
//        this.categoryName = categoryName;
//    }
//}


package com.fintrack.dto;

import java.math.BigDecimal;

public class BudgetResponse {

    private Long id;
    private String month;
    private BigDecimal amount;
    private Long categoryId;
    private String categoryName;

    public BudgetResponse() {
    }

    public BudgetResponse(
            Long id,
            String month,
            BigDecimal amount,
            Long categoryId,
            String categoryName) {

        this.id = id;
        this.month = month;
        this.amount = amount;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}