import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import processData from '../functions/dataProcessing'

function AppContent(props){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        google.script.run
            .withSuccessHandler(processData)
            .withUserObject({setLoading})
            .getData();
    },[]);

    return (
        <div id='display'>
            { loading ?
            <div style={{padding: '50px'}}>
                <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                    role="progressbar" aria-valuenow="100" 
                    aria-valuemin="0" aria-valuemax="100">Loading...</div>
                </div>
            </div> : 
                <Tab.Container defaultActiveKey="first" transition={false}>
                    <Nav>
                    <Nav.Item className='flexi-tab'>
                        <Nav.Link className='tab-link' eventKey="first">
                        Tab 1
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='flexi-tab'>
                        <Nav.Link className='tab-link' eventKey="second">
                        Tab 2
                        </Nav.Link>
                    </Nav.Item>
                    </Nav>

                    <Tab.Content>
                    <Tab.Pane eventKey="first">
                        Tab 1
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        Tab 2
                    </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            }
        </div>
        );
}

export default AppContent;