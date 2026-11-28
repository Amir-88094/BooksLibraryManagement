package com.amir2code.spring_boot_library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "checkout")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Checkout {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "checkout_date")
    private LocalDate checkoutDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "book_id")
    private Long bookId;

    public Checkout(String userEmail, LocalDate checkoutDate, LocalDate returnDate, Long bookId) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.bookId = bookId;

    }
}
