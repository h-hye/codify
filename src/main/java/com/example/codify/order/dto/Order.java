package com.example.codify.order.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class Order {

    @NotNull(message = "상품 아이디는 필수 입력 값입니다.")
    private Long productId;

    @Min(value = 1, message = "최소 주문 수량은 1개 입니다.")
    private int count;
}
