import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getDepartmentCharateristics } from '../functions/departmentFunctions';

import ForActionsItemsList from './ForActionItemsList'
import ForActionToolbar from './ForActionToolbar'

function ForActionTable(props) {
    const { department } = props;
    const usage = getDepartmentCharateristics(department,'usage');
    const contacts = getDepartmentCharateristics(department,'contacts');
    const pos = getDepartmentCharateristics(department,'pos');

    const [invoiceContact,setInvoiceContact] = useState(contacts[0].ID);
    const [invoicePo,setInvoicePo] = useState(pos[0].ID);
    const [invoiceAmount,setInvoiceAmount] = useState(0);
    
    const updateInvoice = (e,usageItem) => {
        let newInvoiceAmount = 0;
        if(e.target.checked){
            newInvoiceAmount = invoiceAmount + usageItem.totalcost;
        } else {
            newInvoiceAmount = invoiceAmount - usageItem.totalcost;
        }
        setInvoiceAmount(newInvoiceAmount);
    }

    const createInvoice = () => {
        const newInvoice = {
            ID: "",
            ServiceIDs: "",
            POID: invoicePo,
            InvoiceNumber: "",
            Amount: invoiceAmount,
            Months: ""
        }
        google.script.run.crud('create','invoiceTool','Invoices',{updateObject: newInvoice });
    }

    return (
        <Row>
            <Col>
                <Alert variant='success'>
                    <Container>
                        <Row>
                            <Col className='text-center'>
                                <h4>For Action</h4>
                            </Col>
                        </Row>
                        <ForActionToolbar 
                            contacts={contacts} 
                            setInvoiceContact={setInvoiceContact}
                            pos={pos}
                            setInvoicePo={setInvoicePo}
                            invoiceAmount={invoiceAmount}
                            createInvoice={createInvoice}
                        />
                        <Row>
                            <Col>
                                <ForActionsItemsList 
                                    usage={usage} 
                                    updateInvoice={updateInvoice}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Alert>
            </Col>
        </Row>
    )
}

export default ForActionTable;