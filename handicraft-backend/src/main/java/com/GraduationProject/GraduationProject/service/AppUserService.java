package com.GraduationProject.GraduationProject.service;

import com.GraduationProject.GraduationProject.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    @Autowired
    AppUserRepository appUserRepository;
}
