import React, { useState } from "react";
import Brand from './js/components/ui/Brand'
import Flash from './js/components/ui/Flash'
import AppContent from './js/components/AppContent'

function App(){
    const [flash, setFlash] = useState("");
    
    const flashMessage = (msg) => {
      setFlash(msg);
      setTimeout(() => {setFlash("")}, 3000);
    }
    
    return ( <div>
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
                     <AppContent flash={flashMessage} />
                   </div>
                 </main>
               </div>
             </div>
            );
  }

export default App;