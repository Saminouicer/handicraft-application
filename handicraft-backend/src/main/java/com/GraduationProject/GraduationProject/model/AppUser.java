package com.GraduationProject.GraduationProject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userId;
    String firstName;
    String lastName;
    String userName;
    String email;
    Date dateOfBirth;
    int age;
    String password;
    String role;

    @OneToOne(mappedBy = "appUser")
    Admin admin;
    @OneToOne(mappedBy = "appUser")
    CraftsMan craftsMan;
    @OneToOne(mappedBy = "appUser")
    Client client;

    public AppUser(String firstName, String lastName, String userName, String email, Date dateOfBirth, int age,String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.password = password;
    }


}
