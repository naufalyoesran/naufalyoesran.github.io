import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Dome from "./components/Dome";
import SearchResult from "./components/SearchResult";
import HouseDetail from "./components/HouseDetail";
import "./App.css";

function App() {
  const [houses, setHouses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const searchHouse = async () => {
      const start = Date.now();

      const [housesData, usersData, reviewsData] = await Promise.allSettled([
        await axios.get("https://dome.vercel.app/api/houses"),
        await axios.get("https://dome.vercel.app/api/users"),
        await axios.get("https://dome.vercel.app/api/reviews"),
      ]);
      setHouses(housesData.value.data);
      setReviews(reviewsData.value.data);
      setUsers(usersData.value.data);

      const finish = Date.now();
      const time = finish - start;
      setTime(time);
    };

    searchHouse();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dome />}></Route>
        <Route
          path="search"
          element={
            <SearchResult
              houses={houses}
              users={users}
              reviews={reviews}
              time={time}
            />
          }
        />
        <Route
          path="detail"
          element={
            <HouseDetail houses={houses} users={users} reviews={reviews} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
