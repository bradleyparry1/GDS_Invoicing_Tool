import React from 'react'
import Container from 'react-bootstrap/Container';

const TabToolbar = ({children}) => {
    return (
        <Container className='tab-toolbar'>
            {children}
        </Container>
    )
}

export default TabToolbar;