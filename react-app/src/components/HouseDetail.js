import React, { useEffect, useState } from "react";
import ArrowLeft from "./icons/ArrowLeft";
import ChevronRight from "./icons/ChevronRight";
import XCircle from "./icons/XCircle";
import Heart from "./icons/Heart";
import MessageSquare from "./icons/MessageSquare";
import Review from "./Review";
import StarGenerator from "./StarGenerator";
import "./HouseDetail.css";

const HouseDetail = ({ selectedHouse, setSelectedHouse }) => {
  const message = localStorage.getItem("message");
  const [isModalOpen, setModalOpen] = useState(false);
  const [textAreaModal, setTextAreaModal] = useState("");
  const reviewsSection = selectedHouse.reviews.map((review, index) => {
    return <Review review={review} user={selectedHouse.usersReview[index]} />;
  });
  const [isHearted, setIsHearted] = useState("false");

  useEffect(() => {
    if (message) {
      setTextAreaModal(message);
    }
    setIsHearted(localStorage.getItem(`love-house-${selectedHouse.house.id}`));
  }, [message, selectedHouse.house.id]);

  const messageClicked = () => {
    if (isModalOpen) {
      return (
        <div className="modal-open">
          <div className="modal-header">
            <h2>Send message to {selectedHouse.userData.name}</h2>
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
          <form>
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

  if (Object.keys(selectedHouse.userData).length === 0) {
    return;
  }

  return (
    <div className="house-detail">
      <div
        className="head"
        style={{
          backgroundImage: `url(${selectedHouse.house.photos[0]})`,
        }}
      >
        <button
          onClick={(e) => {
            setSelectedHouse({});
          }}
          className="button"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isHearted === "true") {
              setIsHearted("false");
              localStorage.setItem(
                `love-house-${selectedHouse.house.id}`,
                "false"
              );
            } else {
              setIsHearted("true");
              localStorage.setItem(
                `love-house-${selectedHouse.house.id}`,
                "true"
              );
            }
          }}
          className={
            isHearted === "true" ? "hearted button" : "unhearted button"
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
      <div className="body">
        <h1>{selectedHouse.house.name}</h1>
        <div className="room-details">
          <span>{selectedHouse.house.rooms} Rooms</span>
          <span>{selectedHouse.house.size} Sq m</span>
          <span>{selectedHouse.house.windows} windows</span>
        </div>
        <div className="room-owner">
          <div>
            <img src={`${selectedHouse.userData.avatar}`} alt="Room Owner" />
          </div>
          <div className="owner-info">
            <h2>{selectedHouse.userData.name}</h2>
            <span>{selectedHouse.userData.address}</span>
          </div>
          <button className="button" onClick={() => setModalOpen(true)}>
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
        <div className="room-condition">
          <h3>Condition</h3>
          <p>{selectedHouse.house.condition}</p>
        </div>
        <div className="room-review-avg">
          <h3>Review</h3>
          <div className="star-container">
            <div>
              <StarGenerator
                reviews={selectedHouse.reviews}
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
              {`${selectedHouse.house.reviews.length} `}
              Reviews
              <ChevronRight />
            </span>
          </div>
        </div>
        {reviewsSection}
      </div>

      <div className="modal">{messageClicked()}</div>
    </div>
  );
};

export default HouseDetail;
