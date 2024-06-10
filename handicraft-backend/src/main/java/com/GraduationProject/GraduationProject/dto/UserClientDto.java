package com.GraduationProject.GraduationProject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserClientDto {
    String firstName;
    String lastName;
    String userName;
    String email;
    Date dateOfBirth;
    int age;
    String password;
}
