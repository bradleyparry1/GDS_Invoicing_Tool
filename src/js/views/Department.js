import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactSection from '../components/ContactSection';
import UsageSection from '../components/UsageSection';
import PoSection from '../components/PoSection';
import InvoiceSection from '../components/InvoiceSection';
import ServicesList from '../components/ServicesList';
import AppContext from './AppContext';

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
                        {'< Back'}
                    </Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12}>
                    <h1>{departmentData.DepartmentName}</h1>
                </Col>
            </Row>
            <Row className={'mb-3'}>
                <Col md={6}>
                    <ContactSection
                        department={departmentData}
                    />
                </Col>
                <Col md={6}>
                    <PoSection
                        department={departmentData}
                    />
                </Col>
                <Col md={6}>
                    <UsageSection
                        department={departmentData}
                    />
                </Col>
                <Col md={6}>
                    <InvoiceSection
                        department={departmentData}
                    />
                </Col>
            </Row>
            <ServicesList 
                department={departmentData}
            />

        </Container>
    )
}

export default Department;