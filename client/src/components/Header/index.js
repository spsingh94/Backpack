import React from "react";
import "./style.css";

function Header(props) {
  return (
    <div className="card bg-dark text-white header-div">
      <img src={props.src} className="card-img" id="header-img" alt={props.alt} />
      <div className="card-img-overlay">
        {props.children}
      </div>
    </div>
  );
}

export default Header;
