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
        <p className="card-text header-text">
          CHOOSE CITY OR COUNTRY &#8226; GET LOCATION &#8226; ENTER FLIGHT
          INFORMATION &#8226; GET TICKET PRICES
        </p>
      </Header>
      <h1 className="body-title">How It Works</h1>
      <p style={{ textAlign: "center" }}>
        Please read the steps before continuing!{" "}
      </p>
      <Container>
        <ol style={{ textAlign: "center" }}>
          <li>
            Choose your destination search preference. You have the option of
            searching for a specific city or country. As you can tell, these two
            options are very different. One option limits the planning while the
            other leaves some room to plan.
          </li>
          <br />
          <li>
            Congratulations! You have received the location of your next
            backpack trip! Now make sure that you follow the next step before
            jumping right to the form! (If you are not happy with your
            destination or if the destination does not have any available
            traveling tickets you may restart at any time.)
          </li>
          <br />
          <li>
            CURRENT LOCATION! It is crucial to the performance of the
            application that you ALLOW current location. Blocking the
            applications capability to search your current location will prevent
            you from being able to view available traveling tickets.
          </li>
          <br />
          <li>
            Finally, fill out the form, click done, and click view tickets. Any
            changes that need to be made can be made by clicking the "Make
            Changes +" tab. We hope you enjoy your experience with us and that
            you have an amazing and safe trip! Happy backpacking!
          </li>
        </ol>
      </Container>
      <Generator />
    </>
  );
}

export default TravelPage;
