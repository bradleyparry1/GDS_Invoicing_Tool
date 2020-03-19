import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/map'


function InvoiceCharacteristicSelect(props){
    const { characteristic, options, displayCharacteristic, updateFunction } = props;

    const update = (e) => {
        updateFunction(e.target.value);
    }

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={3}><b>{characteristic}:</b></Form.Label>
            <Col sm={9}>
                <Form.Control as="select" onClick={update}>
                    {map(options,(option) => {
                        return <option value={option.ID}>{option[displayCharacteristic]}</option>
                    })}
                </Form.Control>
            </Col>
        </Form.Group>
    )
}

export default InvoiceCharacteristicSelect;