import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';


function ServiceList(props){
    const { services } = props;
    return (
        <>
            <Row>
                <Col><h5>Services</h5></Col>
            </Row>
            {map(services,(service) => {
                return (
                    <Row>
                        <Col>{service.ServiceName}</Col>
                    </Row>
                )
            })}
        </>
    )
}

export default ServiceList;