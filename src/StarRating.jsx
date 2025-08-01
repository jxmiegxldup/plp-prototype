import React from 'react';
import StarIcon from './StarIcon';
import './StarRating.css';

function StarRating({ rating, reviewCount, maxRating = 5 }) {
  return (
    <div className="star-rating">
      <div className="star-rating__stars">
        {Array.from({ length: maxRating }, (_, index) => (
          <div key={index} className="star-rating__star">
            <StarIcon filled={index < rating} />
          </div>
        ))}
      </div>
      {reviewCount && (
        <div className="star-rating__review-count">({reviewCount})</div>
      )}
    </div>
  );
}

export default StarRating; 