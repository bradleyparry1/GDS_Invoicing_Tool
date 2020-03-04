import React, { useContext } from 'react';
import AppContext from '../functions/AppContext';

function Tab1() {
    const appContext = useContext(AppContext);
    return (
        <div>
            Test
        </div>
    )
}

export default Tab1;