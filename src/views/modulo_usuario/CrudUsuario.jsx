import React, { Component } from 'react';
import CrudApp from '../../components/UCrudEmpleado/Crudusuario/crudApp';
import { ModuloUsuarioProvider } from '../../Context/moduloUsuarioContext';

class CrudUsuario extends Component {


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



export default CrudUsuario;