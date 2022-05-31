import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dome.css";

const Dome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <div className="dome">
      <h1>Dome</h1>
      <form onSubmit={onFormSubmit}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="search-input"
          placeholder="Find your dream home now..."
          name="q"
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2fcc71"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Dome;
