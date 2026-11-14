import type {ReviewModel} from "../layouts/models/ReviewModel";
import { StarsReview } from "./StarsReview";

interface ReviewProps {
    review : ReviewModel;

}

export const Review: React.FC<ReviewProps> = ({ review }) => {

    const date = new Date(review.date);
     const longMonth = date.toLocaleDateString("en-US", { month: "long" });
     const dateDay = date.getDate();
     const dateYear = date.getFullYear();
     const dateRender = `${dateDay} ${longMonth} ${dateYear}`;

     return (
        <div className= "col-sm-8 col-md-8">
            <h5>{review.userEmail}</h5>
            <div className="row">
                <div className="col">
                    {dateRender}
                </div>
                <div className="col">
                    <StarsReview rating={review.rating} size={16}></StarsReview>
                </div>
            </div>
            <div className="mt-2">
                <p>{review.reviewDescription ?? <em>No description provided</em>}</p>
            </div>
            <hr/>
        </div>
     )

}