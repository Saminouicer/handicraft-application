package com.GraduationProject.GraduationProject.service;

import com.GraduationProject.GraduationProject.dto.UserAdminDto;
import com.GraduationProject.GraduationProject.dto.UserClientDto;
import com.GraduationProject.GraduationProject.dto.UserCraftsManDto;
import com.GraduationProject.GraduationProject.model.Admin;
import com.GraduationProject.GraduationProject.model.AppUser;
import com.GraduationProject.GraduationProject.model.Client;
import com.GraduationProject.GraduationProject.model.CraftsMan;
import com.GraduationProject.GraduationProject.repository.AdminRepository;
import com.GraduationProject.GraduationProject.repository.AppUserRepository;
import com.GraduationProject.GraduationProject.repository.ClientRepository;
import com.GraduationProject.GraduationProject.repository.CraftsManRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    CraftsManRepository craftsManRepository;

//    public void createAccount(AppUser appUser) {
//        appUserRepository.save(appUser);
//        switch (appUser.getRole()) {
//            case("client"):
//                Client newClient=new Client(appUser);
//                clientRepository.save(newClient);
//                break;
//            case("admin"):
//                Admin newAdmin=new Admin(appUser);
//                adminRepository.save(newAdmin);
//                break;
//            case("craftsMan"):
//                CraftsMan newCraftsMan=new CraftsMan(appUser);
//                craftsManRepository.save(newCraftsMan);
//                break;
//            default:
//                throw new IllegalArgumentException("Invalid user type");
//        }
//    }

    public void createAdminAccount( UserAdminDto newUser) {
        AppUser appUser=new AppUser(
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getUserName(),
                newUser.getEmail(),
                newUser.getDateOfBirth(),
                newUser.getAge(),
                newUser.getPassword());
        appUser.setRole("admin");
        appUserRepository.save(appUser);
        Admin admin=new Admin(appUser);
        adminRepository.save(admin);
    }

    public void createCraftsManAccount( UserCraftsManDto newUser) {
        AppUser appUser=new AppUser(
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getUserName(),
                newUser.getEmail(),
                newUser.getDateOfBirth(),
                newUser.getAge(),
                newUser.getPassword());
        appUser.setRole("craftsMan");
        appUserRepository.save(appUser);
        CraftsMan craftsMan=new CraftsMan(appUser);
        craftsMan.setLocation(newUser.getLocation());
        craftsManRepository.save(craftsMan);
    }

    public void createClientAccount( UserClientDto newUser) {
        AppUser appUser=new AppUser(
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getUserName(),
                newUser.getEmail(),
                newUser.getDateOfBirth(),
                newUser.getAge(),
                newUser.getPassword());
        appUser.setRole("client");
        appUserRepository.save(appUser);
        Client client=new Client(appUser);
        clientRepository.save(client);
    }




    public void deleteUser(Long id) {
        AppUser appUser=appUserRepository.findById(id).orElseThrow();

        switch (appUser.getRole()) {
            case("client"):
                Client client=appUser.getClient();
                clientRepository.deleteById(client.getClientId());
                break;
            case("admin"):
                Admin admin=appUser.getAdmin();
                adminRepository.deleteById(admin.getAdminId());
                break;
            case("craftsMan"):
                CraftsMan craftsMan=appUser.getCraftsMan();
                craftsManRepository.deleteById(craftsMan.getCraftsManId());
                break;
            default:
                throw new IllegalArgumentException("Invalid user type");
        }

        appUserRepository.deleteById(id);
    }

    public void modifyAccount(AppUser newAppUser, Long id) {
        appUserRepository.findById(id).map(user-> {
            user.setFirstName(newAppUser.getFirstName());
            user.setLastName(newAppUser.getLastName());
            user.setUserName(newAppUser.getUserName());
            return appUserRepository.save(user);
        }).orElseThrow();
    }

    public AppUser getUser(Long id) {
            return appUserRepository.findById(id).orElseThrow();
    }

    public List<AppUser> getUsers() {
        return appUserRepository.findAll();
    }


}
