import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InvoiceCharacteristicSelect from './InvoiceCharacteristicSelect';
import CreateInvoiceButton from './CreateInvoiceButton';
import formatMoney from '../functions/utilities';

function ForActionToolbar(props){
    const { 
        contacts, 
        setInvoiceContact, 
        pos, 
        setInvoicePo, 
        invoicePo, 
        invoiceAmount, 
        createInvoiceEmail, 
        createInvoiceBulk,
        invoicePeriod, 
        submitting, 
        invoiceUsageItemKeys, 
        invoiceContact 
    } = props;

    const addOptionsToPos = (pos) => {
        const options = {...pos}
        options.GPC = {PONumber: 'GPC', ID: 'GPC'}
        options.Not = {PONumber: 'Not Required', ID: 'Not Required'}
        options.Co = {PONumber: 'CO Journal', ID: 'CO Journal'}
        return options;
    }

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
                        options={addOptionsToPos(pos)} 
                        displayCharacteristic={'PONumber'} 
                        updateFunction={setInvoicePo} 
                    />
                </Col>
                <Col lg='5'>
                    <Row>
                        <Col sm='5' className='col-form-label'><b>Invoice Amount:</b></Col>
                        <Col sm='7' className='col-form-label'>{formatMoney(invoiceAmount)}</Col>
                    </Row>
                </Col>
            </Row>
            <Row className='for-action-group-bottom'>
                <Col xs={2} className='col-form-label my-auto'><b>Period:</b></Col>
                <Col xs={4} className='col-form-label my-auto'>{invoicePeriod.join(", ")}</Col>
                <Col xs={6}>
                    <CreateInvoiceButton 
                        createInvoiceEmail={createInvoiceEmail} 
                        createInvoiceBulk={createInvoiceBulk}
                        disabled={submitting || invoiceUsageItemKeys.length === 0 || !invoiceContact}
                        submitting={submitting}
                        invoicePo={invoicePo}
                         />
                </Col>
            </Row>
        </>
    )
}

export default ForActionToolbar;