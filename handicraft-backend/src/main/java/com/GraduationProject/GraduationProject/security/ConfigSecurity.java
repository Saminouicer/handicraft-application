package com.GraduationProject.GraduationProject.security;

import com.GraduationProject.GraduationProject.filter.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class ConfigSecurity {
    @Autowired
    JwtAuthFilter authFilter;
    @Bean
    public UserDetailsService userDetailsService() {
//        public UserDetailsService userDetailsService(PasswordEncoder encoder) {
//        UserDetails user= User.withUsername("sam")
//                .password(encoder.encode(("sam")))
//                .roles("USER")
//                .build();
//        UserDetails admin= User.withUsername("sim")
//                .password(encoder.encode(("sim")))
//                .roles("ADMIN")
//                .build();
//        return new InMemoryUserDetailsManager(user,admin);
        return new AppUserDetailsService();
//        return new InMemoryUserDetailsManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                        .requestMatchers("/","/user/craftsman","/user/admin","/user/client","/authenticate","/refreshToken","/products","/image/{fileName}","review/{productId}","product/{productId}").permitAll()
                        .anyRequest().authenticated())
                .httpBasic(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
//        http.authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/","/new","/authenticate").permitAll()
//                        .anyRequest().authenticated())
//                .httpBasic(withDefaults())
//                .formLogin(withDefaults())
//                .csrf(AbstractHttpConfigurer::disable);
//        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
