package com.GraduationProject.GraduationProject.repository;

import com.GraduationProject.GraduationProject.model.MakeOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<MakeOrder,Long> {
}
