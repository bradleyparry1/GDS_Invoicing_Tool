import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UsageSection from '../components/UsageSection'
import ServicesList from '../components/ServicesList'
import AppContext from '../functions/AppContext'

function Department(){
    const { product, department, tree } = useContext(AppContext);
    const productData = tree.value[product.value];
    const departmentData = tree.value[product.value].departments[department.value];

    const backToDepartmentList = () => {
        department.updateFunction(null);
    }

    return (
        <Container>
            <Row className='mt-3 mb-3'>
                <Col xs={10}>
                    <h3>{productData.ProductName}</h3>
                </Col>
                <Col xs={2}>
                    <Button onClick={() => backToDepartmentList()}>
                        Back
                    </Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12}>
                    <h1>{departmentData.DepartmentName}</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <UsageSection
                        usage={departmentData.usage}
                        />
                </Col>
                <Col xs={4}>
                    <Alert variant={'primary'}>
                        POs
                    </Alert>
                </Col>
                <Col xs={4}>
                    <Alert variant={'success'}>
                        Invoices
                    </Alert>
                </Col>
            </Row>
            <ServicesList services={departmentData.services} />
        </Container>
    )
}

export default Department;