import React, { useContext } from 'react';
import AppContext from '../views/AppContext'
import Scorecard from './Scorecard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {formatMoney} from '../functions/utilities';
import { 
    calculateProductTotalAmountInvoiced, 
    calculateProductTotalBillingAmount,
    calculateProductTotalAmountPrepaid,
    calculateProductTotalAmountPrepaidUsed
} from '../functions/productFunctions';

function DepartmentStats(){
    const { product, tree } = useContext(AppContext);
    const productData = tree.value[product.value];

    const billingAmount = calculateProductTotalBillingAmount(productData);
    const invoiceAmount = calculateProductTotalAmountInvoiced(productData);

    //const prepaidAmount = calculateProductTotalAmountPrepaid(productData);
    const prepaidAmountUsed = calculateProductTotalAmountPrepaidUsed(productData);

    const outstanding = billingAmount - invoiceAmount - prepaidAmountUsed;

    return (
        <Row>
            <Col>
                <Scorecard 
                    variant={'dark'}
                    title={"Usage Value"}
                    value={formatMoney(billingAmount)}
                />
            </Col>
            <Col>
                <Scorecard 
                    variant={'success'}
                    title={"Invoiced / Prepaid"}
                    value={formatMoney(invoiceAmount + prepaidAmountUsed)}
                />
            </Col>
            <Col>
                <Scorecard 
                    variant={outstanding > 0 ? 'danger' : 'success'}
                    title={"Outstanding"}
                    value={formatMoney(outstanding)}
                />
            </Col>
        </Row>
    )
}

export default DepartmentStats;