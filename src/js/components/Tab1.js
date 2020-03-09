import React, { useContext } from 'react';
import AppContext from '../functions/AppContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map';
import keys from 'lodash/keys';
import calculateDepartmentUsageBillingTotal from '../functions/calculateDepartmentUsageBillingTotal';
import calculateDepartmentPoQuantity from '../functions/calculateDepartmentPoQuantity';
import calculateDepartmentPoValue from '../functions/calculateDepartmentPoValue';
import calculateDepartmentInvoiceQuantity from '../functions/calculateDepartmentInvoiceQuantity';
import calculateDepartmentInvoiceValue from '../functions/calculateDepartmentInvoiceValue';
import formatMoney from '../functions/utilities'

function Tab1() {
    const { tree, product } = useContext(AppContext);
    const currentDepartments = tree.value[product.value].departments;

    return (
        <Container>
            {map(currentDepartments,(department) => {
                const billingAmount = calculateDepartmentUsageBillingTotal(department);
                const invoiceAmount = calculateDepartmentInvoiceValue(department);
                const outstanding = billingAmount - invoiceAmount;
                return (
                    <Row>
                        <Col xs={3}>{department.DepartmentName}</Col>
                        <Col>{keys(department.services).length}</Col>
                        <Col>{calculateDepartmentPoQuantity(department)}</Col>
                        <Col>{formatMoney(calculateDepartmentPoValue(department))}</Col>
                        <Col>{formatMoney(billingAmount)}</Col>
                        <Col>{calculateDepartmentInvoiceQuantity(department)}</Col>
                        <Col>{formatMoney(invoiceAmount)}</Col>
                        <Col>{formatMoney(outstanding)}</Col>
                    </Row>
                )
            })}
        </Container>
    )
}

export default Tab1;