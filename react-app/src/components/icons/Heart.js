import React, { useState, useEffect } from "react";

const Heart = (house) => {
  const [isHearted, setIsHearted] = useState("false");

  useEffect(() => {
    setIsHearted(localStorage.getItem(`love-house-${house.house.id}`));
  }, []);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (isHearted === "true") {
          setIsHearted("false");
          localStorage.setItem(`love-house-${house.house.id}`, "false");
        } else {
          setIsHearted("true");
          localStorage.setItem(`love-house-${house.house.id}`, "true");
        }
      }}
      className={isHearted === "true" ? "hearted" : "unhearted"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-heart"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
};

export default Heart;
