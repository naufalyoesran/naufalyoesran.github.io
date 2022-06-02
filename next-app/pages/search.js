import styles from "../styles/Search.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import HouseItem from "../components/HouseItem";
import StarGenerator from "../components/StarGenerator";
import AppContext from "../config/AppContext";

export default function SearchResult({
  query,
  houses,
  addresses,
  // reviews,
  avgReviews,
  time,
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(query);
  const [isOpen, setIsOpen] = useState(false);
  const [isRateOpen, setIsRateOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [starCount, setStarCount] = useState([]);
  const [sortType, setSortType] = useState("rateHigh");

  const length = [1, 2, 3, 4, 5];

  // const value = useContext(AppContext);

  const onFormSubmit = (e) => {
    e.preventDefault();

    router.push(`/search?q=${searchTerm}`);
    setIsOpen(false);
  };

  const rate = () => {
    const rateMapped = length.map((item, i) => {
      return (
        <div className={styles.rateStar}>
          <div
            className={
              isChecked[i] ? `${styles.check} ${styles.checked}` : styles.check
            }
            onClick={(e) => {
              e.stopPropagation();

              if (isChecked[i]) {
                let check = [...isChecked];
                check[i] = false;
                setIsChecked(check);

                let array = [...starCount];
                const index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
                setStarCount(array);
              } else {
                let check = [...isChecked];
                check[i] = true;
                setIsChecked(check);

                setStarCount([...starCount, i]);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isChecked[i] ? "#fff" : "#888"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              key={i}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div style={{ width: "10px" }}></div>
          <div className={styles.starContainer}>
            {length.map((item, index) => {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={index <= i ? "#2FCC71" : "#999"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              );
            })}
          </div>
        </div>
      );
    });
    return rateMapped;
  };

  const stars = (index) => {
    return (
      <StarGenerator
        avgReview={avgReviews[index]}
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
        {sortType === "priceHigh"
          ? starCount.length === 0
            ? houses
                .sort(({ price: a }, { price: b }) => {
                  if (a < b) {
                    return 1;
                  } else if (a > b) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  return (
                    <HouseItem
                      house={house}
                      address={addresses[house.id]}
                      stars={stars(house.id)}
                      key={house.id}
                    />
                  );
                })
            : houses
                .sort(({ price: a }, { price: b }) => {
                  if (a < b) {
                    return 1;
                  } else if (a > b) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  if (starCount.includes(avgReviews[house.id] - 1)) {
                    return (
                      <HouseItem
                        house={house}
                        address={addresses[house.id]}
                        stars={stars(house.id)}
                        key={house.id}
                      />
                    );
                  }
                  return null;
                })
          : sortType === "priceLow"
          ? starCount.length === 0
            ? houses
                .sort(({ price: a }, { price: b }) => {
                  if (a < b) {
                    return -1;
                  } else if (a > b) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  return (
                    <HouseItem
                      house={house}
                      address={addresses[house.id]}
                      stars={stars(house.id)}
                      key={house.id}
                    />
                  );
                })
            : houses
                .sort(({ price: a }, { price: b }) => {
                  if (a < b) {
                    return -1;
                  } else if (a > b) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  if (starCount.includes(avgReviews[house.id] - 1)) {
                    return (
                      <HouseItem
                        house={house}
                        address={addresses[house.id]}
                        stars={stars(house.id)}
                        key={house.id}
                      />
                    );
                  }
                  return null;
                })
          : sortType === "rateLow"
          ? starCount.length === 0
            ? houses
                .sort(({ id: a }, { id: b }) => {
                  if (avgReviews[a] < avgReviews[b]) {
                    return -1;
                  } else if (avgReviews[a] > avgReviews[b]) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  return (
                    <HouseItem
                      house={house}
                      address={addresses[house.id]}
                      stars={stars(house.id)}
                      key={house.id}
                    />
                  );
                })
            : houses
                .sort(({ id: a }, { id: b }) => {
                  if (avgReviews[a] < avgReviews[b]) {
                    return -1;
                  } else if (avgReviews[a] > avgReviews[b]) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  if (starCount.includes(avgReviews[house.id] - 1)) {
                    return (
                      <HouseItem
                        house={house}
                        address={addresses[house.id]}
                        stars={stars(house.id)}
                        key={house.id}
                      />
                    );
                  }
                  return null;
                })
          : sortType === "rateHigh"
          ? starCount.length === 0
            ? houses
                .sort(({ id: a }, { id: b }) => {
                  if (avgReviews[a] < avgReviews[b]) {
                    return 1;
                  } else if (avgReviews[a] > avgReviews[b]) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  return (
                    <HouseItem
                      house={house}
                      address={addresses[house.id]}
                      stars={stars(house.id)}
                      key={house.id}
                    />
                  );
                })
            : houses
                .sort(({ id: a }, { id: b }) => {
                  if (avgReviews[a] < avgReviews[b]) {
                    return 1;
                  } else if (avgReviews[a] > avgReviews[b]) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                .map((house, index) => {
                  if (starCount.includes(avgReviews[house.id] - 1)) {
                    return (
                      <HouseItem
                        house={house}
                        address={addresses[house.id]}
                        stars={stars(house.id)}
                        key={house.id}
                      />
                    );
                  }
                  return null;
                })
          : houses.map((house, index) => {
              return (
                <HouseItem
                  house={house}
                  address={addresses[index]}
                  stars={stars(index)}
                  key={house.id}
                />
              );
            })}
      </div>
      <div className={styles.filterContainer}>
        <div
          className={styles.rating}
          onClick={(e) =>
            isRateOpen ? setIsRateOpen(false) : setIsRateOpen(true)
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
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Rating</span>
        </div>

        {isRateOpen ? (
          <div
            className={styles.ratingOpen}
            onClick={(e) => {
              setIsRateOpen(false);
            }}
          >
            {rate()}
          </div>
        ) : null}

        <div
          className={styles.sort}
          onClick={(e) =>
            isSortOpen ? setIsSortOpen(false) : setIsSortOpen(true)
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
          >
            <line x1="17" y1="10" x2="3" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="17" y1="18" x2="3" y2="18"></line>
          </svg>
          <span>Sort By</span>
        </div>
        {isSortOpen ? (
          <div className={styles.sortOpen}>
            <div
              className={
                sortType === "rateLow"
                  ? `${styles.sortItem} ${styles.selected}`
                  : styles.sortItem
              }
              onClick={(e) => {
                setSortType("rateLow");
              }}
            >
              Rating - Lowest
            </div>
            <div
              className={
                sortType === "rateHigh"
                  ? `${styles.sortItem} ${styles.selected}`
                  : styles.sortItem
              }
              onClick={(e) => {
                setSortType("rateHigh");
              }}
            >
              Rating - Highest
            </div>
            <div
              className={
                sortType === "priceLow"
                  ? `${styles.sortItem} ${styles.selected}`
                  : styles.sortItem
              }
              onClick={(e) => {
                setSortType("priceLow");
              }}
            >
              Price - Lowest
            </div>
            <div
              className={
                sortType === "priceHigh"
                  ? `${styles.sortItem} ${styles.selected}`
                  : styles.sortItem
              }
              onClick={(e) => {
                setSortType("priceHigh");
              }}
            >
              Price - Highest
            </div>
          </div>
        ) : null}
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
  // let reviews = [];
  let avgReviews = [];

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
      // reviews.push(r);
      let avg = 0;
      for (const review of r) {
        avg += review.star;
      }
      avg = Math.round(avg / r.length);
      avgReviews.push(avg);
    }
  }

  return {
    props: {
      query,
      houses,
      addresses,
      // reviews,
      avgReviews,
      time,
    },
  };
};
