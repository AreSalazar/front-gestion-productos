import React from "react";

export default function RatingStars({ value=0, onChange }) {
  return (
    <div>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem"
          }}
          className={
            star <= value
              ? "text-warning"
              : "text-secondary"
          }
          onClick={() => onChange && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
