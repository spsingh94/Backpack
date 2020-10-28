import React from "react";
import { Container } from "reactstrap";
import Generator from "../components/Generator";
import Header from "../components/Header";
import TravHeader from "../images/views2.jpg";

function TravelPage() {
  return (
    <>
      <Header src={TravHeader} alt="travel-header">
        <h1 className="card-title header-title">Let's Travel</h1>
        {/* <p className="card-text header-text">
          CHOOSE CITY OR COUNTRY &#8226; GET LOCATION &#8226; ENTER FLIGHT
          INFORMATION &#8226; GET TICKET PRICES
        </p> */}
      </Header>
      <h1 className="body-title">How It Works</h1>
      <p style={{ textAlign: "center" }}>
        Please read the steps before continuing!{" "}
      </p>
      <Container>
        <ol style={{ textAlign: "center" }}>
          <li>
            Allow current location detection. It is crucial to the performance
            of the application that you allow current location detection.
          </li>
          <br />
          <li>
            Choose your destination search preference.
          </li>
          <br />
          <li>
            Fill out the form and click view tickets. You're all done! Happy Backpacking!
          </li>
        </ol>
      </Container>
      <Generator />
    </>
  );
}

export default TravelPage;
