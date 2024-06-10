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
public class CraftsMan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long craftsManId;
    String location;



    @OneToOne
    @JsonIgnore
    AppUser appUser;

    @OneToMany(mappedBy = "craftsMan", cascade = CascadeType.ALL)
    List<Product> products=new ArrayList<>();


    public CraftsMan(AppUser appUser) {
        this.appUser=appUser;
    }

}
