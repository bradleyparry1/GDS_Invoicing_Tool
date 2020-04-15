import React from 'react';
import { calculateServiceUsageBillingTotal } from '../functions/serviceFunctions';
import { calculateDepartmentUsageBillingTotal } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import Container from 'react-bootstrap/Container';
import { getDepartmentCharateristics } from '../functions/departmentFunctions';

function ServiceList(props){
    const { department } = props;
    const { services } = department;
    const departmentBillingTotal = calculateDepartmentUsageBillingTotal(department);
    const usage = getDepartmentCharateristics(department,'usage');

    const orderServices = (services) => {
        return reverse(sortBy(services,service => calculateServiceUsageBillingTotal(service)));
    }

    const orderedServices = orderServices(services);
    const orderedUsage = usage.sort((a,b) => {
        return a.Period === b.Period ? 0 : a.Period < b.Period ? 1 : -1;
    })

    return (
        <Alert variant='secondary'>
            <Container>
                <Row>
                    <Col className='text-center'><h4>Usage</h4></Col>
                </Row>
                <Row className={'mt-5 mb-3'}>
                    <Col className={'text-center'}><h5>Service Summary</h5></Col>
                </Row>
                <Row>
                    <Col xs={8}><b>Service</b></Col>
                    <Col xs={4} className={'text-center'}><b>Total Usage</b></Col>
                </Row>
                <Row>
                    <Col>
                        <Container className='usage-window'>
                            {map(orderedServices,(service) => {
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
                        </Container>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={8}><b>Total</b></Col>
                    <Col xs={4} className={'text-center'}>
                        <b>{formatMoney(departmentBillingTotal)}</b>
                    </Col>
                </Row>
                
            </Container>
        </Alert>
    )
}


/*


<Row className={'mt-5 mb-3'}>
                    <Col className={'text-center'}><h5>All usage items</h5></Col>
                </Row>
                <Row>
                    <Col xs={2}><b>Period</b></Col>
                    <Col xs={6}><b>Service</b></Col>
                    <Col xs={4} className={'text-center'}><b>Total Usage</b></Col>
                </Row>
                <Row>
                    <Col>
                        <Container className='usage-window'>
                            {map(orderedUsage,usageItem => {
                                return (
                                    <Row className={'mb-3'}>
                                        <Col xs={2}>{usageItem.Period}</Col>
                                        <Col xs={6}>{usageItem.service_name}</Col>
                                        <Col xs={4} className={'text-center'}>{formatMoney(usageItem.totalcost)}</Col>
                                    </Row>
                                )
                            })}
                        </Container>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={2}></Col>
                    <Col xs={6}><b>Total</b></Col>
                    <Col xs={4} className={'text-center'}>
                        <b>{formatMoney(departmentBillingTotal)}</b>
                    </Col>
                </Row>


*/

export default ServiceList;