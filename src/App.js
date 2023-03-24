import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Footer } from './components/common';
import AllRoutes from './routes';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LogInS from './views/login/login';
import LoginContext from './Context/login';


function App() {
  const { sesion } = useContext(LoginContext);
  return (
    <div className="App">
      <BrowserRouter>
        {!sesion ?

          <LogInS />
          :
          <>
            <Header />
            
            <div >
              <AllRoutes />
            </div>

            <Footer />
          </>
        }




      </BrowserRouter>

    </div>
  );
}

export default App;