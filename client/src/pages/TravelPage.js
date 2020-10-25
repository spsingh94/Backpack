import React from "react";
import Generator from "../components/Generator";
import Header from "../components/Header";
import TravHeader from "../images/views2.jpg";

function TravelPage() {
  return (
    <>
      <Header src={TravHeader} alt="travel-header">
      <h1 className="card-title header-title">Let's Travel</h1>
      <p className="card-text header-text">
        CHOOSE CITY OR COUNTRY &#8226; GET LOCATION &#8226; ENTER FLIGHT INFORMATION &#8226; GET TICKET PRICES
        </p>
      </Header>
      <Generator />
    </>
  );
}

export default TravelPage;
