import React, { Component } from 'react';
import CrudApp from '../../components/CrudInventario/index';
import {InventarioProvider } from '../../Context/inventarioContext';
class CrudInventario extends Component {


    render() {
        return (
            <>
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}

                         
                <InventarioProvider>
   

                    <CrudApp />
                </InventarioProvider>
            </>
        )
    }
}



export default CrudInventario;