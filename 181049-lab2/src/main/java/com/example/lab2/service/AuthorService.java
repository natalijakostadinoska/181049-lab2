package com.example.lab2.service;

import com.example.lab2.model.Author;
import com.example.lab2.model.projections.AuthorBasicInfoProjection;

import java.util.List;
import java.util.Optional;

public interface AuthorService {

    List<AuthorBasicInfoProjection> getAll();

    Optional<Author> findById(Long id);

}