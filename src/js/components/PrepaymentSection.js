import React, { useState } from 'react';
import Prepayment from './Prepayment';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import map from 'lodash/map';

function PrepaymentSection(props) {
    const { department, tree, product } = props;
    const { prepayments, services } = department;
    const [showNewForm, setShowNewForm] = useState(false);
    
    const updatePrepayment = (updateObject) => {
        const newTree = {...tree.value};
        newTree[product.value].departments[department.ID].prepayments[updateObject.ID] = updateObject;
        tree.updateFunction(newTree);
        setShowNewForm(false);
    }

    const deletePrepayment = (prepaymentId) => {
        const newTree = {...tree.value};
        delete newTree[product.value].departments[department.ID].prepayments[prepaymentId];
        tree.updateFunction(newTree);
        setShowNewForm(false);
    }

    const getPrepaymentServiceNames = (serviceIds) => {
        const parsedServiceIds =  JSON.parse(serviceIds);
        return map(parsedServiceIds,(serviceId) => {
            return department.services[serviceId].ServiceName;
        })
    }

    const toggleNewForm = () => {
        setShowNewForm(!showNewForm);
    }

    return (
        <Alert variant={'success'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h4>Prepayments</h4>
                    </Col>
                </Row>
                {map(prepayments,(prepayment) => {
                    const serviceNames = getPrepaymentServiceNames(prepayment.ServiceIDs);
                    return (
                        <Prepayment 
                            key={prepayment.id} 
                            prepayment={prepayment} 
                            serviceNames={serviceNames}
                            new={false} 
                            updatePrepayment={updatePrepayment} 
                            deletePrepayment={deletePrepayment} 
                            services={services}
                        />
                    )
                })}
                {showNewForm ? 
                <Prepayment 
                    prepayment={{}} 
                    new={true} 
                    departmentId={department.ID} 
                    updatePrepayment={updatePrepayment} 
                    deletePrepayment={deletePrepayment} 
                    setShowNewForm={setShowNewForm}
                    services={services}
                />
                :
                    <Row className='prepayment'>
                        <Col sm='3'></Col>
                        <Col sm='6'>
                            <Button variant='success' onClick={toggleNewForm} className='full-width'>Add New Prepayment</Button>
                        </Col>
                    </Row>
                }
            </Container>
        </Alert>
    )
}

export default PrepaymentSection;