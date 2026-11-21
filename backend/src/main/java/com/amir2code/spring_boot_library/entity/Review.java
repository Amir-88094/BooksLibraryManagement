package com.amir2code.spring_boot_library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Entity
@Table(name="review")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name= "date")
    @CreationTimestamp
    private Date date;
    @Column(name = "rating")
    private double rating;
    @Column(name = "book_id")
    private long bookId;
    @Column(name="review_description")
    private String reviewDescription;
}
