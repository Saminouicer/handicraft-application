package com.GraduationProject.GraduationProject.repository;

import com.GraduationProject.GraduationProject.model.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<ImageData,Long> {
    Optional<ImageData> findByName(String filname);
}
