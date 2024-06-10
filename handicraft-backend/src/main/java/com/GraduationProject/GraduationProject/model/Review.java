package com.GraduationProject.GraduationProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long reviewId;

    String comment;

    @ManyToOne
    @JsonIgnore
    Product productR;

    @ManyToOne
    @JsonIgnore
    Client clientR;

    public Review(Client client, Product product, String comment) {
        this.clientR=client;
        this.productR=product;
        this.comment=comment;
    }
}
