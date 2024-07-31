package com.example.codify.order;

import com.example.codify.member.Member;
import com.example.codify.member.MemberRepository;
import com.example.codify.order.dto.Order;
import com.example.codify.product.Product;
import com.example.codify.product.ProductRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;

    public Order createOrder(Orders orders) {

        Member member = memberRepository.findByName(orders.getMember())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Product product = productRepository.findById(orders.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        orders.getMember(member);
        orders.setProduct(product);
        orders.setPrice(product.getPrice());  // 상품의 현재 가격을 설정
        orders.setOrdersDate(LocalDateTime.now());

        return orderRepository.save(orders);

    }
}