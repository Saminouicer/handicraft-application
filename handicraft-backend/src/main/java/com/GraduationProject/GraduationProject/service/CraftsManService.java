package com.GraduationProject.GraduationProject.service;

import com.GraduationProject.GraduationProject.model.CraftsMan;
import com.GraduationProject.GraduationProject.repository.CraftsManRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CraftsManService {
    @Autowired
    CraftsManRepository craftsManRepository;

    public List<CraftsMan> getCraftsmen() {
        return craftsManRepository.findAll();
    }
}
