import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from 'lodash/map';

function UsageSection(props) {
    const { usage } = props;

    console.log(usage)
    return (
        <Alert variant={'dark'}>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <h5>Usage</h5>
                    </Col>
                </Row>
                {map(usage,(usageItem) => {
                    return (
                            <Row>
                                <Col>
                                    {JSON.stringify(usageItem)}
                                </Col>
                            </Row>
                        )
                })}

            </Container>
        </Alert>
    )
}

export default UsageSection;