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
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long adminId;
    @OneToOne
    @JsonIgnore
    AppUser appUser;

    public Admin(AppUser appUser) {
        this.appUser=appUser;
    }

}
