import React from 'react';
import { CVProvider } from '../../Context/CompraVentaContext';
import { CrudProvider } from '../../Context/crudContext';
import { FormDetalleCV } from './FormDetalle';
import { FormMaestroCV } from './FormMaestroCV';

export const CrudForm = () => {

  return (
    <>
    <center>
      <h2>Nueva Transacción</h2>
    </center>

{/* datos  de la compra*/}






{/* detalles  de la compra*/}
      <CVProvider >

    <FormMaestroCV/>


      <CrudProvider >
        <FormDetalleCV />
      </CrudProvider>
      </CVProvider >
    </>
  )

}
