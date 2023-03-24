import React, { useContext } from "react";
import Context from "../../../Context/context";
import { CrudForm } from "./crudForm";
import LoadingComponent from '../../common/loading/index';
import DataTableList from '../../common/datatable/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import Message from '../../common/message/index';


const CrudApp = () => {
  const {
    setDataToEdit,
    dataToEdit,
    loading,
    error,
    dataList,
  } = useContext(Context);

  const columns = [
    {
      field: "nombre_com",
      header: "Nombre y Apellido",
      sortable: true,
      filter: true
    },
    {
      field: "ruc_com",
      header: "RUC",
      filter: true
    },
    {
      field: "direccion_com",
      header: "Dirección",
      filter: false
    },
    {
      field: "telefono_com",
      header: "Teléfono",
      filter: false
    }
  ];

  const filters = {
    'nombre_com': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'ruc_com': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'direccion_com': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    }
  };



  return (

    <>
      <CrudForm />
     

      {loading && <LoadingComponent />}
      {error && <Message error={error} />}
      {dataList && <DataTableList
        key="datatableComerciante"
        dataList={dataList}
        columns={columns}
        header={"Registro de Comerciantes"}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        filters={filters}
      />
      }



    </>
  )

}

export default CrudApp;