package com.example.codify.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Optional<Product> findByProductId(String id);
    Optional<Product> findByProductName(String productName);
}