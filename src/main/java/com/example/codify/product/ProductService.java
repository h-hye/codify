package com.example.codify.product;

import com.example.codify.product.dto.ProductTransfer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImgService productImgService;
    private final ProductImgRepository productImgRepository;

    public Long saveProduct(ProductTransfer productTransfer, List<MultipartFile> productImgFileList) throws Exception {

        //상품 등록
        Product product = productTransfer.createProduct();
        productRepository.save(product);

        //이미지 등록
        for (int i = 0; i < productImgFileList.size(); i++) {
            ProductImg productImg = new ProductImg();
            productImg.setProduct(product);

            if (i == 0)
                productImg.setRepimgYn("Y");
            else
                productImg.setRepimgYn("N");

            productImgService.saveProductImg(productImg, productImgFileList.get(i));
        }

        return product.getId();
    }
}
