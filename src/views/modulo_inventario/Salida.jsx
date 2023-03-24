import React, { Component } from 'react';
import ListSalidas from '../../components/CrudInventario/Salida/List';
import {InventarioProvider} from './../../Context/inventarioContext';

class Salidas extends Component {


    render() {
        return (
            <>
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                <InventarioProvider>
                <ListSalidas />
                </InventarioProvider>
            </>
        )
    }
}



export default Salidas;