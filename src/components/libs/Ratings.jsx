import React from "react";
import { IoStar } from "react-icons/io5";

export default function Ratings({ rating = 0 }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const fillPercent = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <div key={index} className="relative text-gray-300">
            <IoStar className="text-xl" />

            <div
              className="absolute top-0 left-0 overflow-hidden text-amber-500"
              style={{ width: `${fillPercent}%` }}
            >
              <IoStar className="text-xl" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
