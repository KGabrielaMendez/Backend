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