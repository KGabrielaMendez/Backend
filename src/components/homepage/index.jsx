import React, { useContext } from 'react';

import Modulos from '../common/card';
import ganado from './../../assets/ganado.jpg';
import inventario from './../../assets/invengario.jpg';
import usuario from './../../assets/usuarios.jpg';
import LoginContext from './../../Context/login';
import {ADMIN_ROLE} from './../../consts/index';

const Homepage = () => {
    const { sesion } = useContext(LoginContext);
    return (
        <>
            <div className="welcome-container">
                <center>
                    <h1>HACIENDA ACAPULCO</h1>
                </center>
                <table align="center">
                    <tbody>
                        <tr >
                            <th>
                                <Modulos image={ganado}
                                    alt="módulo de ganado"
                                    title="Módulo de Ganado"
                                    ruta="/paganado" />
                            </th>
                            <th>
                                <Modulos image={inventario}
                                    alt="módulo de Inventario"
                                    title="Módulo de Inventario"
                                    ruta="/painventario" />
                            </th>
                            {sesion.rol === ADMIN_ROLE &&
                                <th>
                                    <Modulos image={usuario}
                                        alt="módulo de usuarios"
                                        title="Módulo de Usuarios y Accesos"
                                        ruta="/pausuarios" />
                                </th>
                            }
                        </tr>

                    </tbody>
                </table>

            </div>

        </>
    )
}

export default Homepage;