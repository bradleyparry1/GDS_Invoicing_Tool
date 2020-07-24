import React, { useState, useEffect } from "react";
import AppContext from './js/views/AppContext'
import processData from './js/functions/dataProcessing'
import Brand from './js/components/ui/Brand';
import Flash from './js/components/ui/Flash';
import Home from './js/views/Home';
import Department from './js/views/Department';

function App(){
    const [loading, setLoading] = useState(true);
    const [flash, setFlash] = useState("");

    const [product, setProduct] = useState(null)
    const [department, setDepartment] = useState(null);

    const [products, setProducts] = useState({});
    const [departments, setDepartments] = useState({});
    const [services, setServices] = useState({});
    const [pos, setPos] = useState({});
    const [prepayments, setPrepayments] = useState({});
    const [invoices, setInvoices] = useState({});
    const [contacts, setContacts] = useState({});
    const [tree, setTree] = useState({});
    
    const flashMessage = (msg) => {
      setFlash(msg);
      setTimeout(() => {setFlash("")}, 3000);
    }

    const value = {
        product: {
            value: product, 
            updateFunction: setProduct
        },
        products: {
            value: products, 
            updateFunction: setProducts
        },
        department: {
          value: department, 
          updateFunction: setDepartment
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
        prepayments: {
          value: prepayments, 
          updateFunction: setPrepayments
        },invoices: {
          value: invoices, 
          updateFunction: setInvoices
        },
        contacts: {
          value: contacts, 
          updateFunction: setContacts
        },
        tree: {
          value: tree, 
          updateFunction: setTree
        },
        flash: flashMessage,
        loading
    }
    
    useEffect(() => {
      google.script.run
          .withSuccessHandler(processData)
          .withUserObject(
            {
              setProduct,
              setLoading, 
              setProducts, 
              setDepartments, 
              setServices, 
              setPos, 
              setPrepayments, 
              setInvoices, 
              setContacts,
              setTree
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
                        { department ? 
                          <Department />
                        :
                          <Home />
                        }
                    </div>
                  </main>
                </div>
              </div>
             </AppContext.Provider>
            );
  }

export default App;