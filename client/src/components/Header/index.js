import React from "react";
import "./style.css";
import HeaderImage from "../../images/map.jpg";

function Header() {
  return (
    <div class="card bg-dark text-white header-div">
      <img src={HeaderImage} class="card-img" id="header-img" alt="header" />
      <div class="card-img-overlay">
        <h1 class="card-title header-title">
          Welcome to Backpack! Your Spontaneous Travel Planner.
        </h1>
        <p class="card-text header-text">
          READY TO TRAVEL? NOT SURE WHERE? LET US HELP YOU DISCOVER THE WORLD BY DISCOVERING YOUR NEXT TRIP.
        </p>
      </div>
    </div>
  );
}

export default Header;
