import React, { useEffect, useState } from "react";
import StarGenerator from "./StarGenerator";
import "./HouseItem.css";

const HouseItem = ({ house, setSelectedHouse }) => {
  const [isHearted, setIsHearted] = useState("false");

  useEffect(() => {
    setIsHearted(localStorage.getItem(`love-house-${house.house.id}`));
  }, [house.house.id]);

  return (
    <div
      className="house-item"
      onClick={(e) => {
        setSelectedHouse(house);
      }}
    >
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
      <img src={house.house.photos[0]} alt="" />
      <strong>{house.house.name}</strong>
      <p className="address">{house.userData.address}</p>
      <div className="star">
        <StarGenerator
          reviews={house.reviews}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          }
        />
      </div>
      <p className="price">{`$${Intl.NumberFormat("en-US").format(
        house.house.price
      )}.00`}</p>
    </div>
  );
};

export default HouseItem;
