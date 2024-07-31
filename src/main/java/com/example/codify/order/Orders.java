package com.example.codify.order ;

import com.example.codify.member.Member;
import com.example.codify.member.MemberRepository;
import com.example.codify.product.Product;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Order")						// 1.
public class Orders {

    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private Long id;

    @ManyToOne                                // 2.
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer count; // 수량

    private Integer price; // 결제 가격

    public Integer getTotalPrice() {
        return price * count;
    }

    private LocalDateTime ordersDate;        // 주문일

    public String getMember(){
        return MemberRepository.findByName(member);
    }

    public String getProductName(){
        return ProductRepository.findByProductName(product);
    }
}