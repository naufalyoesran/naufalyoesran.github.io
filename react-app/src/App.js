import { useState } from "react";
import "./App.css";
import Dome from "./components/Dome";
import axios from "axios";
import SearchResult from "./components/SearchResult";

function App() {
  const [houses, setHouses] = useState({});

  const searchHouse = async (term) => {
    const start = Date.now();
    const housesData = await axios.get("https://dome.vercel.app/api/houses");
    const usersData = await axios.get("https://dome.vercel.app/api/users");
    const reviewsData = await axios.get("https://dome.vercel.app/api/reviews");

    let houses = [];
    for (const houseData of housesData.data) {
      if (houseData.name.toLowerCase().includes(term.toLowerCase())) {
        let reviewArr = [];
        let userReviewArr = [];
        for (const review of houseData.reviews) {
          const reviewData = reviewsData.data[review];
          reviewArr.push(reviewData);
          userReviewArr.push(usersData.data[reviewData.authorId]);
        }

        houses.push({
          house: houseData,
          userData: usersData.data[houseData.ownerId],
          reviews: reviewArr,
          usersReview: userReviewArr,
        });
      }
    }
    const finish = Date.now();
    const time = finish - start;

    setHouses({ houses: houses, term: term, time: time });
  };

  if (Object.keys(houses).length !== 0) {
    return <SearchResult searchHouse={searchHouse} houses={houses} />;
  } else {
    return <Dome searchHouse={searchHouse} />;
  }
}

export default App;
