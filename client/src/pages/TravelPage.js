import React from "react";
import Calendar from "../components/Calendar";
import Header from "../components/Header";
import TravHeader from "../images/views2.jpg";

function TravelPage() {
  return (
    <>
      <Header src={TravHeader} alt="travel-header">
      <h1 className="card-title header-title">Let's Travel</h1>
      </Header>
      <Calendar />
    </>
  );
}

export default TravelPage;
