import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function CreateInvoiceButton(props){
    const { createInvoiceEmail, createInvoiceBulk, disabled, submitting, invoicePo } = props;
    const [buttonsVisible, setButtonsVisible] = useState(false);
    
    useEffect(() => {
        if(disabled){
            setButtonsVisible(false);
        }
    },[disabled])

    const showButtons = () => {
        setButtonsVisible(!buttonsVisible)
    }

    return (
        <Alert variant={'secondary'}>
            <Container>
                <Row>
                    <Col xs={6} className='my-auto'>
                        <Button variant='secondary' className='full-width' onClick={showButtons} disabled={disabled}>
                            {submitting ? 
                                <>
                                    <Spinner animation="border" variant="light" size="sm"/>
                                    <span style={{'marginLeft':'10px'}}>Creating Invoice</span>
                                </>
                                : "Create Invoice"}
                        </Button>
                    </Col>
                    <Col xs={6}>
                        {buttonsVisible ?
                            <>
                                <Button size='sm' className='full-width mb-2' onClick={createInvoiceEmail} disabled={disabled}>
                                    Send Email
                                </Button>
                                {!['CO Journal'].includes(invoicePo) ?
                                    <Button size='sm' className='full-width' onClick={createInvoiceBulk} disabled={disabled}>
                                        Add To Bulk
                                    </Button>
                                : ''}
                            </>
                        : '' }
                    </Col>
                </Row>
            </Container>
        </Alert>
    )
}

export default CreateInvoiceButton;