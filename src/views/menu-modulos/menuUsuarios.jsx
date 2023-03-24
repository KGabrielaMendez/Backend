import React from 'react';
import { Link } from 'react-router-dom';

const MenuUsuarios = () => (
    <>
        <div className="welcome-container">

                <center>
                    <h1>MÓDULO DE USUARIOS Y ACCESOS</h1>
                </center>
          


            <table width="60%" cellSpacing="1" cellPadding="1" align="center">
                <tbody>
                    <tr >
                        <th height="200" width="20%" ><Link to="/empleados/"> EMPLEADOS </Link></th>
                        <th height="200" width="20%"><Link to="/usuarios/">  USUARIOS   </Link></th>
                        <th height="200" width="20%"><Link to="/ocupacion/">  OCUPACIÓN   </Link></th>
                    </tr>
                </tbody>
            </table>

        </div>
    </>
)

export default MenuUsuarios;