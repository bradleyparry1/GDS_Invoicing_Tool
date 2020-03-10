import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppContext from '../views/AppContext';
import map from 'lodash/map';

function ProductSelect() {
    const appContext = useContext(AppContext);

    const updateProduct = (e) => {
        appContext.product.updateFunction(e.target.value);
    }

    return (
        <Form.Group  as={Row} controlId="product-select">
            <Form.Label column sm={6}>Product</Form.Label>
            <Col sm={6}>
                <Form.Control as="select" onChange={updateProduct}>
                    {map(appContext.products.value,(product) => {
                        return <option value={product.ID}>{product.ProductName}</option>
                    })}
                </Form.Control>
            </Col>
        </Form.Group>
    )
}

export default ProductSelect;