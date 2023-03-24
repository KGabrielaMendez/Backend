import React, { useContext } from "react";
import { CrudForm } from "./crudForm";
import LoadingComponent from '../../common/loading/index';
import DataTableList from '../../common/datatable/datatable';
import Message from '../../common/message/index';
import GetOcupacionContext from './../../../Context/common/ocupacionContext';


const CrudApp = () => {
  const {
    listOcupacion,
    selected,
    setSelected,
    loading,
    columns,
    error
  } = useContext(GetOcupacionContext);

  
  return (

    <>
          <CrudForm />
     

      {loading && <LoadingComponent />}
      {error && <Message error={error} />}

      {listOcupacion && <DataTableList
        key="datatableUsuario"
        dataList={listOcupacion}
        columns={columns}
        header={"PUESTOS DE TRABAJO"}
        dataToEdit={selected}
        setDataToEdit={setSelected}
      />
      }



    </>
  )

}

export default CrudApp;