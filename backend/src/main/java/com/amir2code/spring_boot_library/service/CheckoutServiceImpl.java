package com.amir2code.spring_boot_library.service;

import com.amir2code.spring_boot_library.entity.Book;
import com.amir2code.spring_boot_library.entity.Checkout;
import com.amir2code.spring_boot_library.repository.BookRepository;
import com.amir2code.spring_boot_library.repository.CheckoutRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
public class CheckoutServiceImpl implements  CheckoutService{

    private final BookRepository bookRepository;
    private final CheckoutRepository checkoutRepository;

    public CheckoutServiceImpl(BookRepository bookRepository, CheckoutRepository checkoutRepository){
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    @Override
    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
      Book book = bookRepository.findById(bookId)
              .orElseThrow(() -> new Exception("Book not found"));
        Checkout existingCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if(existingCheckout != null){
            throw new Exception("Book already checkedout by this User");
        }
        if(book.getCopiesAvailable() <= 0){
            throw new Exception("Copies not available to checkout");
        }

        book.setCopiesAvailable(book.getCopiesAvailable()-1);
        bookRepository.save(book);

        LocalDate checkoutDate = LocalDate.now();
        LocalDate returnDate = checkoutDate.plusWeeks(2);

        Checkout checkout = new Checkout(userEmail, checkoutDate, returnDate, bookId);
        checkoutRepository.save(checkout);

      return book;
    }

    @Override
    public boolean isBookCheckoutByUser(String userEmail, Long bookId) {
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        return checkout != null;
    }
}
