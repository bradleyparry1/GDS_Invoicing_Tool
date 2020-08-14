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
        const oldObject = newTree[product.value].departments[department.ID].invoices[updateObject.ID];
        
        updateObject.ServiceIDs = oldObject.ServiceIDs;
        updateObject.ContactID = oldObject.ContactID;
        updateObject.CreatedAt = oldObject.CreatedAt;
        newTree[product.value].departments[department.ID].invoices[updateObject.ID] = updateObject;
        tree.updateFunction(newTree);
    }

    const deleteInvoice = (invoiceId) => {
        const newTree = {...tree.value};
        delete newTree[product.value].departments[department.ID].inovices[invoiceId];
        tree.updateFunction(newTree);
    }

    const getInvoiceServiceNames = (serviceIds) => {
        const parsedServiceIds =  JSON.parse(serviceIds);
        return map(parsedServiceIds,(serviceId) => {
            return department.services[serviceId].ServiceName;
        })
    }

    const getInvoiceContactEmail = (contactId) => {
        return department.contacts[contactId].Email;
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
                    const serviceNames = getInvoiceServiceNames(invoice.ServiceIDs);
                    const contactEmail = getInvoiceContactEmail(invoice.ContactID);
                    return (
                        <Invoice 
                            key={invoice.id} 
                            invoice={invoice} 
                            serviceNames={serviceNames}
                            contactEmail={contactEmail}
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