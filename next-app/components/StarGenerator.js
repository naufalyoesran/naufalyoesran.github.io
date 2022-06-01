import React from "react";

export default function StarGenerator({ reviews, svg }) {
  let avgReview = 0;
  for (const review of reviews) {
    avgReview += review.star;
  }
  avgReview = Math.round(avgReview / reviews.length);
  let generatedStar = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= avgReview) {
      generatedStar.push(<span style={{ color: "#2FCC71" }}>{svg}</span>);
      continue;
    }
    generatedStar.push(<span style={{ color: "#999" }}>{svg}</span>);
  }

  return <React.Fragment>{generatedStar}</React.Fragment>;
}
