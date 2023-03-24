import React, { useContext } from "react";
import OrdenioContext from "../../Context/ordenioContext";
import LoadingComponent from '../common/loading/index';
import DataTableList from '../common/datatable/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

import { CrudForm } from './crudForm';
import { DetailOrdenio } from "./detail";
import Message from './../common/message/index';



const CrudApp = () => {
 
  const {
    dataSelect,
    setDataSelect,
    loading,
    columns,
    dataList,
    error
  } = useContext(OrdenioContext);

  const filters = {
    'mes': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'anio': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'cuenta_mes': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
  }

  return (
    <>

      <CrudForm />
      
      {loading && <LoadingComponent />}

      {dataList &&
      <>
      <DetailOrdenio/>
        <DataTableList
          header={"CUENTA MENSUAL DE LECHE"}
          filters={filters}
          key="datatableGanado"
          dataList={dataList}
          columns={columns}
          dataToEdit={dataSelect}
          setDataToEdit={setDataSelect}
          />
          </>
          }

          {error && <Message error={error} />}
 


    </>
  )
}
export default CrudApp;