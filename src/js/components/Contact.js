import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

function Contact(props){
    const { contact, departmentId, updateContact, deleteContact, setShowNewForm, contactUsed } = props;

    //console.log(contactUsed)

    const [editMode, setEditMode] = useState(props.new);
    const [submitting, setSubmitting] = useState(false);

    const editContact = () => {
        setEditMode(!editMode);
        if(props.new){
            setShowNewForm(false);
        }
    }

    const deleteContactHandler = () => {
        if(confirm("Are you sure you want to delete this contact?")) {
            setSubmitting(true);
            google.script.run.withSuccessHandler(() => {
                deleteContact(contact.ID);
                setSubmitting(false);
                setEditMode(false);
            }).withFailureHandler((msg) => {
                alert(msg);
                setSubmitting(false);
            }).crud('delete','invoicingTool','Contacts',{criteriaObject: {ID: contact.ID}});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setSubmitting(true);
        const form = event.currentTarget;
        const updateObject = {};
        for(var i = 0; i < form.length - 1; i++){
            if(form[i].name){
                updateObject[form[i].name] = form[i].value;
            }
        }

        const options = {
            updateObject
        }

        if(!props.new){
            options.criteriaObject = {ID: contact.ID};
            options.updateObject.ID = contact.ID;
            options.updateObject.DepartmentID = contact.DepartmentID;
        } else {
            const newId = uuidv4();
            options.updateObject.ID = newId;
            options.updateObject.DepartmentID = departmentId;
        }

        const type = props.new ? 'create' : 'update';

        google.script.run.withSuccessHandler(() => {
            updateContact(options.updateObject);
            setEditMode(false);
            setSubmitting(false);
        }).withFailureHandler((msg) => {
            alert(msg);
            setSubmitting(false);
        }).crud(type,'invoicingTool','Contacts', options);
    }

    return (
        <Form onSubmit={handleSubmit} className='contact'>
            <Form.Group as={Row} controlId={`name${contact.ID}`}>
                <Form.Label column sm="3">
                    <b>Name:</b>
                </Form.Label>
                <Col sm="6">
                    <Form.Control 
                        name="ContactName"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="Name" 
                        defaultValue={contact.ContactName} 
                    />
                </Col>
                <Col sm="3">
                    <Button variant="secondary" size="sm" onClick={editContact} className='full-width' disabled={submitting}>
                        {editMode ? "Cancel" : "Edit"}
                    </Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId={`email${contact.ID}`}>
                <Form.Label column sm="3">
                    <b>Email:</b>
                </Form.Label>
                <Col sm="9">
                    <Form.Control 
                        name="Email"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="Email" 
                        defaultValue={contact.Email} 
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId={`address${contact.ID}`}>
                <Form.Label column sm="3">
                    <b>Address:</b>
                </Form.Label>
                <Col sm="9">
                    <Form.Control 
                        name="Address"
                        as="textarea" 
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="Address" 
                        defaultValue={contact.Address} 
                    />
                </Col>
            </Form.Group>
            { editMode ?
            <Row>
               <Col sm="3"></Col>
               <Col sm="9">
                    <ButtonGroup aria-label="Contact Update" className='full-width'>
                        <Button disabled={submitting} variant="primary" size="sm" type='submit'>
                        {submitting ? 
                            <>
                                <Spinner animation="border" variant="light" size="sm"/>
                                <span style={{'marginLeft':'10px'}}>Updating</span>
                            </>
                             : 
                            props.new ? "Submit Contact" :"Submit Update"}
                        </Button>
                        {props.new ? '' : <Button disabled={submitting || contactUsed} variant="danger" size="sm" onClick={deleteContactHandler}>Delete</Button>}
                    </ButtonGroup>
               </Col>
            </Row>
            : ''}
        </Form>
    )
}

export default Contact;