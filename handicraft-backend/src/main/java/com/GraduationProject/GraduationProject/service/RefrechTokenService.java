package com.GraduationProject.GraduationProject.service;

import com.GraduationProject.GraduationProject.model.RefrechToken;
import com.GraduationProject.GraduationProject.repository.AppUserRepository;
import com.GraduationProject.GraduationProject.repository.RefrechTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Component
public class RefrechTokenService {
    @Autowired
    RefrechTokenRepository refrechTokenRepository;
    @Autowired
    AppUserRepository appUserRepository;

    public RefrechToken createRefrechToken(String username) {
        RefrechToken refrechToken= RefrechToken.builder()
                .appUser(appUserRepository.findByUserName(username).get())
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(600000))
                .build();
        return refrechTokenRepository.save(refrechToken);
    }

    public Optional<RefrechToken> findByToken(String token) {
        return refrechTokenRepository.findByToken(token);
    }

    public RefrechToken verifyExpiration(RefrechToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refrechTokenRepository.delete(token);
            throw new RuntimeException(token.getToken() + " Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

//    public void invalidateRefreshToken(String username) {
//        // Delete the refresh token associated with the user
//        refrechTokenRepository.deleteByAppUserUserName(username);
//    }


}
