import React from 'react';
import { calculateServiceUsageBillingTotal } from '../functions/serviceFunctions';
import { calculateDepartmentUsageBillingTotal } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map';
import Container from 'react-bootstrap/Container';

function ServiceList(props){
    const { department } = props;
    const { services } = department;
    const departmentBillingTotal = calculateDepartmentUsageBillingTotal(department);

    return (
        <Container className={'summary-table'}>
            <Row className={'mb-1 table-header'}>
                <Col xs={8}><h5>Services Summary</h5></Col>
                <Col xs={4} className={'text-center'}><h5>Total Usage</h5></Col>
            </Row>
            {map(services,(service) => {
                const serviceBillingTotal = calculateServiceUsageBillingTotal(service);
                return (
                    <Row className={'mb-3'}>
                        <Col xs={8}>{service.ServiceName}</Col>
                        <Col xs={4} className={'text-center'}>
                            {formatMoney(serviceBillingTotal)}
                        </Col>
                    </Row>
                )
            })}
            <Row className={'top-border'}>
                <Col xs={8}><b>Total</b></Col>
                <Col xs={4} className={'text-center'}>
                    <b>{formatMoney(departmentBillingTotal)}</b>
                </Col>
            </Row>
        </Container>
    )
}

export default ServiceList;