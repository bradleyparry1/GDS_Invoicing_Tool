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
            <Row className='mt-3'>
                <Col lg='4'>
                    <InvoiceCharacteristicSelect 
                        characteristic={'Contact'} 
                        options={contacts} 
                        displayCharacteristic={'ContactName'} 
                        updateFunction={setInvoiceContact} 
                    />
                </Col>
                <Col lg='3'>
                    <InvoiceCharacteristicSelect 
                        characteristic={'PO'} 
                        options={pos} 
                        displayCharacteristic={'PONumber'} 
                        updateFunction={setInvoicePo} 
                    />
                </Col>
                <Col lg='3' className='col-form-label'><b>Invoice Amount:</b></Col>
                <Col lg='2' className='col-form-label'>{formatMoney(invoiceAmount)}</Col>
            </Row>
            <Row className='for-action-group-bottom'>
                <Col xs={2} className='col-form-label'><b>Period:</b></Col>
                <Col xs={6} className='col-form-label'>{invoicePeriod.join(", ")}</Col>
                <Col xs={4}>
                    <Button className='full-width' onClick={createInvoice} disabled={submitting || invoiceUsageItemKeys.length === 0}>
                        {submitting ? 
                            <>
                                <Spinner animation="border" variant="light" size="sm"/>
                                <span style={{'marginLeft':'10px'}}>Creating Invoice</span>
                            </>
                         : "Create Invoice"}
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default ForActionToolbar;