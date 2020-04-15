import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';
import Contact from './Contact';

function ContactSection(props) {
    const { department, tree, product } = props;
    const { contacts, invoices } = department;
    
    const usedContacts = map(invoices,(invoice) => invoice.ContactID);

    const [showNewForm, setShowNewForm] = useState(false);

    const toggleNewForm = () => {
        setShowNewForm(!showNewForm);
    }

    const updateContact = (updateObject) => {
        const newTree = {...tree.value};
        newTree[product.value].departments[department.ID].contacts[updateObject.ID] = updateObject;
        tree.updateFunction(newTree);
        setShowNewForm(false);
    }

    const deleteContact = (contactId) => {
        const newTree = {...tree.value};
        delete newTree[product.value].departments[department.ID].contacts[contactId];
        tree.updateFunction(newTree);
        setShowNewForm(false);
    }

    return (
        <Alert variant={'info'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h4>Contacts</h4>
                    </Col>
                </Row>
                {map(contacts,(contact) => {
                    return (
                        <Contact 
                            key={contact.ID} 
                            contact={contact} 
                            contactUsed={usedContacts.includes(contact.ID)}
                            new={false} 
                            updateContact={updateContact} 
                            deleteContact={deleteContact} 
                            setShowNewForm={setShowNewForm}
                        />
                    )
                })}
                {showNewForm ? 
                <Contact 
                    contact={{}} 
                    new={true} 
                    departmentId={department.ID} 
                    updateContact={updateContact} 
                    deleteContact={deleteContact} 
                    setShowNewForm={setShowNewForm}
                />
                :
                    <Row className='contact'>
                        <Col sm='3'></Col>
                        <Col sm='6'>
                            <Button variant='success' onClick={toggleNewForm} className='full-width'>Add New Contact</Button>
                        </Col>
                    </Row>
                }
            </Container>
        </Alert>
    )
}

export default ContactSection;