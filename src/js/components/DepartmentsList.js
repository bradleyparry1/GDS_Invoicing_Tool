import React, { useContext } from 'react';
import AppContext from '../functions/AppContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map';
import keys from 'lodash/keys';
import {
    calculateDepartmentUsageBillingTotal,
    calculateDepartmentPoQuantity,
    calculateDepartmentPoValue,
    calculateDepartmentInvoiceQuantity,
    calculateDepartmentInvoiceValue
    } from '../functions/departmentFunctions';

import formatMoney from '../functions/utilities'

function DepartmentsList() {
    const { tree, product, department } = useContext(AppContext);
    const currentDepartments = tree.value[product.value].departments;
    
    const viewDepartment = (departmentId) => {
        department.updateFunction(departmentId);
    }

    return (
        <Container>
            {map(currentDepartments,(department) => {
                const billingAmount = calculateDepartmentUsageBillingTotal(department);
                const invoiceAmount = calculateDepartmentInvoiceValue(department);
                const outstanding = billingAmount - invoiceAmount;
                return (
                    <Row>
                        <Col xs={3}>
                            <Button variant='link' onClick={() => viewDepartment(department.ID)}>
                                {department.DepartmentName}
                            </Button>
                        </Col>
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

export default DepartmentsList;