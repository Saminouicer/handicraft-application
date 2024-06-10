package com.GraduationProject.GraduationProject.service;

import com.GraduationProject.GraduationProject.model.AppUser;
import com.GraduationProject.GraduationProject.model.Client;
import com.GraduationProject.GraduationProject.model.CraftsMan;
import com.GraduationProject.GraduationProject.repository.AppUserRepository;
import com.GraduationProject.GraduationProject.repository.ClientRepository;
import com.GraduationProject.GraduationProject.repository.CraftsManRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    CraftsManRepository craftsManRepository;


    public List<Client> getClients() {
        return clientRepository.findAll();
    }
}
