import { useState } from "react";

export default function StarRating({ totalStars = 5, rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hover || rating);

        return (
          <span
            key={index}
            className={`md:text-2xl cursor-pointer transition-colors duration-200 
              ${isActive ? "text-amber-500" : "text-gray-400"} 
              hover:text-amber-600`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
