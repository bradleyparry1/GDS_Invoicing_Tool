import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import map from "lodash/map";
import values from "lodash/values";
import { formatMoney } from "../functions/utilities";

function ForActionsItemsList(props) {
  const { usage, updateInvoice, submitting, updatePrepayment } = props;

  const [prepaymentSubmitting, setPrepaymentSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);

  const sortedUsage = values(usage)
    .sort((a, b) => {
      return a.service_name === b.service_name
        ? 0
        : a.service_name > b.service_name
        ? 1
        : -1;
    })
    .sort((a, b) => {
      const aTime = a.EndDate.getTime();
      const bTime = b.EndDate.getTime();
      return aTime === bTime ? 0 : aTime > bTime ? 1 : -1;
    });
  const prepayUsageItem = (usageItem) => {
    setPrepaymentSubmitting(true);
    google.script.run
      .withFailureHandler(() => {})
      .withSuccessHandler(() => {
        updatePrepayment(usageItem);
        setPrepaymentSubmitting(false);
      })
      .crud("update", "invoiceTool", "Notify Usage Data", {
        updateObject: {
          PrepaymentID: usageItem.PrepaymentID,
          PrepaymentAmount: usageItem.potentialPrepaymentAmount,
        },
        criteriaObject: { ID: usageItem.ID },
      });
  };

  const checkBoxClick = (e, usageItem) => {
    setChecked(e.target.checked);
    updateInvoice(e, usageItem);
  };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col xs={1} className="text-center">
            <b>Period</b>
          </Col>
          <Col xs={3}>
            <b>Service</b>
          </Col>
          <Col xs={3} className="text-center">
            <b>Billing Amount</b>
          </Col>
          <Col xs={5}></Col>
        </Row>
      </Container>
      <Container className="action-window">
        {map(sortedUsage, (usageItem) => {
          return (
            <Row key={usageItem.ID}>
              <Col xs={1} className="text-center">
                {usageItem.Period}
              </Col>
              <Col xs={3}>{usageItem.service_name}</Col>
              <Col xs={3} className="text-center">
                {formatMoney(usageItem.displayInvoiceAmount)}
              </Col>
              <Col xs={3}>
                {usageItem.InvoiceID ? (
                  ""
                ) : (
                  <Form.Group controlId={usageItem.ID}>
                    <Form.Check
                      onClick={(e) => checkBoxClick(e, usageItem)}
                      type="checkbox"
                      label="Include in invoice"
                      disabled={submitting || prepaymentSubmitting}
                    />
                  </Form.Group>
                )}
              </Col>
              <Col xs={2}>
                {usageItem.PrepaymentAvailable ? (
                  <Button
                    onClick={() => prepayUsageItem(usageItem)}
                    variant="success"
                    disabled={prepaymentSubmitting || checked}
                  >
                    {prepaymentSubmitting ? (
                      <Spinner animation="border" variant="light" size="sm" />
                    ) : (
                      "Prepay"
                    )}
                  </Button>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          );
        })}
      </Container>
    </>
  );
}

export default ForActionsItemsList;
