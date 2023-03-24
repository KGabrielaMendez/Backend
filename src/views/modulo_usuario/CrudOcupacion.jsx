import React, { Component } from 'react';
import CrudApp from '../../components/UCrudEmpleado/crudOcupacion/crudApp';
import { GetOcupacionProvider } from '../../Context/common/ocupacionContext';

class CrudOcupacion extends Component {


    render() {
        return (
            <>
                {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                <GetOcupacionProvider>
                    <CrudApp />
                </GetOcupacionProvider>
            </>
        )
    }
}



export default CrudOcupacion;