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
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long clientId;
    @OneToOne
    @JsonIgnore
    AppUser appUser;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    List<MakeOrder> orders=new ArrayList<>();

    @OneToMany(mappedBy = "clientR", cascade = CascadeType.ALL)
    List<Review> reviews=new ArrayList<>();

//    @OneToMany(mappedBy = "clientF", cascade = CascadeType.ALL)
//    List<FavoriteProduct> favorites=new ArrayList<>();

    public Client(AppUser appUser) {
        this.appUser=appUser;
    }


}
