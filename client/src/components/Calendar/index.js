import React from "react";
import { Container, Row } from "reactstrap";
import "./style.css";

function Calendar(props) {
  return (
    <>
      <Container>
        <Row>
        {props.children}
        </Row>
      </Container>
    </>
  );
}
export default Calendar;
