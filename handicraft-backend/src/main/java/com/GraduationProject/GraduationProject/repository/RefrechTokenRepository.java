package com.GraduationProject.GraduationProject.repository;

import com.GraduationProject.GraduationProject.model.RefrechToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefrechTokenRepository extends JpaRepository<RefrechToken,Long> {
    Optional<RefrechToken> findByToken(String token);

    void deleteByAppUserUserName(String username);
}
