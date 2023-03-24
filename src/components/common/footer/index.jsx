import React, { useContext } from 'react';
import LoginContext from '../../../Context/login';
import './index.css';

const Footer = () => {
    const { sesion } = useContext(LoginContext);
return(
    <>
        <footer className="footer-container">
            <p/>
            <p/>
            <p align="center">Cría y reproducción de Ganado Bovino</p>
            <h5>  usuario:  {sesion.usuario} </h5>
            <h5> </h5>
            <p/>
            
        </footer>
    </>
)
};

export default Footer;

