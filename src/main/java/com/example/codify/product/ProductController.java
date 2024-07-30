package com.example.codify.product;

import com.example.codify.product.dto.ProductTransfer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping(value = "/admin/product/new")
    public String ProductTransfer(Model model){
        model.addAttribute("productTransfer", new ProductTransfer());
        return "product/productTransfer";
    }

    // 상품 등록
    @PostMapping(value = "/admin/item/new")
    public String productNew(@Valid ProductTransfer productTransfer,
                             BindingResult bindingResult, Model model,
                             @RequestParam("productImgFile")

    List<MultipartFile> productImgFileList) {

        if (bindingResult.hasErrors()) {
            return "product/productTransfer";
        }

        if (productImgFileList.get(0).isEmpty() && productTransfer.getId() == null) {
            model.addAttribute("errorMessage", "첫번째 상품 이미지는 필수 입력 값입니다.");
            return "product/productForm";
        }

        try {
            productService.saveProduct(productTransfer, productImgFileList);
        } catch (Exception e) {
            model.addAttribute("errorMessage", "상품 등록 중 에러가 발생하였습니다.");
            return "product/productForm";
        }

        return "redirect:/";
    }
}
