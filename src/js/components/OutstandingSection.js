import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { 
    calculateDepartmentUsageBillingTotal,
    calculateDepartmentInvoiceValue
 } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function OutstandingSection(props) {
    const { department } = props;
    
    const billingAmount = calculateDepartmentUsageBillingTotal(department);
    const invoiceAmount = calculateDepartmentInvoiceValue(department);
    const outstanding = billingAmount - invoiceAmount;

    return (
        <Alert variant={outstanding === 0 ? 'success' : 'danger'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h5>Outstanding Amount</h5>
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Col>{formatMoney(outstanding)}</Col>
                </Row>
            </Container>
        </Alert>
    )
}

export default OutstandingSection;