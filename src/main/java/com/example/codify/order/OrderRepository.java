package com.example.codify.order;

import com.example.codify.member.Member;
import com.example.codify.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Orders, String> {

    Optional<Orders> findById(Long id);
    Optional<Orders> findByMember(Member member);
    Optional<Orders> findByProduct(Product product);
    Optional<Orders> findByCount(Integer count);
    Optional<Orders> findByPrice(Integer price);
    Optional<Orders> findByOrdersDate(LocalDateTime ordersDate);

}
