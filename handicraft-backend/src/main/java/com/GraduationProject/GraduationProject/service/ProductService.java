package com.GraduationProject.GraduationProject.service;

import com.GraduationProject.GraduationProject.Util.ImageUtils;
import com.GraduationProject.GraduationProject.dto.OrderInfo;
import com.GraduationProject.GraduationProject.model.*;
import com.GraduationProject.GraduationProject.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ReviewRepository reviewRepository;
//    @Autowired
//    FavoriteRepository favoriteRepository;



    public Product addProduct(Product product,Long userId) {
        AppUser appUser=appUserRepository.findById(userId).orElseThrow();
        Product newProduct =new Product(product.getName(),product.getDescription(),product.getPrice(),product.getCategory(),appUser.getCraftsMan());
        return productRepository.save(newProduct);
    }

    public void deleteProduct(Long productId) {
        Product product=productRepository.findById(productId).orElseThrow();
        if(product.getImageData()!=null) {
            imageRepository.deleteById(product.getImageData().getImageId());
        }
        productRepository.deleteById(productId);
    }

    public void editeProduct(Long productId,Product newProduct) {
            productRepository.findById(productId).map(product-> {
                product.setCategory(newProduct.getCategory());
                product.setName(newProduct.getName());
                product.setDescription(newProduct.getDescription());
                product.setPrice(newProduct.getPrice());
                return productRepository.save(product);
            }).orElseThrow();
    }

    public List<Product> displayCraftsmanProduct(Long userId) {
        return appUserRepository.findById(userId).get().getCraftsMan().getProducts();
    }

    public List<Product> displayAllProducts() {
        return productRepository.findAll();
    }
    public Product getProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow();
    }

//    public void makeOrder(MakeOrder ord, Long userId, Long productId) {
//        Client client=appUserRepository.findById(userId).get().getClient();
//        Product product=productRepository.findById(productId).orElseThrow();
//        MakeOrder neword=new MakeOrder(ord.getQuantity(),client,product);
//         orderRepository.save(neword);
//    }
public void makeOrder( Long userId, OrderInfo orderInfo) {
    Client client=appUserRepository.findById(userId).get().getClient();
    Product product=productRepository.findById(orderInfo.getProductId()).orElseThrow();
    MakeOrder neword=new MakeOrder(orderInfo.getQuantity(),client,product);
    neword.setStatus("Pending");
    orderRepository.save(neword);
}

//public void addFavorite(Long userId,Long productId){
//    Client client=appUserRepository.findById(userId).get().getClient();
//    Product product=productRepository.findById(productId).orElseThrow();
//    FavoriteProduct favorite=new FavoriteProduct(client);
//    product.setFav(favorite);
//    favoriteRepository.save(favorite);
//    productRepository.save(product);
//}


    public List<MakeOrder> getClientOrders(Long userId) {
        return appUserRepository.findById(userId).get().getClient().getOrders();
    }

//    public List<FavoriteProduct> getClientFavorite(Long userId){
//        return appUserRepository.findById(userId).get().getClient().getFavorites();
//    }
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

//    public void deleteFavorite(Long favoriteId) {favoriteRepository.deleteById(favoriteId);}

    public void acceptOrder(Long orderId) {
        MakeOrder ord=orderRepository.findById(orderId).
                orElseThrow(() -> new EntityNotFoundException("Order with ID " + orderId + " not found"));
        ord.setStatus("Accepted");
        orderRepository.save(ord);
    }

    public String uploadImage(MultipartFile file,Long productId) throws IOException {
        Product product= productRepository.findById(productId).orElseThrow();
//        ImageData imageData=new ImageData(product);
//        imageData.setName(file.getOriginalFilename());
//        imageData.setType(file.getContentType());
//        imageData.setImageData(ImageUtils.compressImage(file.getBytes()));
        ImageData imageData=imageRepository.save(ImageData.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .productImg(product)
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        if(imageData!=null){
            return "file uploaded successfull";
        }
        return null;
    }

    public byte[] downloadImage(String filname) {
        ImageData imageData=imageRepository.findByName(filname).orElseThrow();
        byte[] images=ImageUtils.decompressImage(imageData.getImageData());
        return images;
    }

    public void addReview(Review reviewReq,Long userId,Long productId) {
        Client client=appUserRepository.findById(userId).get().getClient();
        Product product=productRepository.findById(productId).orElseThrow();
        Review review=new Review(client,product,reviewReq.getComment());
        reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    public List<Review> getReviews(Long productId) {
        return productRepository.findById(productId).get().getReviews();
    }

//    public Product getProductByOrder(Long orderId) {
//        return productRepository.findProductByMakeOrderOrderId(orderId);
//    }


}
