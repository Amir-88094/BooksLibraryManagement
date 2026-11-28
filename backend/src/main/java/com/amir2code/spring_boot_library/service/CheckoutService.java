package com.amir2code.spring_boot_library.service;

import com.amir2code.spring_boot_library.entity.Book;

public interface CheckoutService {

    Book checkoutBook(String userEmail, Long bookId) throws  Exception;
    boolean isBookCheckoutByUser(String userEmail, Long bookId);

}
