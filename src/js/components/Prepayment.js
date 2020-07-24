import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import ServiceSelect from './ServiceSelect';
import { v4 as uuidv4 } from 'uuid';

function Prepayment(props){
    const { prepayment, departmentId, updatePrepayment, deletePrepayment, setShowNewForm, services, serviceNames, contactEmail } = props;
    const [editMode, setEditMode] = useState(props.new);
    const [submitting, setSubmitting] = useState(false);

    const editPrepayment = () => {
        setEditMode(!editMode);
        if(props.new){
            setShowNewForm(false);
        }
    }

    const deletePrepaymentHandler = () => {
        if(confirm("Are you sure you want to delete this prepayment?")){
            setSubmitting(true)
            google.script.run.withSuccessHandler(() => {
                deletePrepayment(prepayment.ID);
                setSubmitting(false);
                setEditMode(false);
            }).withFailureHandler((msg) => {
                alert(msg);
                setSubmitting(false)
            }).crud('delete','invoicingTool','Prepayments',{criteriaObject: {ID: prepayment.ID}});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setSubmitting(true)
        const form = event.currentTarget;
        const updateObject = { ServiceIDs: [] };
        for(var i = 0; i < form.length - 1; i++){
            if(form[i].name){
                if(form[i].name === "ServiceIDs"){
                    updateObject[form[i].name].push(form[i].value);
                } else {
                    updateObject[form[i].name] = form[i].value;
                }
            }
        }
        updateObject.ServiceIDs = JSON.stringify(updateObject.ServiceIDs);

        const options = {
            updateObject
        }

        if(!props.new){
            options.criteriaObject = {ID: prepayment.ID};
            options.updateObject.ID = prepayment.ID;
            options.updateObject.DepartmentID = prepayment.DepartmentID;
        } else {
            const newId = uuidv4();
            options.updateObject.ID = newId;
            options.updateObject.DepartmentID = departmentId;
        }

        //options.updateObject.Periods = JSON.stringify(options.updateObject.Periods.split(", "));
        const type = props.new ? 'create' : 'update';

        google.script.run.withSuccessHandler(() => {
            updatePrepayment(options.updateObject);
            setEditMode(false);
            setSubmitting(false);
        }).withFailureHandler((msg) => {
            alert(msg);
            setSubmitting(false)
        }).crud(type,'invoicingTool','Prepayments', options);
    }

    return (
        <Form onSubmit={handleSubmit} className='prepayment'>
            <Form.Group as={Row} controlId={`amount${prepayment.ID}`}>
                <Form.Label column sm="4">
                    <b>Amount (£):</b>
                </Form.Label>
                <Col sm="5">
                    <Form.Control 
                        name="Amount"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="Amount" 
                        defaultValue={prepayment.Amount} 
                    />
                </Col>
                <Col sm="3">
                    <Button variant="secondary" size="sm" onClick={editPrepayment} className='full-width' disabled={submitting}>
                        {editMode ? "Cancel" : "Edit"}
                    </Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId={`services${prepayment.ID}`}>
                <Form.Label column sm="4">
                    <b>Services:</b>
                </Form.Label>
                <Col sm="8">
                    <ServiceSelect 
                        editMode={editMode} 
                        submitting={submitting} 
                        services={services} 
                        value={prepayment.ServiceIDs}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId={`StartDate${prepayment.ID}`}>
                <Form.Label column sm="4">
                    <b>Start Date:</b>
                </Form.Label>
                <Col sm="8">
                    <Form.Control 
                        name="StartDate"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="Start Date" 
                        defaultValue={prepayment.StartDate ? prepayment.StartDate.slice(0,10) : ''} 
                        type='date'
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId={`EndDate${prepayment.ID}`}>
                <Form.Label column sm="4">
                    <b>End Date:</b>
                </Form.Label>
                <Col sm="8">
                    <Form.Control 
                        name="EndDate"
                        plaintext={!editMode || submitting} 
                        readOnly={!editMode || submitting} 
                        placeholder="End Date" 
                        defaultValue={prepayment.EndDate ? prepayment.EndDate.slice(0,10) : ''} 
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
                            props.new ? "Submit Prepayment" :"Submit Update"}
                        </Button>
                        {props.new ? '' : <Button disabled={submitting} variant="danger" size="sm" onClick={deletePrepaymentHandler}>Delete</Button>}
                    </ButtonGroup>
               </Col>
            </Row>
            : ''}
        </Form>
    )
}

export default Prepayment;