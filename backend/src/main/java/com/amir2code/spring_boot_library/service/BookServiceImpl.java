package com.amir2code.spring_boot_library.service;

import com.amir2code.spring_boot_library.entity.Book;
import com.amir2code.spring_boot_library.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Transactional
    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Page<Book> getAllBooks(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        return bookRepository.findAll(pageable);

    }

    @Override
    @Transactional
    public Page<Book> findByTitleContaining(String title, int PageNo, int pageSize) {
        Pageable pageable = PageRequest.of(PageNo, pageSize);
        return bookRepository.findByTitleContaining(title, pageable);
    }

    @Override
    public Page<Book> findByCategory(String category, int PageNo, int PageSize) {
        Pageable pageable = PageRequest.of(PageNo, PageSize);
        return bookRepository.findByCategory(category, pageable);
    }

    @Override
    @Transactional
    public Book getBookById(Long id) {
        return bookRepository.getBookById(id);
    }


}
