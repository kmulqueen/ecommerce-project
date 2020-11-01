import React from "react";

const Rating = ({ rating, reviews }) => {
  return (
    <div className="rating">
      {/* Stars for ratings */}
      <span>
        {/* Star 1 */}
        <i
          className={
            rating >= 1
              ? "fas fa-star"
              : rating >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
        {/* Star 2 */}
        <i
          className={
            rating >= 2
              ? "fas fa-star"
              : rating >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
        {/* Star 3 */}
        <i
          className={
            rating >= 3
              ? "fas fa-star"
              : rating >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
        {/* Star 4 */}
        <i
          className={
            rating >= 4
              ? "fas fa-star"
              : rating >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
        {/* Star 5 */}
        <i
          className={
            rating >= 5
              ? "fas fa-star"
              : rating >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        {reviews ? ` ${reviews} reviews` : "No reviews found for this item."}
      </span>
    </div>
  );
};

export default Rating;
