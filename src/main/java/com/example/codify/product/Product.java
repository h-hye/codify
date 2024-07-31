package com.example.codify.product;

import com.example.codify.Exception.OutOfStockException;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "Product")					// 1.
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private String id;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private Integer productPrice;

    @Column(name = "product_stock")
    private Integer productStock;

    public void removeStock(int stockNumber) {
        int restStock = 1;

        // 구매 이력 조회
        restStock = stockNumber - restStock;

        if(restStock < 0)
            throw new OutOfStockException("이미 구매한 상품입니다.");

    }

}
