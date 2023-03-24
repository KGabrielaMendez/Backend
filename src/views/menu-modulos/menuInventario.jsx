import React from 'react';
import { Link } from 'react-router-dom';

const MenuInventario = () => (
    <>
        <div className="welcome-container">

                <center>
                    <h1>MÓDULO DE INVENTARIO</h1>
                </center>
       


            <table width="50%" cellSpacing="1" cellPadding="1" align="center">
                <tbody>
                    <tr >
                        <th height="200" width="20%" ><Link to="/inventario/"> CONTROL DE INVENTARIOS </Link></th>
                        <th height="200" width="20%"><Link to="/producto/">  PRODUCTOS   </Link></th>
                       
                    </tr>
                </tbody>
            </table>

        </div>
    </>
)

export default MenuInventario;