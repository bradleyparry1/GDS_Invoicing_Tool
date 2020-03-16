import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import InvoiceCharacteristicSelect from './InvoiceCharacteristicSelect';
import formatMoney from '../functions/utilities';

function ForActionToolbar(props){
    const { contacts, setInvoiceContact, pos, setInvoicePo, invoiceAmount, createInvoice, invoicePeriod, submitting, invoiceUsageItemKeys } = props;
    return (
        <>
            <Row>
                <Col>
                    <InvoiceCharacteristicSelect 
                        characteristic={'Contact'} 
                        options={contacts} 
                        displayCharacteristic={'ContactName'} 
                        updateFunction={setInvoiceContact} 
                    />
                </Col>
                <Col>
                    <InvoiceCharacteristicSelect 
                        characteristic={'PO'} 
                        options={pos} 
                        displayCharacteristic={'PONumber'} 
                        updateFunction={setInvoicePo} 
                    />
                </Col>
                <Col>{formatMoney(invoiceAmount)}</Col>
                <Col>
                    <Button onClick={createInvoice} disabled={submitting || invoiceUsageItemKeys.length === 0}>
                        {submitting ? 
                            <>
                                <Spinner animation="border" variant="light" size="sm"/>
                                <span style={{'marginLeft':'10px'}}>Creating Invoice</span>
                            </>
                         : "Create Invoice"}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={2}>Period:</Col>
                <Col xs={10}>{invoicePeriod.join(", ")}</Col>
            </Row>
        </>
    )
}

export default ForActionToolbar;