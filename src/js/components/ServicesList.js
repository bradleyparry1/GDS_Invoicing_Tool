import React from 'react';
import { calculateServiceUsageBillingTotal } from '../functions/serviceFunctions';
import { calculateDepartmentUsageBillingTotal } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map';
import Container from 'react-bootstrap/Container';

function ServiceList(props){
    const { department } = props;
    const { services } = department;
    const departmentBillingTotal = calculateDepartmentUsageBillingTotal(department);

    return (
        <Alert variant='secondary'>
            <Container>
                <Row>
                    <Col xs={8}><b>Services Summary</b></Col>
                    <Col xs={4} className={'text-center'}><b>Total Usage</b></Col>
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
                <Row>
                    <Col xs={8}><b>Total</b></Col>
                    <Col xs={4} className={'text-center'}>
                        <b>{formatMoney(departmentBillingTotal)}</b>
                    </Col>
                </Row>
            </Container>
        </Alert>
    )
}

export default ServiceList;