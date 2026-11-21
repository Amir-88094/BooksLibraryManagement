package com.amir2code.spring_boot_library.service;

import com.amir2code.spring_boot_library.entity.Book;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {
    @Transactional
    List<Book> getAllBooks();


    Page<Book> getAllBooks(int pageNo, int pageSize);
    Page<Book> findByTitleContaining(String title, int PageNo, int pageSize);
    Page<Book> findByCategory(String category, int PageNo, int PageSize);
    Book getBookById(Long id);
}
