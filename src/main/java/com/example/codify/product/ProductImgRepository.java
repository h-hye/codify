package com.example.codify.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductImgRepository extends JpaRepository<ProductImg, Long> {

    Optional<ProductImg> findById(String id);
    Optional<ProductImg> findByImgName(String imgName);
    Optional<ProductImg> findByOriImgName(String oriImgName);
    Optional<ProductImg> findByImgUrl(String imgUrl);


}