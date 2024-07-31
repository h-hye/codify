package com.example.codify.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findById(String id);
    Optional<Product> findByProductName(String productName);
    Optional<Product> findByProductPrice(Integer productPrice);
    Optional<Product> findByProductStock(Integer productStock);

}