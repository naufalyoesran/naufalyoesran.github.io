import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import houseStyles from "../styles/House.module.css";

export default function HouseItem({ house, address, stars }) {
  const [isHearted, setIsHearted] = useState("false");
  const router = useRouter();

  useEffect(() => {
    setIsHearted(localStorage.getItem(`love-house-${house.id}`));
  }, [house.id]);

  return (
    <div
      className={houseStyles.house}
      onClick={(e) => {
        router.push(`/detail?id=${house.id}`);
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isHearted === "true") {
            setIsHearted("false");
            localStorage.setItem(`love-house-${house.id}`, "false");
          } else {
            setIsHearted("true");
            localStorage.setItem(`love-house-${house.id}`, "true");
          }
        }}
        className={
          isHearted === "true" ? houseStyles.hearted : houseStyles.unHearted
        }
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
      <img src={house.photos[0]} alt="" />
      <strong>{house.name}</strong>
      <p className={houseStyles.address}>{address}</p>
      <div className={houseStyles.star}>{stars}</div>
      <p className={houseStyles.price}>{`$${Intl.NumberFormat("en-US").format(
        house.price
      )}.00`}</p>
    </div>
  );
}
