import styles from "../styles/Search.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HouseItem from "../components/HouseItem";
import StarGenerator from "../components/StarGenerator";

export default function SearchResult({
  query,
  houses,
  addresses,
  reviews,
  time,
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(query);
  const [isOpen, setIsOpen] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();

    router.push(`/search?q=${searchTerm}`);
    setIsOpen(false);
  };

  const stars = (index) => {
    return (
      <StarGenerator
        reviews={reviews[index]}
        svg={
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
            id="img"
            className="feather feather-star"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        }
      />
    );
  };

  return (
    <div>
      {isOpen ? (
        <form className={styles.header} onSubmit={onFormSubmit}>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Search another home..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
            />
            {searchTerm ? (
              <div
                className={styles.closeIcon}
                onClick={() => setSearchTerm("")}
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
                  className="feather feather-x-circle"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <button>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </button>
        </form>
      ) : (
        <div className={styles.header}>
          <div>
            <h1>
              Result for
              <span style={{ color: "#2fcc71" }}>{` ${query}`}</span>
            </h1>
            <span>
              Found <span>{houses.length}</span> result(s) in{" "}
              <span>{time}</span>
              ms
            </span>
          </div>
          <button onClick={(e) => setIsOpen(true)}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </button>
        </div>
      )}
      <div>
        {houses.map((house, index) => {
          return (
            <HouseItem
              house={house}
              address={addresses[index]}
              stars={stars(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const query = context.query.q;
  const start = Date.now();
  const [housesData, usersData, reviewsData] = await Promise.allSettled([
    await fetch("https://dome.vercel.app/api/houses").then((res) => res.json()),
    await fetch("https://dome.vercel.app/api/users").then((res) => res.json()),
    await fetch("https://dome.vercel.app/api/reviews").then((res) =>
      res.json()
    ),
  ]);
  const finish = Date.now();
  const time = finish - start;

  let addresses = [];
  let houses = [];
  let reviews = [];

  for (const house of housesData.value) {
    if (house.name.toLowerCase().includes(query.toLowerCase())) {
      let r = [];
      const user = usersData.value[house.ownerId];
      addresses.push(user.address);
      houses.push(house);

      for (const review of house.reviews) {
        const data = reviewsData.value[review];
        r.push(data);
      }
      reviews.push(r);
    }
  }

  return {
    props: {
      query,
      houses,
      addresses,
      reviews,
      time,
    },
  };
};
