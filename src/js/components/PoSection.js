import React, { useState } from 'react';
import Po from './Po';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import map from 'lodash/map';

function PoSection(props) {
    const { department, tree, product } = props;
    const { pos, services } = department;

    const [showNewForm, setShowNewForm] = useState(false);

    const toggleNewForm = () => {
        setShowNewForm(!showNewForm);
    }

    const updatePo = (updateObject) => {
        const newTree = {...tree.value};
        newTree[product.value].departments[department.ID].pos[updateObject.ID] = updateObject;
        tree.updateFunction(newTree);
        setShowNewForm(false);
    }

    const deletePo = (poId) => {
        const newTree = {...tree.value};
        delete newTree[product.value].departments[department.ID].pos[poId];
        tree.updateFunction(newTree);
        setShowNewForm(false);
    }

    return (
        <Alert variant={'primary'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h4>POs</h4>
                    </Col>
                </Row>
                {map(pos,(po) => {
                    return (
                        <Po 
                            key={po.id} 
                            po={po} 
                            new={false} 
                            updatePo={updatePo} 
                            deletePo={deletePo} 
                            setShowNewForm={setShowNewForm}
                            services={services}
                        />
                    )
                })}
                {showNewForm ? 
                <Po 
                    po={{}} 
                    new={true} 
                    departmentId={department.ID} 
                    updatePo={updatePo} 
                    deletePo={deletePo} 
                    setShowNewForm={setShowNewForm}
                    services={services}
                />
                :
                    <Row className='po'>
                        <Col sm='3'></Col>
                        <Col sm='6'>
                            <Button variant='success' onClick={toggleNewForm} className='full-width'>Add New PO</Button>
                        </Col>
                    </Row>
                }

            </Container>
        </Alert>
    )
}

export default PoSection;