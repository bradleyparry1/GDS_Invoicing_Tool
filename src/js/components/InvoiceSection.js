import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';

function InvoiceSection(props) {
    const { department } = props;
    const { invoices } = department;

    return (
        <Alert variant={'success'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h5>Invoices</h5>
                    </Col>
                </Row>
                

            </Container>
        </Alert>
    )
}

export default InvoiceSection;