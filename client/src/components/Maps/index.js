import React from "react";
import "./style.css";

export function Maps(props){

    return(
<iframe
className="google-maps-frame"
title="google-maps"
width="95%"
height="450"
frameBorder="0"
allowFullScreen
{...props}
/>
    )
}

