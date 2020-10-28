import React from "react";
import { Container, Row, Button, ButtonToolbar, ButtonGroup } from "reactstrap";
import ImageStack from "../ImageStack";
import Indo1 from "../../images/indo1.jpg";
import Indo2 from "../../images/indo2.png";
import Bromo from "../../images/mtbromo.jpg";
import Bali from "../../images/bali.jpg";
import "./style.css";

function Body() {
  return (
    <>
      <Container>
        <h1 className="body-title">About Us</h1>
        <Row>
          <p className="body-text">
            {" "}
            <div
              className="stack-div"
              style={{ float: "right", marginLeft: "30px" }}
            >
              <ImageStack src1={Indo2} src2={Indo1} />
            </div>
            <div className="inner-text text-set1">
              <h5>Our Mission</h5>
              Our mission was to make backpack traveling less confusing and
              easier. We are aware that at times finding new places to travel
              can be hard and that you just want to leave that front door and
              explore the world. We are here to help you accomplish just that.
              With a few easy steps you can get a destination and air travel
              ticket information and pricing in seconds! We made all the
              difficult stuff easier and faster so that you can do all the fun
              stuff more easily and faster.
            </div>
          </p>
        </Row>
        <Row>
          <p className="body-text">
            {" "}
            <div
              className="stack-div"
              style={{ float: "left", marginRight: "30px" }}
            >
              <ImageStack src1={Bromo} src2={Bali} />
            </div>
            <div className="inner-text text-set2">
              <h5>The Vision</h5>
              Vision of the project came from the idea of backpacking and what
              it meant. Finding and traveling to new parts of the world can be
              risky but that is not all, it can be unpredictable, fun, exciting,
              and scary. The vision also came from the desire to travel while
              having little to no knowledge on the trips distance or cost.
              Backpack, if not an actual trip gives you an insight on different
              parts of the world and what a trip to those places would look like
              litterally and figuratively. If we fail at helping you plan your
              next trip, we will at least give you an idea of what your next
              trip may or may not look like.
              <br />
              <br />
              <p style={{ textAlign: "center" }}>
                Let's get started. Click the button below to find your next
                trip!
              </p>
              <ButtonToolbar style={{ justifyContent: "center" }}>
                <ButtonGroup>
                  <Button href="/travel">Get Started</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          </p>
        </Row>
      </Container>
    </>
  );
}

export default Body;
