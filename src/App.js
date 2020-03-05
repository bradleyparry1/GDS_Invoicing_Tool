import React, { useState, useEffect } from "react";
import AppContext from './js/functions/AppContext'
import processData from './js/functions/dataProcessing'
import Brand from './js/components/ui/Brand';
import Flash from './js/components/ui/Flash';
import AppContent from './js/components/AppContent';

function App(){
    const [loading, setLoading] = useState(true);
    const [flash, setFlash] = useState("");
    const [products, setProducts] = useState({});
    const [departments, setDepartments] = useState({});
    const [services, setServices] = useState({});
    const [pos, setPos] = useState({});
    const [invoices, setInvoices] = useState({});
    const [contacts, setContacts] = useState({});
    
    const flashMessage = (msg) => {
      setFlash(msg);
      setTimeout(() => {setFlash("")}, 3000);
    }

    const value = {
        products: {
            value: products, 
            updateFunction: setProducts
        },
        departments: {
          value: departments, 
          updateFunction: setDepartments
        },
        services: {
          value: services, 
          updateFunction: setServices
        },
        pos: {
          value: pos, 
          updateFunction: setPos
        },
        invoices: {
          value: invoices, 
          updateFunction: setInvoices
        },
        contacts: {
          value: contacts, 
          updateFunction: setContacts
        },
        flash: flashMessage,
        loading
    }
    
    useEffect(() => {
      google.script.run
          .withSuccessHandler(processData)
          .withUserObject(
            {
              setLoading, 
              setProducts, 
              setDepartments, 
              setServices, 
              setPos, 
              setInvoices, 
              setContacts
            }
          )
          .getData();
    },[]);

    return ( <AppContext.Provider value={value}>
              <div>
                <Brand></Brand>
                <div id='wrapper'>
                  <main id='content'>
                    <div id='page-content'>
                      <div id='blue-strap'>
                        <div id='app-heading-div'>
                          <h1 id='app-title'>Invoicing Tool</h1>
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