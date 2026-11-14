import { useEffect, useState } from "react";
import type { BookModel } from "../models/BookModel";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { bookService } from "../../services/bookService";
import { CheckoutBox } from "./components/CheckoutBox";
import type { ReviewModel } from "../models/ReviewModel";
import { LatestReview } from "./components/LatestReview";

export const BookCheckoutPage = () => {
 const [book, setBook] = useState<BookModel | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(true);
 const [httpError, setHttpError] = useState<string | null>(null);
//  reviews 
const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const bookId = window.location.pathname.split("/").pop();
  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try{
        if(bookId){
          const [bookData, reviewsData] = await Promise.all([
            bookService.getBookById(bookId),
            bookService.getReviewsByBookId(bookId,0, 5)
          ])
    
          if(!bookData){
            throw new Error("Failed to fetch book by ID");
          }
          setBook(bookData);
          setReviews(reviewsData.content);
          setIsLoading(false);
        }
      }
      catch(error){
        console.error("Error fetching book:", error);
        setHttpError(error instanceof Error ? error.message :"An unknown error occurred");
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if(isLoading){
    return <SpinnerLoading />;
  }
  if(httpError){
    return <div>{httpError}</div>
  }
  if (!book) {
    return <div>Book not found</div>;
  }
  return (
    <>
      {/* Desktop View */}
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img
              src={book?.img}
              width="226"
              height="349"
              alt="Book"
            />
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
            </div>
          </div>
           <CheckoutBox book={book} />
        </div>
        <hr />
        <LatestReview reviews={reviews} bookId={book?.id} />
      </div>
      {/* Mobile View */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={book?.img}
            width="226"
            height="349"
            alt="Book"
          />
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">Luv2code Author</h5>
            <p className="lead">Luv2code Description</p>
          </div>
        </div>
        <CheckoutBox book={book} />
        <hr />
         <LatestReview reviews={reviews} bookId={book?.id} />
      </div>
    </>
  );
};
