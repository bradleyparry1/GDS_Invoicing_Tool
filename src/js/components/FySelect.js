import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppContext from "../views/AppContext";
import map from "lodash/map";

function ProductSelect() {
  const appContext = useContext(AppContext);

  const updateFy = (e) => {
    appContext.fy.updateFunction(e.target.value);
  };

  return (
    <Form.Group as={Row} controlId="product-select">
      <Form.Label column sm={6}>
        Financial Year
      </Form.Label>
      <Col sm={6}>
        <Form.Control as="select" onChange={updateFy}>
          {map(appContext.fys.value, (fy) => {
            return <option>{fy}</option>;
          })}
        </Form.Control>
      </Col>
    </Form.Group>
  );
}

export default ProductSelect;
