package com.GraduationProject.GraduationProject.controller;

import com.GraduationProject.GraduationProject.dto.*;
import com.GraduationProject.GraduationProject.model.AppUser;
import com.GraduationProject.GraduationProject.model.Client;
import com.GraduationProject.GraduationProject.model.CraftsMan;
import com.GraduationProject.GraduationProject.model.RefrechToken;
import com.GraduationProject.GraduationProject.repository.AppUserRepository;
import com.GraduationProject.GraduationProject.repository.RefrechTokenRepository;
import com.GraduationProject.GraduationProject.security.AppUserDetailsService;
import com.GraduationProject.GraduationProject.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000/")
public class AdminController {
    @Autowired
    AdminService adminservice;
    @Autowired
    CraftsManService craftsManService;
    @Autowired
    ClientService clientService;
    @Autowired
    JwtService jwtService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    RefrechTokenService refrechTokenService;
    @Autowired
    AppUserDetailsService appUserDetailsService;
    @Autowired
    RefrechTokenRepository refrechTokenRepository;

    @PostMapping("/user/admin")
    public void createAdminAccount(@RequestBody UserAdminDto appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        adminservice.createAdminAccount(appUser);
    }
    @PostMapping("/user/craftsman")
    public void createCraftsManAccount(@RequestBody UserCraftsManDto appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        adminservice.createCraftsManAccount(appUser);
    }

    @PostMapping("/user/client")
    public void createClientAccount(@RequestBody UserClientDto appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        adminservice.createClientAccount(appUser);
    }


    @DeleteMapping("/user/{id}")
    public void deleteAccount(@PathVariable Long id) {
        adminservice.deleteUser(id);
    }

    @PutMapping("/user/{id}")
    public void modifyAccount(@RequestBody AppUser newUser,@PathVariable Long id) {
        adminservice.modifyAccount(newUser,id);
    }

    @GetMapping("/user/{id}")
    public AppUser getUser(@PathVariable Long id) {
        return adminservice.getUser(id);
    }

    @GetMapping("/users")
    public List<AppUser> getUsers() {
        return adminservice.getUsers();
    }

    @GetMapping("/craftsmen")
    public List<CraftsMan> getCraftsmen() {
        return craftsManService.getCraftsmen();
    }

    @GetMapping("/clients")
    public List<Client> getClients() {
        return clientService.getClients();
    }

    @PostMapping("/authenticate")
    public JwtResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            Optional<AppUser> ourUser=appUserRepository.findByUserName(authRequest.getUsername());
            RefrechToken refrechToken=refrechTokenService.createRefrechToken(authRequest.getUsername());

            return JwtResponse.builder().accessToken(  jwtService.generateToken(authRequest.getUsername(), ourUser.get().getRole(),ourUser.get().getUserId()))
                    .refreshToken(refrechToken.getToken())
                    .build();
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @PostMapping("/refreshToken")
    public JwtResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return refrechTokenService.findByToken(refreshTokenRequest.getToken())
                .map(refrechTokenService::verifyExpiration)
                .map(RefrechToken::getAppUser)
                .map(userInfo -> {
                    String accessToken = jwtService.generateToken(userInfo.getUserName(),userInfo.getRole(),userInfo.getUserId());
                    return JwtResponse.builder()
                            .accessToken(accessToken)
                            .refreshToken(refreshTokenRequest.getToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException(
                        "Refresh token is not in database!"));
    }

    // Service to manage invalidated tokens
//    private TokenBlacklistService tokenBlacklistService;

//    @DeleteMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletRequest request) {
//        String authToken = jwtService.extractToken(request);
//        if (authToken != null) {
//            String username = jwtService.extractUsername(authToken);
//            // Invalidate refresh token from database
//            refrechTokenService.invalidateRefreshToken(username);
//
//            // Optionally: Add access token to blacklist
////            tokenBlacklistService.addTokenToBlacklist(authToken);
//        }
//        return ResponseEntity.ok().body("Logout successful");
//    }
    @Transactional
    @DeleteMapping("/logo")
    public String logout(@RequestBody AccessTokenRequest accessToken) {
        try{
           String  username = jwtService.extractUsername(accessToken.getAccessToken());

            // Invalidate refresh token from database
        refrechTokenRepository.deleteByAppUserUserName(username);
//        refrechTokenRepository.deleteById(id);
             return "logout successful";
    } catch (Exception e) {
        // Log any errors that occur during deletion
        e.printStackTrace(); // Log to console for debugging purposes
        return "Error occurred during logout";
    }
    }

}


