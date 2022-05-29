import React from "react";
import HouseItem from "./HouseItem";

const HouseList = ({ houses, setSelectedHouse }) => {
  const houseList = houses.map((element, index) => {
    return <HouseItem house={element} setSelectedHouse={setSelectedHouse} />;
  });

  return <div>{houseList}</div>;
};

export default HouseList;
