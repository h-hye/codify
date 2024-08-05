package com.example.codify.order.dto;

public record OrderCreationRequest(
        String orderName,
        String productName,
        Integer productCount,
        String paymentMethod) {
}
