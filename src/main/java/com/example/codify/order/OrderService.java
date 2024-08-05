package com.example.codify.order;

import com.example.codify.member.Member;
import com.example.codify.member.MemberRepository;
import com.example.codify.order.dto.OrderCreationRequest;
import com.example.codify.product.Product;
import com.example.codify.product.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;

    public Order createOrder(OrderCreationRequest orderCreationRequest){

        // 고객 정보
        Member member = memberRepository.findByName(orderCreationRequest.orderName())
                .orElseThrow(EntityNotFoundException::new);

        // 상품 정보
        Product product = productRepository.findByProductName(orderCreationRequest.productName())
                .orElseThrow(EntityNotFoundException::new);

        // 주문 생성
        Order order = new Order();
        order.setMember(member);
        order.setProduct(product);
        order.setCount(orderCreationRequest.productCount());
        order.setPaymentMethod(orderCreationRequest.paymentMethod());
        order.setOrderDate(LocalDateTime.now());

        // 가격
        order.setPrice(orderCreationRequest.productCount() * product.getProductPrice());

        return orderRepository.save(order);
    }
}