package com.example.lab2.service.impl;

import com.example.lab2.model.Author;
import com.example.lab2.model.Book;
import com.example.lab2.model.dto.BookDto;
import com.example.lab2.model.exceptions.AuthorNotFoundException;
import com.example.lab2.model.exceptions.BookNotFoundException;
import com.example.lab2.repository.AuthorRepository;
import com.example.lab2.repository.BookRepository;
import com.example.lab2.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Optional<Book> save(BookDto bookDto) {
        Author author = authorRepository.findById(bookDto.getAuthor()).orElseThrow(() -> new AuthorNotFoundException(bookDto.getAuthor()));

        //logic to not create new book (book with same name...)

        Book book = new Book(bookDto.getName(), bookDto.getCategory(),
                author, bookDto.getAvailableCopies());

        this.bookRepository.save(book);
        return Optional.of(book);
    }

    @Override
    public Optional<Book> edit(Long id, BookDto bookDto) {
        Author author = authorRepository.findById(bookDto.getAuthor()).orElseThrow(() -> new AuthorNotFoundException(bookDto.getAuthor()));

        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));

        book.setName(bookDto.getName());
        book.setCategory(bookDto.getCategory());
        book.setAuthor(author);
        book.setAvailableCopies(bookDto.getAvailableCopies());

        this.bookRepository.save(book);
        return Optional.of(book);
    }

    @Override
    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Optional<Book> setAvailableCopies(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
        Integer availableCopies = book.getAvailableCopies() - 1;
        if (availableCopies >= 0) {
            book.setAvailableCopies(availableCopies);
            this.bookRepository.save(book);
        }
        return Optional.of(book);
    }
}
