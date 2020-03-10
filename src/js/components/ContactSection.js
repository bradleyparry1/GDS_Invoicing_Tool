import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';

import { getDepartmentCharateristics } from '../functions/departmentFunctions';

function UsageSection(props) {
    const { department } = props;
    const contacts = getDepartmentCharateristics(department,'contacts');
    
    console.log(contacts)

    return (
        <Alert variant={'dark'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h5>Contact</h5>
                    </Col>
                </Row>
                {map(contacts,(contact) => {
                    return (
                        <Row>
                            <Col>{contact.Email}</Col>
                        </Row>
                    )
                })}

            </Container>
        </Alert>
    )
}

export default UsageSection;