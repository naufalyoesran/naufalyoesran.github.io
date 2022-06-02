import React from "react";

export default function StarGenerator({ avgReview, svg }) {
  let generatedStar = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= avgReview) {
      generatedStar.push(
        <span style={{ color: "#2FCC71" }} key={i}>
          {svg}
        </span>
      );
      continue;
    }
    generatedStar.push(
      <span style={{ color: "#999" }} key={i}>
        {svg}
      </span>
    );
  }

  return <React.Fragment>{generatedStar}</React.Fragment>;
}
