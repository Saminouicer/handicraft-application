package com.GraduationProject.GraduationProject.controller;

import com.GraduationProject.GraduationProject.dto.OrderInfo;
import com.GraduationProject.GraduationProject.model.MakeOrder;
import com.GraduationProject.GraduationProject.model.Product;
import com.GraduationProject.GraduationProject.model.Review;
import com.GraduationProject.GraduationProject.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/product/{userId}")
    public Product addProduct(@RequestBody Product product,@PathVariable Long userId) {
       return productService.addProduct(product, userId);
    }

    @DeleteMapping("/product/{productId}")
    public void deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
    }

    @PutMapping("product/{productId}")
    public void editeProduct(@PathVariable Long productId,@RequestBody Product newProduct) {
        productService.editeProduct(productId,newProduct);
    }

    @GetMapping("products/{userId}")
    public List<Product> displayCraftsmanProduct(@PathVariable Long userId)  {
        return productService.displayCraftsmanProduct(userId);
    }
    @GetMapping("/products")
    public List<Product> displayAllProducts() {
        return productService.displayAllProducts();
    }
    @GetMapping("product/{productId}")
    public Product getProduct(@PathVariable Long productId) {
        return productService.getProduct(productId);
    }
//    @PostMapping("ord/{userId}/{productId}")
//    public void makeOrder(@RequestBody MakeOrder ord, @PathVariable Long userId, @PathVariable Long productId)  {
//        productService.makeOrder(ord,userId,productId);
//    }
//@PostMapping("ord/{userId}/{productId}/{quantity}")
//public void makeOrder(@PathVariable Long userId, @PathVariable Long productId,@PathVariable String quantity)  {
//    productService.makeOrder(userId,productId,quantity);
//}

    @PostMapping("ord/{userId}")
    public void makeOrder(@PathVariable Long userId,@RequestBody OrderInfo orderInfo)  {
        productService.makeOrder(userId,orderInfo);
    }

//    @PostMapping("fav/{userId}/{productId}")
//    public void addFavorite(@PathVariable Long userId,@PathVariable Long productId){
//        productService.addFavorite(userId,productId);
//    }

@GetMapping("ord/{userId}")
    public List<MakeOrder> getClientOrders(@PathVariable Long userId) {
       return productService.getClientOrders(userId);
}

//@GetMapping("fav/{userId}")
//    public List<FavoriteProduct> getClientFavorite(@PathVariable  Long userId){
//        return productService.getClientFavorite(userId);
//    }


@DeleteMapping("ord/{orderId}")
public void deleteOrder(@PathVariable  Long orderId) {
        productService.deleteOrder(orderId);
}

//@DeleteMapping("fav/{favoriteId}")
//    public void deleteFavorite(@PathVariable Long favoriteId){
//        productService.deleteFavorite(favoriteId);
//}


@PostMapping("ord/stat/{orderId}")
    public void acceptOrder(@PathVariable Long orderId) {
        productService.acceptOrder(orderId);
}


@PostMapping("image/{productId}")
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file,@PathVariable Long productId) throws IOException {
        String uploadImage= productService.uploadImage(file,productId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
}

@GetMapping("/image/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName) {
        byte[] imageData= productService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
}
    @PostMapping("review/{userId}/{productId}")
    public void addReview(@RequestBody Review reviewReq, @PathVariable Long userId, @PathVariable Long productId) {
        productService.addReview(reviewReq,userId,productId);
    }

    @DeleteMapping("review/{reviewId}")
    public void deleteReview(@PathVariable Long reviewId) {
        productService.deleteReview(reviewId);
    }

    @GetMapping("review/{productId}")
    public List<Review> getReviews(@PathVariable Long productId) {
        return productService.getReviews(productId);
    }

//    @GetMapping("order/product/{orderId}")
//    public Product getProductByOrder(@PathVariable Long orderId)  {
//        return productService.getProductByOrder(orderId);
//    }

}
