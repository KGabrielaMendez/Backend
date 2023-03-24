import React, { Component } from 'react';
import CrudApp from '../../components/crudCompraVenta/crudApp';
import { CVProvider } from '../../Context/CompraVentaContext'

class CompraVenta extends Component {


    render() {
        return (
            <>
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                <CVProvider>
                    <CrudApp />
                </CVProvider>
            </>
        )
    }
}



export default CompraVenta;