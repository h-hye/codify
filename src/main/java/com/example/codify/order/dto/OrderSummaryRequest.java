package com.example.codify.order.dto;

public record OrderSummaryRequest(String orderId, String orderName, String orderDate, Integer totalPrice) {
}
