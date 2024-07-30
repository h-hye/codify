package com.example.codify.product.dto;

import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter

public class ProductImg {

    private Long id;

    private String imgName;

    private String oriImgName;

    private String imgUrl;

    private String repImgYn;

    private static ModelMapper modelMapper = new ModelMapper();

    public static ProductImg of(ProductImg productImg) {
        return modelMapper.map(productImg, ProductImg.class);
    }
}
