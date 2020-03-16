import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import map from 'lodash/map';
import formatMoney from '../functions/utilities';

function ForActionsItemsList(props){
    const { usage, updateInvoice, submitting } = props;
    return (
        <Container className='action-window'>
            {map(usage,(usageItem) => {
                return (
                    <Row key={usageItem.ID}>
                        <Col>{usageItem.Period}</Col>
                        <Col>{usageItem.service_name}</Col>
                        <Col>{formatMoney(usageItem.totalcost)}</Col>
                        <Col>
                            {usageItem.InvoiceID ? "" : 
                                <Form.Group controlId={usageItem.ID}>
                                    <Form.Check 
                                        onClick={(e) => updateInvoice(e,usageItem)} 
                                        type="checkbox" 
                                        label="Include in invoice" 
                                        disabled={submitting}
                                    />
                                </Form.Group>
                            }
                        </Col>
                    </Row>
                )
            })}
        </Container>
    )
}

export default ForActionsItemsList;