import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForActionTable from '../components/ForActionTable';
import ContactSection from '../components/ContactSection';
import UsageSection from '../components/UsageSection';
import OutstandingSection from '../components/OutstandingSection';
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
                <Col xs={8} md={10}>
                    <h3>{productData.ProductName}</h3>
                </Col>
                <Col xs={4} md={2}>
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
            <Row>
                <Col md={4}>
                    <UsageSection
                        department={departmentData}
                    />
                </Col>
                <Col md={4}>
                    <InvoiceSection
                        department={departmentData}
                    />
                </Col>

                <Col md={4}>
                    <OutstandingSection
                        department={departmentData}
                    />
                </Col>
            </Row>
            <ForActionTable
                department={departmentData}
                tree={tree}
                product={product}
            />
            <Row>
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
            </Row>
            <ServicesList 
                department={departmentData}
            />
        </Container>
    )
}

export default Department;