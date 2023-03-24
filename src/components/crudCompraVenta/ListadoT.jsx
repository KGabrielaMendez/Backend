import React, { useContext} from "react";
import CVContext from "../../Context/CompraVentaContext";
import LoadingComponent from '../common/loading/index';
import DataTableList from '../common/datatable/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import Message from '../common/message/index';
import { DetailCV } from './detalleCV';


const ListaTransacciones = () => {
  const {
    dataSelect,
    setDataSelect,
    loading,
    error,
    dataList,
  } = useContext(CVContext);


  const columns = [
    {
      field: "fecha_negociacion",
      header: "Fecha",
      sortable: true,
      filter: true
    },
    {
      field: "nombre_com",
      header: "Cliente",
      sortable: true,
      filter: true
    },
    {
      field: "tipo_negociacion",
      header: "Tipo de Negociación",
      filter: true
    },
    {
      field: "estado_negociacion",
      header: "Estado",
      filter: true
    },
    {
        field: "precio_negociacion",
        header: "Precio Total",
        filter: false
      }
  ];

  const filters = {
    'estado_negociacion': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'tipo_negociacion': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'nombre_com': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
  };

console.log('-------------',dataSelect,'Dato seleccionado en ListadoT')
  return (

    <>
      {loading && <LoadingComponent />}
      {error && <Message error={error} />}
      <DetailCV />
      {dataList && <DataTableList
        key="datatableCompraVenta"
        dataList={dataList}
        columns={columns}
        header={"TRANSACCIONES"}
        dataToEdit={dataSelect}
        setDataToEdit={setDataSelect}
        filters={filters}
      />
      }



    </>
  )

}

export default ListaTransacciones;