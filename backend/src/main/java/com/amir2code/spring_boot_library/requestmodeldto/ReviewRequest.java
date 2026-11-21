package com.amir2code.spring_boot_library.requestmodeldto;


import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewRequest {
    @NotNull(message = "Rating is required")
    @DecimalMin(value = "0.0", message = "Rating must be atleast 0.0")
    @DecimalMax(value="5.0", message="Rating must be at most 5.0")
    private Double rating;
    @NotNull(message =  "Book ID is required")
    private Long bookId;
    @Size(max = 1000, message = "Review Description must be atmost 1000 characters")
    private String reviewDescription;


}
