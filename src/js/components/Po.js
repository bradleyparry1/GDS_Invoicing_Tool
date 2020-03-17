import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

function Po(props){
    const { po, departmentId, updatePo, deletePo, setShowNewForm } = props;
    const [editMode, setEditMode] = useState(props.new);
    const [submitting, setSubmitting] = useState(false);

    const editPo = () => {
        setEditMode(!editMode);
        if(props.new){
            setShowNewForm(false);
        }
    }

    const deletePoHandler = () => {
        if(confirm("Are you sure you want to delete this contact?")){
            setSubmitting(true)
            google.script.run.withSuccessHandler(() => {
                deletePo(po.ID);
                setSubmitting(false);
            }).withFailureHandler((msg) => {
                alert(msg);
                setSubmitting(false)
            }).crud('delete','invoicingTool','POs',{criteriaObject: {ID: po.ID}});
        }
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();
        event.stopPropagation();
        setSubmitting(true)
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
            options.criteriaObject = {ID: po.ID};
            options.updateObject.ID = po.ID;
            options.updateObject.DepartmentID = po.DepartmentID;
        } else {
            const newId = uuidv4();
            options.updateObject.ID = newId;
            options.updateObject.DepartmentID = departmentId;
        }

        const type = props.new ? 'create' : 'update';

        google.script.run.withSuccessHandler(() => {
            updatePo(options.updateObject);
            setEditMode(false);
            setSubmitting(false);
        }).withFailureHandler((msg) => {
            alert(msg);
            setSubmitting(false)
        }).crud(type,'invoicingTool','POs', options);
    }

    return (
        <Form onSubmit={handleSubmit} className='po'>
            <Form.Group as={Row} controlId="ponumber">
                <Form.Label column sm="4">
                    <b>PO Number:</b>
                </Form.Label>
                <Col sm="5">
                    <Form.Control 
                        name="PONumber"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="PO Number" 
                        defaultValue={po.PONumber} 
                    />
                </Col>
                <Col sm="3">
                    <Button variant="secondary" size="sm" onClick={editPo} className='full-width'>
                        {editMode ? "Cancel" : "Edit"}
                    </Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="amount">
                <Form.Label column sm="4">
                    <b>Amount:</b>
                </Form.Label>
                <Col sm="8">
                    <Form.Control 
                        name="Amount"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="Amount" 
                        defaultValue={po.Amount} 
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="StartDate">
                <Form.Label column sm="4">
                    <b>Start Date:</b>
                </Form.Label>
                <Col sm="8">
                    <Form.Control 
                        name="StartDate"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="Start Date" 
                        defaultValue={po.StartDate ? po.StartDate.slice(0,10) : ''} 
                        type='date'
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="EndDate">
                <Form.Label column sm="4">
                    <b>End Date:</b>
                </Form.Label>
                <Col sm="8">
                    <Form.Control 
                        name="EndDate"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="End Date" 
                        defaultValue={po.EndDate ? po.EndDate.slice(0,10) : ''} 
                        type='date'
                    />
                </Col>
            </Form.Group>

            
            { editMode ?
            <Row>
               <Col sm="4"></Col>
               <Col sm="8">
                    <ButtonGroup aria-label="PO Update" className='full-width'>
                        <Button disabled={submitting} variant="primary" size="sm" type='submit'>
                            {submitting ? 
                            <>
                                <Spinner animation="border" variant="light" size="sm"/>
                                <span style={{'marginLeft':'10px'}}>Updating</span>
                            </>
                             : 
                            props.new ? "Submit PO" :"Submit Update"}
                        </Button>
                        {props.new ? '' : <Button disabled={submitting} variant="danger" size="sm" onClick={deletePoHandler}>Delete</Button>}
                    </ButtonGroup>
               </Col>
            </Row>
            : ''}
        </Form>
    )
}

export default Po;