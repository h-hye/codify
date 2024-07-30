package com.example.codify.product.dto;

import com.example.codify.product.Product;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

public class ProductTransfer {

    private Long id;

    @NotBlank(message = "상품명은 필수 입력 값입니다.")
    private String productName;

    @NotNull(message = "가격은 필수 입력 값입니다.")
    private Integer productPrice;

    @NotNull(message = "재고는 필수 입력 값입니다.")
    private Integer stockNumber;

    private List<ProductImg> productImgList = new ArrayList<>(); // 1.

    private List<Long> productImgIDs = new ArrayList<>();  		 // 2.

    private static ModelMapper modelMapper = new ModelMapper();

    public Product createProduct() {
        return modelMapper.map(this, Product.class);				 // 3.
    }
    public static ProductTransfer of(Product item) {
        return modelMapper.map(item, ProductTransfer.class);         // 4.
    }
}
