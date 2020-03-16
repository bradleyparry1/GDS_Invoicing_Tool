import React, { useContext } from 'react';
import AppContext from '../views/AppContext'
import Scorecard from './Scorecard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import formatMoney from '../functions/utilities';
import { calculateProductTotalAmountInvoiced, calculateProductTotalBillingAmount } from '../functions/productFunctions';

function DepartmentStats(){
    const { product, tree } = useContext(AppContext);
    const productData = tree.value[product.value];

    const billingAmount = calculateProductTotalBillingAmount(productData);
    const invoiceAmount = calculateProductTotalAmountInvoiced(productData);
    const outstanding = billingAmount - invoiceAmount;

    return (
        <Row>
            <Col>
                <Scorecard 
                    variant={'dark'}
                    title={"Total Amount To Bill"}
                    value={formatMoney(billingAmount)}
                />
            </Col>
            <Col>
                <Scorecard 
                    variant={'success'}
                    title={"Total Amount Invoiced"}
                    value={formatMoney(invoiceAmount)}
                />
            </Col>
            <Col>
                <Scorecard 
                    variant={outstanding > 0 ? 'danger' : 'success'}
                    title={"Amount Outstanding"}
                    value={formatMoney(outstanding)}
                />
            </Col>
        </Row>
    )
}

export default DepartmentStats;