import React, { useState, useEffect } from "react";
import AppContext from './js/functions/AppContext'
import processData from './js/functions/dataProcessing'
import Brand from './js/components/ui/Brand';
import Flash from './js/components/ui/Flash';
import AppContent from './js/components/AppContent';

function App(){
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState('Delivery & Support');
    const [flash, setFlash] = useState("");
    
    const flashMessage = (msg) => {
      setFlash(msg);
      setTimeout(() => {setFlash("")}, 3000);
    }

    useEffect(() => {
      google.script.run
          .withSuccessHandler(processData)
          .withUserObject({setLoading})
          .getData();
    },[]);

    const value = {
        group: {
            value: group, 
            updateFunction: setGroup
        },
        flash: flashMessage,
        loading
    }

    return ( <AppContext.Provider value={value}>
              <div>
                <Brand></Brand>
                <div id='wrapper'>
                  <main id='content'>
                    <div id='page-content'>
                      <div id='blue-strap'>
                        <div id='app-heading-div'>
                          <h1 id='app-title'>Title</h1>
                          <Flash flash={flash} />
                        </div>
                      </div>
                      <AppContent />
                    </div>
                  </main>
                </div>
              </div>
             </AppContext.Provider>
            );
  }

export default App;