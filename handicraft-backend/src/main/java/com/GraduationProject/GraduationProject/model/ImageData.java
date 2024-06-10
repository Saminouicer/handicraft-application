package com.GraduationProject.GraduationProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ImageData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long imageId;
    String name;
    String type;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    byte[] imageData;

    @OneToOne
    @JsonIgnore
    Product productImg;

    public ImageData(Product product) {
        this.productImg=product;
    }
}
