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
                <a className="footer-nav-items" href="#!">
                  Home
                </a>
              </li>
              <li>
                <a className="footer-nav-items" href="#!">
                  Travel
                </a>
              </li>
              <li>
                <a className="footer-nav-items" href="#!">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="card-footer text-muted">
          ©2020 Backpack Travel All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
