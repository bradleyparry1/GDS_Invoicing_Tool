import React from 'react'
import Container from 'react-bootstrap/Container';

const ToolbarSection = ({children}) => {
    return (
        <Container className='tab-toolbar'>
            {children}
        </Container>
    )
}

export default ToolbarSection;