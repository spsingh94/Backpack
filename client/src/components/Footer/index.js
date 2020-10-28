import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import logo from "../../images/backpacklogo.png";
import "./style.css";

function Footer() {
  return (
    <footer className="page-footer blue-grey darken-3">
      <Container className="container">
        <Row>
          <Col sm="2">
            <Link
              to="/"
              id="footer-nav-items"
              className={
                window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <img src={logo} className="logo" id="footer-logo" alt="logo" />
            </Link>
          </Col>
          <Col lg="6"></Col>
          <Col sm="4">
            <ul style={{ listStyle: "none" }}>
              <li>
                <Link
                  to="/"
                  id="footer-nav-items"
                  className={
                    window.location.pathname === "/"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/travel"
                  id="footer-nav-items"
                  className={
                    window.location.pathname === "/travel"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  TRAVEL
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  id="footer-nav-items"
                  className={
                    window.location.pathname === "/contact"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright">
        <div className="card-footer text-muted">
          ©2020 BACKPACK TRAVEL ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
