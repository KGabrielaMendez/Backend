import React, { useContext } from "react";
import DataTableList from '../common/datatable/datatable';
import inventarioContext from '../../Context/inventarioContext';

const CrudApp = () => {
const { 
    dataList,
    columns,
    filters,
    selected, 
    setSelected
  } = useContext(inventarioContext);


  return (

    <div>
     
      <>
      <DataTableList
        key="datatableInvent"
        dataList={dataList}
        columns={columns}
        header={"INVENTARIO"}
        filters={filters}
        dataToEdit={selected}
        setDataToEdit={setSelected}
      />

      </>
      



    </div>
  )

}

export default CrudApp;