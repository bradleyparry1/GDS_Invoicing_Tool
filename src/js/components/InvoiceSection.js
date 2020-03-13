import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { calculateDepartmentInvoiceValue } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function InvoiceSection(props) {
    const { department } = props;
    const invoiceAmount = calculateDepartmentInvoiceValue(department);

    return (
        <Alert variant={'success'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h5>Total Amount Invoiced</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>{formatMoney(invoiceAmount)}</Col>
                </Row>
            </Container>
        </Alert>
    )
}

export default InvoiceSection;