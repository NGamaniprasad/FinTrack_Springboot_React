//package com.fintrack.service;
//
//import com.fintrack.dto.CategoryRequest;
//import com.fintrack.dto.CategoryResponse;
//import com.fintrack.entity.Category;
//import com.fintrack.entity.User;
//import com.fintrack.repository.CategoryRepository;
//import com.fintrack.repository.UserRepository;
//
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class CategoryService {
//
//    private final CategoryRepository categoryRepository;
//    private final UserRepository userRepository;
//
//    public CategoryService(
//            CategoryRepository categoryRepository,
//            UserRepository userRepository) {
//
//        this.categoryRepository = categoryRepository;
//        this.userRepository = userRepository;
//    }
//
//    public CategoryResponse addCategory(
//            CategoryRequest request,
//            String email) {
//
//        User user = userRepository
//                .findByEmail(email)
//                .orElseThrow(() ->
//                        new RuntimeException("User not found"));
//
//        Category category = new Category(
//                request.getName(),
//                request.getType().toUpperCase(),
//                user
//        );
//
//        Category savedCategory =
//                categoryRepository.save(category);
//
//        return new CategoryResponse(
//                savedCategory.getId(),
//                savedCategory.getName(),
//                savedCategory.getType()
//        );
//    }
//
//    public List<CategoryResponse> getCategories(String email) {
//
//        User user = userRepository
//                .findByEmail(email)
//                .orElseThrow(() ->
//                        new RuntimeException("User not found"));
//
//        return categoryRepository
//                .findByUser(user)
//                .stream()
//                .map(category -> new CategoryResponse(
//                        category.getId(),
//                        category.getName(),
//                        category.getType()
//                ))
//                .toList();
//    }
//
//    public CategoryResponse updateCategory(
//            Long id,
//            CategoryRequest request,
//            String email) {
//
//        User user = userRepository
//                .findByEmail(email)
//                .orElseThrow(() ->
//                        new RuntimeException("User not found"));
//
//        Category category = categoryRepository
//                .findByIdAndUser(id, user)
//                .orElseThrow(() ->
//                        new RuntimeException("Category not found"));
//
//        category.setName(request.getName());
//        category.setType(request.getType().toUpperCase());
//
//        Category updatedCategory =
//                categoryRepository.save(category);
//
//        return new CategoryResponse(
//                updatedCategory.getId(),
//                updatedCategory.getName(),
//                updatedCategory.getType()
//        );
//    }
//
//    public void deleteCategory(
//            Long id,
//            String email) {
//
//        User user = userRepository
//                .findByEmail(email)
//                .orElseThrow(() ->
//                        new RuntimeException("User not found"));
//
//        Category category = categoryRepository
//                .findByIdAndUser(id, user)
//                .orElseThrow(() ->
//                        new RuntimeException("Category not found"));
//
//        categoryRepository.delete(category);
//    }
//}


package com.fintrack.service;

import com.fintrack.dto.CategoryRequest;
import com.fintrack.dto.CategoryResponse;
import com.fintrack.entity.Category;
import com.fintrack.entity.User;
import com.fintrack.repository.CategoryRepository;
import com.fintrack.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(
            CategoryRepository categoryRepository,
            UserRepository userRepository) {

        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    // =====================================================
    // ADD CATEGORY
    // =====================================================

    public CategoryResponse addCategory(
            CategoryRequest request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Category category = new Category(
                request.getName(),
                request.getType().toUpperCase(),
                user
        );

        Category savedCategory =
                categoryRepository.save(category);

        return new CategoryResponse(
                savedCategory.getId(),
                savedCategory.getName(),
                savedCategory.getType()
        );
    }

    // =====================================================
    // GET CATEGORIES
    // =====================================================

    public List<CategoryResponse> getCategories(
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        /*
         * Return:
         *
         * 1. Categories belonging to current user
         * 2. Default categories where user_id is NULL
         */
        return categoryRepository
                .findByUserOrUserIsNull(user)
                .stream()
                .map(category ->
                        new CategoryResponse(
                                category.getId(),
                                category.getName(),
                                category.getType()
                        )
                )
                .toList();
    }

    // =====================================================
    // UPDATE CATEGORY
    // =====================================================

    public CategoryResponse updateCategory(
            Long id,
            CategoryRequest request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Category category =
                categoryRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Category not found"));

        category.setName(
                request.getName()
        );

        category.setType(
                request.getType().toUpperCase()
        );

        Category updatedCategory =
                categoryRepository.save(category);

        return new CategoryResponse(
                updatedCategory.getId(),
                updatedCategory.getName(),
                updatedCategory.getType()
        );
    }

    // =====================================================
    // DELETE CATEGORY
    // =====================================================

    public void deleteCategory(
            Long id,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Category category =
                categoryRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Category not found"));

        categoryRepository.delete(category);
    }
}