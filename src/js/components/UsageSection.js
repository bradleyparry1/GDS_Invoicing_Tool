import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';

import { 
    calculateDepartmentUsageBillingTotal,
    calculateDepartmentInvoiceValue
 } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function UsageSection(props) {
    const { department } = props;
    
    const billingAmount = calculateDepartmentUsageBillingTotal(department);
    const invoiceAmount = calculateDepartmentInvoiceValue(department);
    const outstanding = billingAmount - invoiceAmount;

    return (
        <Alert variant={'danger'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h5>Billing</h5>
                    </Col>
                </Row>
                <Row className='text-center mb-2'>
                    <Col><b>Total Amount To Bill</b></Col>
                    <Col><b>Total Amount Invoiced</b></Col>
                    <Col><b>Outstanding</b></Col>
                </Row>
                <Row className='text-center'>
                    <Col>{formatMoney(billingAmount)}</Col>
                    <Col>{formatMoney(invoiceAmount)}</Col>
                    <Col>{formatMoney(outstanding)}</Col>
                </Row>
                

            </Container>
        </Alert>
    )
}

export default UsageSection;