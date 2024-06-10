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
public class MakeOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long orderId;
    String quantity;
    String status;

    @ManyToOne
    @JsonIgnore
    Client client;

    @ManyToOne
    @JsonIgnore
    Product product;

    public MakeOrder(String quantity, Client client, Product product) {
        this.quantity=quantity;
        this.client=client;
        this.product=product;
    }
}
