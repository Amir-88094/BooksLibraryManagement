import { Link, useParams } from "react-router-dom";
import type { ReviewModel } from "../models/ReviewModel";
import { useEffect, useState } from "react";
import { bookService } from "../../services/bookService";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Review } from "../../components/Review";
import { Pagination } from "../../components/Pagination";
import { useAuth } from "../../auth/AuthContext";
import { ReviewForm } from "../../components/ReviewForm";
const reviewPerPage = 5;
// traditiona way 
// const bookId1 = window.location.pathname.split("/")[2];
export const ReviewListPage = () => {
  const { isAuthenticated, login, user } = useAuth();
  const {bookId} = useParams<{ bookId: string }>();
const [review, setReview] = useState<ReviewModel[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [httpError, setHttpError] = useState<string | null>(null);
const [currentPage, setCurrentPage] = useState<number>(1);
const [totalReviews, setTotalReviews] = useState<number>(0);
const [totalPages, setTotalPages] = useState<number>(0);
const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
const [hasUserReviewed, setHasUserReviewed] = useState<boolean>(false);
const [refreshTrigger, setRefreshTrigger] = useState(0);
useEffect(() => {
  const fetchReviews = async () => {
    if(!bookId){
      setHttpError("Book ID is missing");
      setIsLoading(false);
      return;
    }

    try {     
      const pageNo = currentPage - 1;
      const bookReviews = await bookService.getReviewsByBookId(bookId, pageNo, reviewPerPage);
      setReview(bookReviews.content);
      setTotalReviews(bookReviews.page.totalElements);
      setTotalPages(bookReviews.page.totalPages);
      setIsLoading(false);
      if(isAuthenticated && user?.email){
        const userReview = bookReviews.content.find(
          (review) => review.userEmail == user?.email
        )
        setHasUserReviewed(!!userReview)
      }
    } catch (error) {
      setHttpError("Failed to fetch reviews");
      setIsLoading(false);
    }
  };

  fetchReviews();
}, [bookId, currentPage,isAuthenticated, user?.email, refreshTrigger]);

const handleReviewSubmitted = () => {
  setShowReviewForm(false);
  setHasUserReviewed(true);
  setCurrentPage(1);
  setRefreshTrigger((prev) => prev + 1)
}
const handleShowReviewForm = () => {
  setShowReviewForm(true);
}
const handleCancelReview = () => {
  setShowReviewForm(false);
}
const indexOfFirstReview = (currentPage - 1) * reviewPerPage;
const firstReview = totalReviews === 0 ? 0: indexOfFirstReview + 1;
const lastReview = Math.min(indexOfFirstReview + reviewPerPage, totalReviews);

if(isLoading){
  return <SpinnerLoading />;
}
if(httpError){
  return <div className="container mt-5"><p>{httpError}</p></div>
}
  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="row mb-4">
        <div className="col-12">
          <Link to={`/checkout/${bookId}`} className="btn btn-primary">
            Back to Book Details
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row">
        <div className="col-12">
          {isAuthenticated && !hasUserReviewed && !showReviewForm && (
            <div className= "mb-4">
              <button onClick={handleShowReviewForm} className="btn btn-primary">Leave a Review</button>
            </div>
          )}
          {!isAuthenticated && (
            <div className="alert alert-warning mb-4">
             <button onClick={login} 
             className = "btn btn-link p-0 text-decoration-none"
             >
              Sign In
             </button>{" "}
             to leave a Review
              </div>
          )}
          {isAuthenticated && hasUserReviewed && (
            <div className="alert alert-info mb-4">
              You have already reviewed this book 
            </div>
          )}
          {showReviewForm && bookId && (
            <ReviewForm
            bookId = {bookId}
            onReviewSubmit = {handleReviewSubmitted}
            onCancel = {handleCancelReview}
            ></ReviewForm>
          )}
          <h3>All Reviews {totalReviews}</h3>
          {review.length > 0 ? (
              <>
              <p>{firstReview} to {lastReview} of {totalReviews} reviews</p>
              {review.map((reviewItem) => (
                <Review key={reviewItem.id} review={reviewItem} />
              ))}

           {/* Pagination  */}
           {totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} paginate = {setCurrentPage}/>)}
              </>

          ) : (
         <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
          )}
         
        </div>
      </div>
    </div>
  );
};
