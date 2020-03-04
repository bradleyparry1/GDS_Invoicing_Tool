import React, { useContext } from 'react'
import AppContext from '../functions/AppContext'
import GlobalToolbar from './ui/GlobalToolbar';
import Tab1 from './Tab1';
import Tab1Toolbar from './Tab1Toolbar';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import ProgressBar from 'react-bootstrap/ProgressBar'


function AppContent(props){
    const appContext = useContext(AppContext);
    return (
        <div id='display'>
            { appContext.loading ?
            <div style={{padding: '50px'}}>
                <ProgressBar animated now={100} label={'Loading...'}/>
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
                    <GlobalToolbar />
                    <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <Tab1Toolbar />
                        <Tab1 />
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