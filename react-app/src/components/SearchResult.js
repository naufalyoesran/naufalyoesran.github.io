import React, { useState } from "react";
import HouseList from "./HouseList";
import Header from "./Header";
import HouseDetail from "./HouseDetail";

const SearchResult = ({ searchHouse, houses }) => {
  const [selectedHouse, setSelectedHouse] = useState({});

  if (Object.keys(selectedHouse).length !== 0) {
    return (
      <HouseDetail
        selectedHouse={selectedHouse}
        setSelectedHouse={setSelectedHouse}
      />
    );
  }

  return (
    <div>
      <Header
        term={houses.term}
        time={houses.time}
        length={houses.houses.length}
        searchHouse={searchHouse}
      />
      <HouseList houses={houses.houses} setSelectedHouse={setSelectedHouse} />
    </div>
  );
};

export default SearchResult;
