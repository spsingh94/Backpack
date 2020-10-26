import React from "react";
import { Container, Row, Col } from "reactstrap";
import ImageStack from "../ImageStack";
import "./style.css";
import Indo1 from "../../images/indo1.jpg";
import Indo2 from "../../images/indo2.png";
import Bromo from "../../images/mtbromo.jpg";
import Bali from "../../images/bali.jpg";

function Body() {
  return (
    <>
      <Container>
        <h1 className="body-title">About Us</h1>
        <Row>
          <Col md="6" className="body-column">
            <h5>Our Mission</h5>
            <p className="body-text">
              Our mission was to make backpack traveling less confusing and
              easier. We are aware that at times finding new places to travel
              can be hard and that you just want to leave that front door and
              explore the world. We are here to help you accomplish just that.
              With a few easy steps you can get a destination and air travel
              ticket information and pricing in seconds! We made all the
              difficult stuff easier and faster so that you can do all the fun
              stuff more easily and faster.
            </p>
          </Col>
          <Col md="6">
            <ImageStack src1={Indo2} src2={Indo1} />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <ImageStack src1={Bromo} src2={Bali} />
          </Col>
          <Col md="6">
            <p className="body-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              itaque tenetur laboriosam deserunt dignissimos asperiores impedit
              ratione, fugit odio hic, soluta nemo incidunt non fuga eum quo,
              optio saepe dolor?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem itaque tenetur laboriosam deserunt
              dignissimos asperiores impedit ratione, fugit odio hic, soluta
              nemo incidunt non fuga eum quo, optio saepe dolor?Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Dolorem itaque
              tenetur laboriosam deserunt dignissimos asperiores impedit
              ratione, fugit odio hic, soluta nemo incidunt non fuga eum quo,
              optio saepe dolor?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem itaque tenetur laboriosam deserunt
              dignissimos asperiores impedit ratione, fugit odio hic, soluta
              nemo incidunt non fuga eum quo, optio saepe dolor?Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Dolorem itaque
              tenetur laboriosam deserunt dignissimos asperiores impedit
              ratione, fugit odio hic, soluta nemo incidunt non fuga eum quo,
              optio saepe dolor?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem itaque tenetur laboriosam deserunt
              dignissimos asperiores impedit ratione, fugit odio hic, soluta
              nemo incidunt non fuga eum quo, optio saepe dolor?Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Dolorem itaque
              tenetur laboriosam deserunt dignissimos asperiores impedit
              ratione, fugit odio hic, soluta nemo incidunt non fuga eum quo,
              optio saepe dolor?
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Body;
