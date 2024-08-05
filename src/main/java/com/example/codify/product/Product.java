package com.example.codify.product;

import jakarta.persistence.*;
import lombok.Data;

import javax.persistence.Table;

@Entity
@Data
@Table(name = "Product")					// 1.
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private String productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private Integer productPrice;

    @Column(name = "product_stock")
    private Integer productStock;

}
