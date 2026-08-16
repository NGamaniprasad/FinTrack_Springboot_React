package com.fintrack.controller;

import com.fintrack.dto.CategoryRequest;
import com.fintrack.dto.CategoryResponse;
import com.fintrack.service.CategoryService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Add category
    @PostMapping
    public ResponseEntity<CategoryResponse> addCategory(
            @RequestBody CategoryRequest request,
            Authentication authentication) {

        CategoryResponse response =
                categoryService.addCategory(
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    // Get logged-in user's categories
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getCategories(
            Authentication authentication) {

        List<CategoryResponse> categories =
                categoryService.getCategories(
                        authentication.getName()
                );

        return ResponseEntity.ok(categories);
    }

    // Update category
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryRequest request,
            Authentication authentication) {

        CategoryResponse response =
                categoryService.updateCategory(
                        id,
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    // Delete category
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(
            @PathVariable Long id,
            Authentication authentication) {

        categoryService.deleteCategory(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                "Category deleted successfully"
        );
    }
}