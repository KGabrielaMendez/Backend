import React, { useContext } from 'react';
import './index.css';
import logo from './../../../assets/hacienda-Acapulco.jpg'
import LoginContext from '../../../Context/login';
import { Button } from 'primereact/button';


const Header = () => {
    const { Logout,sesion } = useContext(LoginContext);
    /* <div>
                    <b>
                        usuario: {sesion.usuario}
                    </b> <p />
                </div>
                  <Button icon='pi pi-sign-out' iconPos="right" onClick={Logout}></Button>
                */

    return (
        <>
            <header >
                <div className="wrapper">
                    <div className="logo">
                        <img src={logo} alt="logo hacienda" className="imgRedonda" />
                    </div>
                        <a href='/'>Inicio</a>
                        <a href='/paganado'>Módulo de Ganado</a>
                        <a href='/painventario'>Módulo de Inventario</a>
                        {sesion.rol ===1 && 
                        <a href='/pausuarios'>Módulo de Usuarios</a>  
                    }
                        <Button icon='pi pi-sign-out' iconPos="right" onClick={Logout}></Button>
                </div>

            </header>
        </>
    )
};

export default Header;