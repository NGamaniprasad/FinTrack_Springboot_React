//package com.fintrack.dto;
//
//import java.math.BigDecimal;
//
//public class BudgetRequest {
//
//    private String month;
//
//    private BigDecimal amount;
//
//    private Long categoryId;
//
//    public BudgetRequest() {
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
//}

package com.fintrack.dto;

import java.math.BigDecimal;

public class BudgetRequest {

    private String month;
    private BigDecimal amount;
    private Long categoryId;

    public BudgetRequest() {
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
}