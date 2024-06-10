package com.GraduationProject.GraduationProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productId;
    String name;
    String description;
    double price;
//    @Enumerated(EnumType.STRING)
//    Category category;
    String category;


    @ManyToOne
    @JsonIgnore
    CraftsMan craftsMan;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<MakeOrder> orders=new ArrayList<>();

    @OneToOne(mappedBy = "productImg")
    ImageData imageData;

    @OneToMany(mappedBy = "productR", cascade = CascadeType.ALL)
    List<Review> reviews=new ArrayList<>();

//    @OneToOne
//    @JsonIgnore
//    FavoriteProduct fav;

    public Product(String name,String description,double price, String category, CraftsMan craftsMan) {
        this.name=name;
        this.description=description;
        this.price=price;
        this.category=category;
        this.craftsMan=craftsMan;
    }
}
