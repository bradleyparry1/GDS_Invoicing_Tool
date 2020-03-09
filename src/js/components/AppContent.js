import React, { useContext } from 'react'
import AppContext from '../functions/AppContext'
import GlobalToolbar from './ui/GlobalToolbar';
import TabToolbar from './ui/TabToolbar';
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
                
                <>
                    <TabToolbar>
                        <Tab1Toolbar />
                    </TabToolbar>
                    <Tab1 />
                </>
            }
        </div>
    );
}

export default AppContent;