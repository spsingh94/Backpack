import React from "react";
import Generator from "../components/Generator";
import Header from "../components/Header";
import TravHeader from "../images/views2.jpg";

function TravelPage() {
  return (
    <>
      <Header src={TravHeader} alt="travel-header">
      <h1 className="card-title header-title">Let's Travel</h1>
      </Header>
      <Generator />
    </>
  );
}

export default TravelPage;
