package com.amir2code.spring_boot_library.service;

import com.amir2code.spring_boot_library.entity.Review;
import com.amir2code.spring_boot_library.repository.ReviewRepository;
import com.amir2code.spring_boot_library.requestmodeldto.ReviewRequest;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl (ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }
    @Override
    @Transactional
    public Page<Review> getReviewsByBookId(Long bookId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return reviewRepository.findByBookId(bookId, pageable);
    }

    @Override
    @Transactional
    public Review createReview(String userEmail, ReviewRequest reviewRequest) throws Exception {

        if(reviewRepository.existsByUserEmailAndBookId(userEmail, reviewRequest.getBookId())){
            throw new Exception("Review already exists for book Id by this User");
        }
        Review review = new Review();
        review.setUserEmail(userEmail);
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setReviewDescription(reviewRequest.getReviewDescription());
        review.setDate(new java.sql.Date(System.currentTimeMillis()));
        return reviewRepository.save(review);
    }
}
