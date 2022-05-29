import React, { useState } from "react";
import Search from "./icons/Search";
import "./Header.css";

const Header = ({ term, time, length, searchHouse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();

    searchHouse(searchTerm);
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <form className="header" onSubmit={onFormSubmit}>
        <div className="form">
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
            <div className="close-icon" onClick={() => setSearchTerm("")}>
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
          <Search />
        </button>
      </form>
    );
  }
  return (
    <div className="header">
      <div>
        <h1>
          Result for
          <span style={{ color: "#2fcc71" }}>{` ${term}`}</span>
        </h1>
        <span>
          Found <span>{length}</span> result(s) in <span>{time}</span>ms
        </span>
      </div>
      <button onClick={(e) => setIsOpen(true)}>
        <Search />
      </button>
    </div>
  );
};

export default Header;
