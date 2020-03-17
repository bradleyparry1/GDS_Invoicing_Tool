import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import keys from 'lodash/keys';
import { getDepartmentCharateristics } from '../functions/departmentFunctions';

import ForActionsItemsList from './ForActionItemsList';
import ForActionToolbar from './ForActionToolbar';

function ForActionTable(props) {
    let { product, department, tree } = props;
    const usage = getDepartmentCharateristics(department,'usage').filter((usageItem) => {
        return !usageItem.InvoiceID && usageItem.totalcost > 0;
    });
    const contacts = department.contacts;
    const pos = department.pos;
    
    const [invoiceUsageItems, setInvoiceUsageItems] = useState({});

    const [invoicePeriod, setInvoicePeriod] = useState([]);
    const [invoiceServiceIds, setInvoiceServiceIds] = useState([]);
    const [invoiceContact,setInvoiceContact] = useState(contacts[0] ? contacts[0].ID : "");
    const [invoicePo,setInvoicePo] = useState(pos[0] ? pos[0].ID : "");
    const [invoiceAmount,setInvoiceAmount] = useState(0);

    const [submitting,setSubmitting] = useState(false);
    
    useEffect(() => {
        updateInvoiceAmount();
        updateInvoicePeriod();
        updateInvoiceServiceIds();
    },[invoiceUsageItems]);

    const updateInvoiceItems = (e,usageItem) => {
        let newInvoiceUsageItems = {...invoiceUsageItems};
        if(e.target.checked){
            newInvoiceUsageItems[usageItem.ID] = usageItem;
        } else {
            delete newInvoiceUsageItems[usageItem.ID];
        }
        setInvoiceUsageItems(newInvoiceUsageItems);
    }

    const updateInvoiceAmount = () => {
        const newInvoiceAmount = reduce(invoiceUsageItems,(total,usageItem) => {
            total += usageItem.totalcost;
            return total;
        },0);
        setInvoiceAmount(newInvoiceAmount);
    }

    const updateInvoicePeriod = () => {
        const newPeriodArray = reduce(invoiceUsageItems,(periodArray,usageItem) => {
            !periodArray.includes(usageItem.Period) && periodArray.push(usageItem.Period)
            return periodArray;
        },[]);
        setInvoicePeriod(newPeriodArray);
    }

    const updateInvoiceServiceIds = () => {
        const newServiceIdsArray = reduce(invoiceUsageItems,(serviceIdArray,usageItem) => {
            !serviceIdArray.includes(usageItem.service_id) && serviceIdArray.push(usageItem.service_id)
            return serviceIdArray;
        },[]);
        setInvoiceServiceIds(newServiceIdsArray);
    }

    const createInvoice = () => {
        setSubmitting(true)
        const newId = uuidv4();
        const newInvoice = {
            ID: newId,
            DepartmentID: department.ID,
            ServiceIDs: JSON.stringify(invoiceServiceIds),
            POID: invoicePo,
            InvoiceNumber: "",
            Amount: invoiceAmount,
            Months: JSON.stringify(invoicePeriod)
        }

        const usageItemUpdateObject = reduce(invoiceUsageItems, (returnObject,invoiceUsageItem) => {
            returnObject[invoiceUsageItem.ID] = {update: {"InvoiceID": newId}, criteria: {"ID": invoiceUsageItem.ID}}
            return returnObject;
        },{});
        
        google.script.run.withSuccessHandler(() => {
            const newTree = {...tree.value};
            newTree[product.value].departments[department.ID].invoices[newId] = newInvoice;

            map(newTree[product.value].departments[department.ID].services,(service) => {
                map(service.usage,(usageItem) => {
                    if(keys(invoiceUsageItems).includes(usageItem.ID.toString())){
                        newTree[product.value].departments[department.ID].services[service.ID].usage[usageItem.ID].InvoiceID = newId;
                    }
                })
            })

            tree.updateFunction(newTree);
            setInvoiceUsageItems({});
            setSubmitting(false);
        }).withFailureHandler((msg) => {
            alert(msg);
            setSubmitting(false)
        }).createInvoice(newInvoice,usageItemUpdateObject,invoiceContact);
    }

    return (
        
        <Row>
            { usage.length > 0 ? 
            <Col>
                <Alert variant='danger'>
                    <Container>
                        <Row>
                            <Col className='text-center'>
                                <h4>For Action</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ForActionsItemsList 
                                    usage={usage} 
                                    updateInvoice={updateInvoiceItems}
                                    submitting={submitting}
                                />
                            </Col>
                        </Row>
                        <ForActionToolbar 
                            contacts={contacts} 
                            setInvoiceContact={setInvoiceContact}
                            pos={pos}
                            setInvoicePo={setInvoicePo}
                            invoiceAmount={invoiceAmount}
                            createInvoice={createInvoice}
                            invoicePeriod={invoicePeriod}
                            submitting={submitting}
                            invoiceUsageItemKeys={keys(invoiceUsageItems)}
                        />
                    </Container>
                </Alert>
            </Col> : ''}
        </Row> 
    )
}

export default ForActionTable;