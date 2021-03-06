package com.example.lab2.repository;

import com.example.lab2.model.Author;
import com.example.lab2.model.projections.AuthorBasicInfoProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("select a from Author a")
    List<AuthorBasicInfoProjection> findAllBasic();
}
