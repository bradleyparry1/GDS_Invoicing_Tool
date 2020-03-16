import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';

import Contact from './Contact';

import { getDepartmentCharateristics } from '../functions/departmentFunctions';

function UsageSection(props) {
    const { department } = props;
    const contacts = getDepartmentCharateristics(department,'contacts');

    return (
        <Alert variant={'dark'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h4>Contacts</h4>
                    </Col>
                </Row>
                {map(contacts,(contact) => {
                    return (
                        <Row>
                            <Contact contact={contact} />
                        </Row>
                    )
                })}

            </Container>
        </Alert>
    )
}

export default UsageSection;