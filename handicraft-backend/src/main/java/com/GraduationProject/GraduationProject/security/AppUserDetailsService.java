package com.GraduationProject.GraduationProject.security;

import com.GraduationProject.GraduationProject.model.AppUser;
import com.GraduationProject.GraduationProject.repository.AppUserRepository;
import com.GraduationProject.GraduationProject.repository.RefrechTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AppUserDetailsService implements UserDetailsService {
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    RefrechTokenRepository refrechTokenRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<AppUser> userInfo = appUserRepository.findByUserName(userName);
        return userInfo.map(AppUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + userName));

    }


}
