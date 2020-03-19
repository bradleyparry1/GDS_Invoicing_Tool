import React from 'react';
import Invoice from './Invoice';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map';

function InvoiceSection(props) {
    const { department, tree, product } = props;
    const { invoices } = department;

    const updateInvoice = (updateObject) => {
        const newTree = {...tree.value};
        newTree[product.value].departments[department.ID].invoices[updateObject.ID] = updateObject;
        tree.updateFunction(newTree);
    }

    const deleteInvoice = (invoiceId) => {
        const newTree = {...tree.value};
        delete newTree[product.value].departments[department.ID].inovices[invoiceId];
        tree.updateFunction(newTree);
    }

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
                        <Invoice 
                            key={invoice.id} 
                            invoice={invoice} 
                            new={false} 
                            updateInvoice={updateInvoice} 
                            deleteInvoice={deleteInvoice} 
                        />
                    )
                })}
            </Container>
        </Alert>
    )
}

export default InvoiceSection;