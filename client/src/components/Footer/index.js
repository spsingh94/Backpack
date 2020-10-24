import React from "react";
import { Link } from "react-router-dom";
import Backpack from "../../images/backpacklogo.png";
import "./style.css";

function Footer() {
  return (
    <footer className="page-footer blue-grey darken-3">
      <div className="container">
        <div className="row">
          <div className="col s9">
            <Link
              to="/"
              id="footer-nav-items"
              className={
                window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <img
                src={Backpack}
                className="logo"
                id="footer-logo"
                alt="logo"
              />
            </Link>
          </div>
          <div className="col s4"></div>
          <div className="col s2">
            <ul>
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
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="card-footer text-muted">
          ©2020 BACKPACK TRAVEL ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
