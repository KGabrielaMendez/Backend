import React from 'react';
import { Link } from 'react-router-dom';

const MenuGanado = () => (
    <>
        <div className="welcome-container">

            <center>
                <h1>MÓDULO DE GANADOsd</h1>
            </center>


            <table width="80%" cellSpacing="1" cellPadding="1" align="center">
                <tbody>
                    <tr >
                        <th height="200" width="20%" align="center"><Link to="/ganado/">  LISTADO DE GANADO               </Link></th>
                        <th height="200" width="20%" align="center"><Link to="/plansanitario">  PLAN SANITARIO            </Link></th>
                        <th height="200" width="20%" align="center"><Link to="/controlmensual/">  CONTROL MENSUAL DE LECHE </Link></th>
                        <th height="200" width="20%" align="center"><Link to="/comerciante">  COMPRA Y VENTA                   </Link></th>
                        <th height="200" width="20%" align="center"><Link to="/ganado/">  REPORTES                         </Link></th>
                    </tr>
                </tbody>
            </table>

        </div>
    </>
)

export default MenuGanado;