import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function GlobalToolbar(props){
    
    return (
    <Container className='global-top'>
      <Row>
        <Col xs={2}>
          <label class='col-form-label'>Filter</label>
        </Col>
        <Col xs={4}>
          
        </Col>
      </Row>
    </Container>
    );
  }

  export default GlobalToolbar;