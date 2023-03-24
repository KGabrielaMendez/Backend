import React, { useContext,useEffect, useState } from "react";
import DataTableList from '../../common/datatable/datatable';
import inventarioContext from '../../../Context/inventarioContext';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { getDatos } from "../../../services";

const ListSalidas = () => {
const { 
    selected, 
    setSelected,
    loading,setLoading,
    error, setError
  } = useContext(inventarioContext);
  const columns = [
    { 
        field: 'fecha_salida',
        header: 'Fecha de Salida',
        sortable:true,
        filter: true,
    },
    { 
        field: 'hora_salida',
        header: 'Hora de Salida',
        sortable:true,
        filter: true,
    },
    { 
        field: 'usuario',
        header: 'Usuario',
        sortable:true,
        filter: true,
    },
    { 
        field: 'cantidad',
        header: 'Cantidad',
        sortable:false,
        filter: false,
    },
    { 
        field: 'observacion',
        header: 'Observación',
        sortable:false,
        filter: false,
    },
];


  const [dataList,setDataList] = useState([]);
  const endpoint = '/salidas/';

  useEffect(() => {
    setLoading(true);
    getDatos(endpoint)
      .then((data) => {
        if (!data.hasError) {
          console.log("salida---...", data)
          const FormatDate = data.map(col => {
            const date = new Date(col.fecha_salida);
            const salida = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            console.log(salida);
            const datetime= `${date.getHours()}:${date.getMinutes()}`
            return { ...col, 'fecha_salida': salida, 'hora_salida':datetime }
          });
          console.log("FECHA_SALI.scaDA: ", FormatDate);
          setDataList(FormatDate)
          setError(null);
        } else {
          console.error(".------------.--------.", data)
          setDataList(null);
          setError(data.error);
        };
      });
    setLoading(false);
  }, []);

  const filters = {
    'fecha_salida': {
        operator: FilterOperator.AND,
        constraints: [{
            matchMode: FilterMatchMode.DATE_IS
        }]
    },
    'usuario': {
        operator: FilterOperator.AND,
        constraints: [{
            matchMode: FilterMatchMode.CONTAINS
        }]
    },

};

  return (

    <div>
     
      <>
      <DataTableList
        key="datatableSalidas"
        dataList={dataList}
        columns={columns}
        header={"EGRESOS EN INVENTARIO"}
        filters={filters}
        dataToEdit={selected}
        setDataToEdit={setSelected}
      />

      </>
      



    </div>
  )

}

export default ListSalidas;