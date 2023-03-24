import React, { useContext } from "react";
import DataTableList from '../common/datatable/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import InventarioContext from './../../Context/inventarioContext';
import LoadingComponent from "../common/loading";
import Message from "../common/message";
import { DetalleInventario } from './detail';
import { ProductoProvider } from "../../Context/common/productoContext";
import { Agregar } from "./Entrada/Form";


const CrudApp = () => {
  const {
    
    setSelected,
    dataList,
    selected,
    columns,
    loading,
    error,
    createData
  } = useContext(InventarioContext);

console.log('selected...',selected);
  const filters = {
    'nombre_pro': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'categoria_pro': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    
  };

  return (

    <>
      {//<GetOcupacionProvider>
        //  <CrudForm />
      //</GetOcupacionProvider>
    }
    <ProductoProvider>
    <Agregar 
    createData={createData}
    error={error}
    />
    </ProductoProvider>

    {loading && <LoadingComponent />}
    {error && <Message error={error} />}
<DetalleInventario/>

     {dataList && <DataTableList
        key="datatableInventario"
        dataList={dataList}
        columns={columns}
        header={"INVENTARIO"}
        filters={filters}
        dataToEdit={selected}
        setDataToEdit={setSelected}
      />
     }

    </>
  )

}

export default CrudApp;