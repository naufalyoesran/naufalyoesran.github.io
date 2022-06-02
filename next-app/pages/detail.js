import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Review from "../components/Review";
import StarGenerator from "../components/StarGenerator";
import styles from "../styles/Detail.module.css";

export default function HouseDetail({ house, owner, reviews, avg, users }) {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [textAreaModal, setTextAreaModal] = useState("");
  const [isHearted, setIsHearted] = useState("false");

  useEffect(() => {
    const message = localStorage.getItem("message");

    if (message) {
      setTextAreaModal(message);
    }
    setIsHearted(localStorage.getItem(`love-house-${house.id}`));
  }, [house.id]);

  const messageClicked = () => {
    if (isModalOpen) {
      return (
        <div className={styles.modalOpen}>
          <div className={styles.modalHeader}>
            <h2>Send message to {owner.name}</h2>
            <button
              onClick={() => {
                setModalOpen(false);
                localStorage.setItem("message", textAreaModal);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id="img"
                className="feather feather-x-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea
              id="textareaModal"
              placeholder="Write your message here"
              value={textAreaModal}
              onChange={(e) => setTextAreaModal(e.target.value)}
            ></textarea>
            <button type="submit" id="send">
              Send message
            </button>
          </form>
        </div>
      );
    }
    return;
  };

  return (
    <div className={styles.houseDetail}>
      <div
        className={styles.head}
        style={{
          backgroundImage: `url(${house.photos[0]})`,
        }}
      >
        <button
          onClick={(e) => {
            router.push(`/search?q=`);
          }}
          className={styles.button}
        >
          <div style={{ color: "white" }}>
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
              className="feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
        </button>
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
            isHearted === "true"
              ? `${styles.hearted} ${styles.button}`
              : `${styles.unhearted} ${styles.button}`
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
      </div>
      <div className={styles.body}>
        <h1>{house.name}</h1>
        <div className={styles.roomDetails}>
          <span>{house.rooms} Rooms</span>
          <span>{house.size} Sq m</span>
          <span>{house.windows} windows</span>
        </div>
        <div className={styles.roomOwner}>
          <div>
            <img src={owner.avatar} alt="Room Owner" />
          </div>
          <div className={styles.ownerInfo}>
            <h2>{owner.name}</h2>
            <span>{owner.address}</span>
          </div>
          <button className={styles.button} onClick={() => setModalOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              id="img"
              className="feather feather-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        <div className={styles.roomCondition}>
          <h3>Condition</h3>
          <p>{house.condition}</p>
        </div>
        <div className={styles.roomReviewAvg}>
          <h3>Review</h3>
          <div className={styles.starContainer}>
            <div>
              <StarGenerator
                avgReview={avg}
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
            </div>
            <span>
              {`${house.reviews.length} `}
              Reviews
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
                id="img"
                className="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </div>
        </div>
        {reviews.map((review) => {
          return (
            <Review
              review={review}
              user={users[review.authorId]}
              key={review.id}
            />
          );
        })}
      </div>

      <div className={styles.modal}>{messageClicked()}</div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const query = context.query.id;
  const [housesData, usersData, reviewsData] = await Promise.allSettled([
    await fetch("https://dome.vercel.app/api/houses").then((res) => res.json()),
    await fetch("https://dome.vercel.app/api/users").then((res) => res.json()),
    await fetch("https://dome.vercel.app/api/reviews").then((res) =>
      res.json()
    ),
  ]);

  const house = housesData.value[query];
  const owner = usersData.value[house.ownerId];
  const users = usersData.value;

  let reviews = [];
  for (const review of house.reviews) {
    const data = reviewsData.value[review];
    reviews.push(data);
  }

  let avg = 0;
  for (const review of reviews) {
    avg += review.star;
  }
  avg = Math.round(avg / reviews.length);

  return {
    props: {
      house,
      owner,
      reviews,
      avg,
      users,
    },
  };
};
