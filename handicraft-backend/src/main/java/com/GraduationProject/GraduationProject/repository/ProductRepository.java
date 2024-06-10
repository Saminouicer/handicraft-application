package com.GraduationProject.GraduationProject.repository;

import com.GraduationProject.GraduationProject.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
//     public Product findProductByMakeOrderOrderId(Long orderId) ;
}
