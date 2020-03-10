import React from 'react';
import { calculateServiceUsageBillingTotal } from '../functions/serviceFunctions';
import { calculateDepartmentUsageBillingTotal } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map';

function ServiceList(props){
    const { department } = props;
    const { services } = department;
    const departmentBillingTotal = calculateDepartmentUsageBillingTotal(department);

    return (
        <>
            <Row className={'mb-3'}>
                <Col xs={6}><h5>Services</h5></Col>
                <Col xs={6}><h5>Total Usage</h5></Col>
            </Row>
            {map(services,(service) => {
                const serviceBillingTotal = calculateServiceUsageBillingTotal(service);
                return (
                    <Row>
                        <Col xs={6}>{service.ServiceName}</Col>
                        <Col xs={6}>{formatMoney(serviceBillingTotal)}</Col>
                    </Row>
                )
            })}
            <Row>
                <Col xs={6}><b>Total</b></Col>
                <Col xs={6}><b>{formatMoney(departmentBillingTotal)}</b></Col>
            </Row>
        </>
    )
}

export default ServiceList;