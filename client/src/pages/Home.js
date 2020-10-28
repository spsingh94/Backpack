import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import HomeHeader from "../images/map.jpg";

function Home() {
  return (
    <>
      <Header src={HomeHeader} alt="home-header">
      <p className="card-text header-notice">
      &#9888; DUE TO COVID19, CERTAIN AREAS MAY CONTAIN TRAVEL BANS/RESTRICTIONS. WE APOLOGIZE FOR THE INCONVENIENCE.
      </p>
        <h1 className="card-title header-title" id="home-title">
          Welcome to Backpack! Your Spontaneous Travel Planner.
        </h1>
        {/* <p className="card-text header-text">
          READY TO TRAVEL? NOT SURE WHERE? LET US HELP YOU DISCOVER THE WORLD BY
          DISCOVERING YOUR NEXT TRIP.
        </p> */}
      </Header>
      <Body/>
    </>
  );
}

export default Home;
