import React from "react";
import "./style.css";

function ImageStack(props) {
    return (
        <div class="image-stack">
        <div class="image-stack__item image-stack__item--top">
          <img
            className="stack-image"
            src={props.src1}
            alt="accolades"
          />
        </div>
        <div class="image-stack__item image-stack__item--bottom">
          <img
            className="stack-image"
            src={props.src2}
            alt="fithomepage"
          />
        </div>
      </div>
    )
}

export default ImageStack;