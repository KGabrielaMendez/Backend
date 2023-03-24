import React, { Component } from 'react';
import CrudApp from '../../components/UCrudEmpleado/crudApp';
import { ModuloUsuarioProvider } from '../../Context/moduloUsuarioContext';

class CrudEmpleado extends Component {


    render() {
        return (
            <>
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                <ModuloUsuarioProvider>
                    <CrudApp />
                </ModuloUsuarioProvider>
            </>
        )
    }
}



export default CrudEmpleado;