import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import map from "lodash/map";
import { formatDate } from "../functions/utilities";
import { v4 as uuidv4 } from "uuid";

function Invoice(props) {
  const {
    invoice,
    departmentId,
    updateInvoice,
    setShowNewForm,
    serviceNames,
    contactEmail,
    deleteInvoice,
  } = props;
  const [editMode, setEditMode] = useState(props.new);
  const [submitting, setSubmitting] = useState(false);

  const editInvoice = () => {
    setEditMode(!editMode);
    if (props.new) {
      setShowNewForm(false);
    }
  };

  const deleteInvoiceHandler = () => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      setSubmitting(true);
      google.script.run
        .withSuccessHandler(() => {
          deleteInvoice(invoice.ID);
          setSubmitting(false);
        })
        .withFailureHandler((msg) => {
          alert(msg);
          setSubmitting(false);
        })
        .deleteInvoice(invoice.ID);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitting(true);
    const form = event.currentTarget;
    const updateObject = {};
    for (var i = 0; i < form.length - 1; i++) {
      if (form[i].name) {
        updateObject[form[i].name] = form[i].value;
      }
    }

    const options = {
      updateObject,
    };

    options.criteriaObject = { ID: invoice.ID };
    options.updateObject.ID = invoice.ID;
    options.updateObject.DepartmentID = departmentId;

    options.updateObject.Periods = JSON.stringify(
      options.updateObject.Periods.split(", ")
    );
    const type = props.new ? "create" : "update";

    google.script.run
      .withSuccessHandler(() => {
        updateInvoice(options.updateObject);
        setEditMode(false);
        setSubmitting(false);
      })
      .withFailureHandler((msg) => {
        alert(msg);
        setSubmitting(false);
      })
      .crud(type, "invoicingTool", "Invoices", options);
  };

  return (
    <Form onSubmit={handleSubmit} className="invoice">
      <Form.Group as={Row} controlId={`invoicenumber${invoice.ID}`}>
        <Form.Label column sm="4">
          <b>Invoice Number:</b>
        </Form.Label>
        <Col sm="5">
          <Form.Control
            name="InvoiceNumber"
            plaintext={!editMode || submitting}
            readOnly={!editMode || submitting}
            placeholder="Missing"
            defaultValue={invoice.InvoiceNumber}
          />
        </Col>
        <Col sm="3">
          <Button
            variant="secondary"
            size="sm"
            onClick={editInvoice}
            className="full-width"
            disabled={submitting}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId={`amount${invoice.ID}`}>
        <Form.Label column sm="4">
          <b>Amount (£):</b>
        </Form.Label>
        <Col sm="8">
          <Form.Control
            name="Amount"
            plaintext={true}
            readOnly={true}
            placeholder="Amount"
            defaultValue={Number(invoice.Amount).toFixed(2)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId={`period${invoice.ID}`}>
        <Form.Label column sm="4">
          <b>Period:</b>
        </Form.Label>
        <Col sm="8">
          <Form.Control
            name="Periods"
            plaintext={true}
            readOnly={true}
            placeholder="Period"
            defaultValue={
              invoice.Periods ? JSON.parse(invoice.Periods).join(", ") : ""
            }
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId={`services${invoice.ID}`}>
        <Form.Label column sm="4">
          <b>Services:</b>
        </Form.Label>
        <Col sm="8">
          {map(serviceNames, (serviceName) => {
            return (
              <>
                <span className="fake-input">{serviceName}</span>
                <br />
              </>
            );
          })}
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId={`contact${invoice.ID}`}>
        <Form.Label column sm="4">
          <b>Contact Email:</b>
        </Form.Label>
        <Col sm="8">
          <span className="fake-input">{contactEmail}</span>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId={`date${invoice.ID}`}>
        <Form.Label column sm="4">
          <b>Created At:</b>
        </Form.Label>
        <Col sm="8">
          <span className="fake-input">
            {formatDate(new Date(invoice.CreatedAt))}
          </span>
        </Col>
      </Form.Group>

      {editMode ? (
        <Row>
          <Col sm="4"></Col>
          <Col sm="8">
            <ButtonGroup aria-label="Invoice Update" className="full-width">
              <Button
                disabled={submitting}
                variant="primary"
                size="sm"
                type="submit"
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" variant="light" size="sm" />
                    <span style={{ marginLeft: "10px" }}>Updating</span>
                  </>
                ) : props.new ? (
                  "Submit Invoice"
                ) : (
                  "Submit Update"
                )}
              </Button>
              {props.new ? (
                ""
              ) : (
                <Button
                  disabled={submitting}
                  variant="danger"
                  size="sm"
                  onClick={deleteInvoiceHandler}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </Form>
  );
}

export default Invoice;
