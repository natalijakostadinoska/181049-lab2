package com.example.lab2.service.impl;

import com.example.lab2.model.Author;
import com.example.lab2.model.projections.AuthorBasicInfoProjection;
import com.example.lab2.repository.AuthorRepository;
import com.example.lab2.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    public AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<AuthorBasicInfoProjection> getAll() {
//        return authorRepository.findAll();
        return authorRepository.findAllBasic();
    }

    @Override
    public Optional<Author> findById(Long id) {
        return authorRepository.findById(id);
    }
}
