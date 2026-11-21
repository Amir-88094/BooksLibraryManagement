package com.amir2code.spring_boot_library.repository;

import com.amir2code.spring_boot_library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {

  Page<Book> findByTitleContaining(String title, Pageable pageable);

  Page<Book> findByCategory(String Category, Pageable pageable);

  Book getBookById(Long  id);
}
