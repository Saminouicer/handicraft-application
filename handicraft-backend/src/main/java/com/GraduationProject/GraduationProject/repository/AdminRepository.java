package com.GraduationProject.GraduationProject.repository;

import com.GraduationProject.GraduationProject.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository< Admin,Long> {
}
