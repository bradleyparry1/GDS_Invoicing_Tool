import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForActionTable from '../components/ForActionTable';
import ContactSection from '../components/ContactSection';
import Scorecard from '../components/Scorecard';
import PoSection from '../components/PoSection';
import PrepaymentSection from '../components/PrepaymentSection';
import InvoiceSection from '../components/InvoiceSection';
import ServicesList from '../components/ServicesList';
import AppContext from './AppContext';
import { 
    calculateDepartmentUsageBillingTotal, 
    calculateDepartmentInvoiceValue, 
    calculateDepartmentPrepaidValue,
    calculateDepartmentPrepaidValueUsed,
    calculateDepartmentIncomeGenerated
} from '../functions/departmentFunctions';
import {formatMoney} from '../functions/utilities';

function Department(){
    const { product, department, tree } = useContext(AppContext);
    const productData = tree.value[product.value];
    const departmentData = tree.value[product.value].departments[department.value];

    const billingAmount = calculateDepartmentUsageBillingTotal(departmentData);
    const invoiceAmount = calculateDepartmentInvoiceValue(departmentData);
    const incomeAmount = calculateDepartmentIncomeGenerated(departmentData);
    const prepaymentAmount = calculateDepartmentPrepaidValue(departmentData);
    const prepaymentAmountUsed = calculateDepartmentPrepaidValueUsed(departmentData);
    const outstanding = billingAmount - invoiceAmount - prepaymentAmountUsed;

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
                <Col xs={9}>
                    <h1>{departmentData.DepartmentName}</h1>
                </Col>
                <Col xs={3}>
                    <b>Customer Number: </b>{departmentData.CustomerNumber}<br />
                    <b>Location: </b>{departmentData.Location}
                </Col>
            </Row>
            <Row>
                <Col md={12} lg={12}>
                    <Scorecard 
                        variant={'dark'}
                        title={"Total Cost of Usage"}
                        value={formatMoney(billingAmount)}
                    />
                </Col>
                
                <Col md={6} lg={6}>
                    <Scorecard 
                        variant={'success'}
                        title={"Total Amount Prepaid"}
                        value={formatMoney(prepaymentAmount)}
                    />
                </Col>

                <Col md={6} lg={6}>
                    <Scorecard 
                        variant={'success'}
                        title={"Prepaid Amount Used"}
                        value={formatMoney(prepaymentAmountUsed)}
                    />
                </Col>

                <Col md={6} lg={6}>
                    <Scorecard 
                        variant={'success'}
                        title={"Total Amount Invoiced"}
                        value={formatMoney(invoiceAmount)}
                    />
                </Col>

                <Col md={6} lg={6}>
                    <Scorecard 
                        variant={'success'}
                        title={"Income Recorded"}
                        value={formatMoney(incomeAmount)}
                    />
                </Col>

                <Col md={12} lg={12}>
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
                    <PrepaymentSection
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
            
        </Container>
    )
}

export default Department;