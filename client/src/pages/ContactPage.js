import React from "react";
import { Container, Row } from "reactstrap";
import Header from "../components/Header";
import ContactHeader from "../images/brownplane.jpg";
import WorldMap from "../images/worldmap.png";

function ContactPage() {
  return (
    <>
      <Header src={ContactHeader} alt="contact-header">
        <h1 className="card-title header-title">Contact Us</h1>
        {/* <p className="card-text header-text">
        ANY QUESTIONS OR CONCERNS, WE ARE HERE FOR YOU. CONTACT US THROUGH ONE
        OF OUR SOCIAL MEDIA HANDLES OR EMAIL US DIRECTLY BY CLICKING ON THE MAIL
        SYMBOL.
      </p> */}
      </Header>
      <Container>
        <div style={{ textAlign: "center" }}>
          <h3>We'd like to hear from you!</h3>
          <h5>
            We're here for you. If you have any further questions, please let us
            know.
          </h5>
        </div>
        <Row
          style={{
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <div style={{ borderRight: "1px black solid" }}>
            <a href="https://www.hello.com" class="fa fa-facebook">{null}</a>
          </div>
          <div style={{ borderRight: "1px black solid" }}>
            <a href="https://www.hello.com" class="fa fa-google">{null}</a>
          </div>
          <a href="https://www.hello.com" class="fa fa-instagram">{null}</a>
        </Row>
        <Row style={{justifyContent:"center", height:"550px"}}>
        <img src={WorldMap} alt="world-map" style={{maxHeight:"650px"}} />
        </Row>
      </Container>
    </>
  );
}

export default ContactPage;
