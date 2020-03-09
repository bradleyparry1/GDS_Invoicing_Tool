import React, { useContext } from 'react'
import AppContext from '../functions/AppContext'
import ToolbarSection from '../components/ui/ToolbarSection';
import DepartmentsTable from '../components/DepartmentsTable';
import ProductSelect from '../components/ProductSelect';
import ProgressBar from 'react-bootstrap/ProgressBar'

function AppContent(props){
    const { loading } = useContext(AppContext);
    return (
        <div id='display'>
            { loading ?
            <div style={{padding: '50px'}}>
                <ProgressBar animated now={100} label={'Loading...'}/>
            </div> : 
                <>
                    <ToolbarSection>
                        <ProductSelect />
                    </ToolbarSection>
                    <DepartmentsTable />
                </>
            }
        </div>
    );
}

export default AppContent;