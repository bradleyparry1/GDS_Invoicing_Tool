import React, { useContext } from "react";
import AppContext from "../views/AppContext";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Scorecard(props) {
  const {
    fy: { value: fy },
  } = useContext(AppContext);
  return (
    <Alert variant={props.variant}>
      <Container>
        <Row>
          <Col className="text-center">
            <h5>
              {" "}
              {fy} {props.title}
            </h5>
          </Col>
        </Row>
        <Row className="text-center">
          <Col className={"scorecard"}>{props.value}</Col>
        </Row>
      </Container>
    </Alert>
  );
}

export default Scorecard;
