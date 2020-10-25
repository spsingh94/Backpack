import React from "react";
import { Container, Row, Col } from "reactstrap";
import ImageStack from "../ImageStack";
import "./style.css";
import Indo1 from "../../images/indo1.jpg";
import Indo2 from "../../images/indo2.png";
import pic1 from "../../images/map.jpg";
import pic2 from "../../images/views.jpg";

function Body() {
  return (
    <>
      <Container>
        <h1 className="body-title">About Us</h1>
        <Row>
          <Col md="6" className="body-column">
            <h5>Our Mission</h5>
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
          <Col md="6">
            <ImageStack src1={Indo2} src2={Indo1} />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <ImageStack src1={pic1} src2={pic2} />
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
