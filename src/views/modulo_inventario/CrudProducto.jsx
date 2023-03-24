import React, { Component } from 'react';
import {ProductoProvider } from '../../Context/common/productoContext';
import { IndexProductos } from './../../components/CrudInventario/Productos/index.jsx';

class CrudProducto extends Component {


    render() {
        return (
            <>
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                <ProductoProvider>
                    <IndexProductos />
                </ProductoProvider>
            </>
        )
    }
}



export default CrudProducto;