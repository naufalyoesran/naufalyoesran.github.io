import "../styles/globals.css";
import React from "react";
import AppContext from "../config/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext.Provider>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;

// export const getServerSideProps = async () => {
//   const start = Date.now();

//   const [housesData, usersData, reviewsData] = await Promise.allSettled([
//     await fetch("https://dome.vercel.app/api/houses").then((res) => res.json()),
//     await fetch("https://dome.vercel.app/api/users").then((res) => res.json()),
//     await fetch("https://dome.vercel.app/api/reviews").then((res) =>
//       res.json()
//     ),
//   ]);

//   const houses = housesData.value;
//   const users = usersData.value;
//   const reviews = reviewsData.value;

//   const finish = Date.now();
//   const time = finish - start;
//   return {
//     props: {
//       houses,
//       users,
//       reviews,
//       time,
//     },
//   };
// };
