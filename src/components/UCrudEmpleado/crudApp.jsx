import React, { useContext } from "react";
import { CrudForm } from "./crudForm";
import LoadingComponent from '../common/loading/index';
import DataTableList from '../common/datatable/datatable';
import { GetOcupacionProvider } from "../../Context/common/ocupacionContext";
import Message from '../common/message/index';
import ModuloUsuarioContext from './../../Context/moduloUsuarioContext';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { RolProvider } from "../../Context/common/rolContext";
import { CrudFormUser } from "./Crudusuario/crudForm";


const CrudApp = () => {
  const {
    setDataToEdit,
    dataToEdit,
    loading,
    columns,
    error,
    dataList,
  } = useContext(ModuloUsuarioContext);
  const filters={
    'ocupacion':{
      operator: FilterOperator.AND,
      constraints: [{
        FilterMatchMode: FilterMatchMode.CONTAINS
      }]
    },
    'nombre_completo':{
      operator: FilterOperator.AND,
      constraints: [{
        FilterMatchMode: FilterMatchMode.CONTAINS
      }]
    },
    
  }

  
  return (

    <>
      <GetOcupacionProvider>
          <CrudForm />
      </GetOcupacionProvider>
      <RolProvider>
          <CrudFormUser listEmpleados={dataList}/>
      </RolProvider>
    
      {loading && <LoadingComponent />}

      {dataList && <DataTableList
        key="datatableUsuario"
        dataList={dataList}
        columns={columns}
        header={"LISTA DE EMPLEADOS"}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        filters={filters}
        />
      }

      {error && <Message error={error} />}


    </>
  )

}

export default CrudApp;