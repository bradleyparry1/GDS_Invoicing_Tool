import React from 'react';
//import Col from 'react-bootstrap/Col';
//import Col from 'react-bootstrap/Col';
import Col from 'react-bootstrap/Col';

function Contact(props){
    const { contact } = props;
    return (
        <>
            <Col xs={3}>Name:</Col>
            <Col xs={9}><b>{contact.ContactName}</b></Col>
            <Col xs={3}>Email:</Col>
            <Col xs={9}>{contact.Email}</Col>
            <Col xs={3}>Address:</Col>
            <Col xs={9}>{contact.Address}</Col>
        </>
    )
}

export default Contact;