import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import map from 'lodash/map';
import values from 'lodash/values';
import formatMoney from '../functions/utilities';

function ForActionsItemsList(props){
    const { usage, updateInvoice, submitting } = props;

    const sortedUsage = values(usage).sort((a,b) => {
        return a.Period === b.Period ? 0 : a.Period > b.Period ? 1 : -1;
    })

    return (
        <>
            <Container className='mt-2'>
                <Row>
                    <Col xs={2} className='text-center'><b>Period</b></Col>
                    <Col xs={4}><b>Service</b></Col>
                    <Col xs={3} className='text-center'><b>Billing Amount</b></Col>
                    <Col xs={3}></Col>
                </Row>
            </Container>
            <Container className='action-window'>
                {map(sortedUsage,(usageItem) => {
                    return (
                        <Row key={usageItem.ID}>
                            <Col xs={2} className='text-center'>{usageItem.Period}</Col>
                            <Col xs={4}>{usageItem.service_name}</Col>
                            <Col xs={3} className='text-center'>{formatMoney(usageItem.totalcost)}</Col>
                            <Col xs={3}>
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
        </>
    )
}

export default ForActionsItemsList;