package com.GraduationProject.GraduationProject.repository;

import com.GraduationProject.GraduationProject.model.CraftsMan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CraftsManRepository extends JpaRepository<CraftsMan,Long> {
}
