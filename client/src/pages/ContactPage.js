import React from "react";
import Header from "../components/Header";
import ContactHeader from "../images/brownplane.jpg";

function ContactPage() {
  return (
    <Header src={ContactHeader} alt="contact-header">
      <h1 className="card-title header-title">Contact Us</h1>
      <p className="card-text header-text">
        ANY QUESTIONS OR CONCERNS, WE ARE HERE FOR YOU. CONTACT US THROUGH ONE
        OF OUR SOCIAL MEDIA HANDLES OR EMAIL US DIRECTLY BY CLICKING ON THE MAIL
        SYMBOL.
      </p>
    </Header>
  );
}

export default ContactPage;
