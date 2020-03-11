import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';

import { getDepartmentCharateristics } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function InvoiceSection(props) {
    const { department } = props;
    const invoices = getDepartmentCharateristics(department,'invoices');

    return (
        <Alert variant={'success'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h4>Invoices</h4>
                    </Col>
                </Row>
                {map(invoices,(invoice) => {
                    return (
                        <Row>
                            <Col>{formatMoney(invoice.Amount)}</Col>
                        </Row>
                    )
                })}
            </Container>
        </Alert>
    )
}

export default InvoiceSection;