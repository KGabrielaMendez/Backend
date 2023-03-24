import React, { Component } from 'react';
import CrudApp from '../../components/CrudGanado/crudApp';
import { CrudProvider } from '../../Context/crudContext'

class CrudGanado extends Component {


    render() {
        return (
            <>
            <center>
            <h3>GANADO</h3>
            </center>
            
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                <CrudProvider>
                    <CrudApp />
                </CrudProvider>
            </>
        )
    }
}



export default CrudGanado;