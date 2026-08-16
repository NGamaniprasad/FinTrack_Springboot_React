//package com.fintrack.repository;
//
//import com.fintrack.entity.Category;
//import com.fintrack.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface CategoryRepository extends JpaRepository<Category, Long> {
//
//    List<Category> findByUser(User user);
//
//    Optional<Category> findByIdAndUser(Long id, User user);
//}


package com.fintrack.repository;

import com.fintrack.entity.Category;
import com.fintrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUser(User user);

    List<Category> findByUserOrUserIsNull(User user);

    Optional<Category> findByIdAndUser(Long id, User user);
}