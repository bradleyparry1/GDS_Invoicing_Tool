import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForActionTable from '../components/ForActionTable';
import ContactSection from '../components/ContactSection';
import Scorecard from '../components/Scorecard';
import PoSection from '../components/PoSection';
import InvoiceSection from '../components/InvoiceSection';
import ServicesList from '../components/ServicesList';
import AppContext from './AppContext';
import { calculateDepartmentUsageBillingTotal, calculateDepartmentInvoiceValue } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function Department(){
    const { product, department, tree } = useContext(AppContext);
    const productData = tree.value[product.value];
    const departmentData = tree.value[product.value].departments[department.value];
    
    const billingAmount = calculateDepartmentUsageBillingTotal(departmentData);
    const invoiceAmount = calculateDepartmentInvoiceValue(departmentData);
    const outstanding = billingAmount - invoiceAmount;

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
                <Col md={6} lg={4}>
                    <Scorecard 
                        variant={'dark'}
                        title={"Total Amount To Bill"}
                        value={formatMoney(billingAmount)}
                    />
                </Col>
                <Col md={6} lg={4}>
                    <Scorecard 
                        variant={'success'}
                        title={"Total Amount Invoiced"}
                        value={formatMoney(invoiceAmount)}
                    />
                </Col>

                <Col md={12} lg={4}>
                    <Scorecard 
                        variant={outstanding === 0 ? 'success' : 'danger'}
                        title={"Outstanding Amount"}
                        value={formatMoney(outstanding)}
                    />
                </Col>
            </Row>
            <ForActionTable
                department={departmentData}
                tree={tree}
                product={product}
            />
            <Row>
                <Col lg={6}>
                    <ContactSection
                        department={departmentData}
                        tree={tree}
                        product={product}
                    />
                    <InvoiceSection
                        department={departmentData}
                        tree={tree}
                        product={product}
                    />
                </Col>
                <Col lg={6}>
                    <PoSection
                        department={departmentData}
                        tree={tree}
                        product={product}
                    />
                    <ServicesList 
                        department={departmentData}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    
                </Col>
                <Col lg={6}>
                    
                </Col>
            </Row>
            
        </Container>
    )
}

export default Department;