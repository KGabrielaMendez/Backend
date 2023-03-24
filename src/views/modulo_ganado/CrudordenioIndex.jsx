import React, { Component } from 'react';
import CrudApp from '../../components/CrudOrdenio/crudApp';
import { OrdenioProvider } from '../../Context/ordenioContext'

class CrudOrdenio extends Component {


    render() {
        return (
            <>
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                <OrdenioProvider>
                    <CrudApp />
                </OrdenioProvider>
            </>
        )
    }
}



export default CrudOrdenio;