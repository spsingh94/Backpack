import React from "react";
import Header from "../components/Header";
import ContactHeader from "../images/brownplane.jpg";

function ContactPage() {
  return (
    <Header src={ContactHeader} alt="contact-header">
      <h1 className="card-title header-title">
        Welcome to Backpack! Your Spontaneous Travel Planner.
      </h1>
      <p className="card-text header-text">
        READY TO TRAVEL? NOT SURE WHERE? LET US HELP YOU DISCOVER THE WORLD BY
        DISCOVERING YOUR NEXT TRIP.
      </p>
    </Header>
  );
}

export default ContactPage;
