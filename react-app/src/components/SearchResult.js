import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HouseItem from "./HouseItem";
import StarGenerator from "./StarGenerator";
import "./Header.css";

const SearchResult = ({ houses, users, reviews, time }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const [housesData, setHousesData] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    let address = [];
    let housesData = [];
    let stars = [];

    for (const house of houses) {
      if (
        house.name.toLowerCase().includes(searchParams.get("q").toLowerCase())
      ) {
        let reviewsData = [];
        const user = users[house.ownerId];
        address.push(user.address);
        housesData.push(house);

        for (const review of house.reviews) {
          const data = reviews[review];
          reviewsData.push(data);
        }

        stars.push(
          <StarGenerator
            reviews={reviewsData}
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
      }
    }

    setAddress(address);
    setHousesData(housesData);
    setStars(stars);

    setSearchTerm(searchParams.get("q"));
  }, [houses, users, reviews, searchParams]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    setSearchParams({ q: searchTerm });
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen ? (
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
        <div className="header">
          <div>
            <h1>
              Result for
              <span style={{ color: "#2fcc71" }}>{` ${searchParams.get(
                "q"
              )}`}</span>
            </h1>
            <span>
              Found <span>{housesData.length}</span> result(s) in{" "}
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
        {housesData.map((house, index) => {
          return (
            <HouseItem
              house={house}
              address={address[index]}
              stars={stars[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import HouseItem from "./HouseItem";
// import StarGenerator from "./StarGenerator";
// import "./Header.css";

// const SearchResult = ({}) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams({});
//   const [isOpen, setIsOpen] = useState(false);
//   const [address, setAddress] = useState([]);
//   const [housesData, setHousesData] = useState([]);
//   const [stars, setStars] = useState([]);
//   const [time, setTime] = useState(0);

//   useEffect(() => {
//     const searchHouse = async () => {
//       const start = Date.now();

//       const [houses, users, reviews] = await Promise.allSettled([
//         await axios.get("https://dome.vercel.app/api/houses"),
//         await axios.get("https://dome.vercel.app/api/users"),
//         await axios.get("https://dome.vercel.app/api/reviews"),
//       ]);

//       let address = [];
//       let housesData = [];
//       let stars = [];

//       for (const house of houses.value.data) {
//         if (
//           house.name.toLowerCase().includes(searchParams.get("q").toLowerCase())
//         ) {
//           let reviewsData = [];
//           const user = users.value.data[house.ownerId];
//           address.push(user.address);
//           housesData.push(house);

//           for (const review of house.reviews) {
//             const data = reviews.value.data[review];
//             reviewsData.push(data);
//           }

//           stars.push(
//             <StarGenerator
//               reviews={reviewsData}
//               svg={
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   id="img"
//                   className="feather feather-star"
//                 >
//                   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//                 </svg>
//               }
//             />
//           );
//         }
//       }
//       const finish = Date.now();
//       const time = finish - start;
//       setTime(time);

//       setAddress(address);
//       setHousesData(housesData);
//       setStars(stars);

//       setSearchTerm(searchParams.get("q"));
//     };

//     searchHouse();
//   }, [searchParams]);

//   const onFormSubmit = (e) => {
//     e.preventDefault();

//     setSearchParams({ q: searchTerm });
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       {isOpen ? (
//         <form className="header" onSubmit={onFormSubmit}>
//           <div className="form">
//             <input
//               type="text"
//               placeholder="Search another home..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyUp={(e) => {
//                 if (e.key === "Escape") {
//                   setIsOpen(false);
//                 }
//               }}
//             />
//             {searchTerm ? (
//               <div className="close-icon" onClick={() => setSearchTerm("")}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="feather feather-x-circle"
//                 >
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <line x1="15" y1="9" x2="9" y2="15"></line>
//                   <line x1="9" y1="9" x2="15" y2="15"></line>
//                 </svg>
//               </div>
//             ) : (
//               <div></div>
//             )}
//           </div>
//           <button>
//             <div>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-search"
//               >
//                 <circle cx="11" cy="11" r="8"></circle>
//                 <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//               </svg>
//             </div>
//           </button>
//         </form>
//       ) : (
//         <div className="header">
//           <div>
//             <h1>
//               Result for
//               <span style={{ color: "#2fcc71" }}>{` ${searchParams.get(
//                 "q"
//               )}`}</span>
//             </h1>
//             <span>
//               Found <span>{housesData.length}</span> result(s) in{" "}
//               <span>{time}</span>
//               ms
//             </span>
//           </div>
//           <button onClick={(e) => setIsOpen(true)}>
//             <div>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-search"
//               >
//                 <circle cx="11" cy="11" r="8"></circle>
//                 <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//               </svg>
//             </div>
//           </button>
//         </div>
//       )}
//       <div>
//         {housesData.map((house, index) => {
//           return (
//             <HouseItem
//               house={house}
//               address={address[index]}
//               stars={stars[index]}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SearchResult;
