import React, { useContext, useState } from "react";
import Context from "../../../Context/context";
import { CrudForm } from "./crudForm";
import LoadingComponent from '../../common/loading/index';
import DataTableList from '../../common/datatable/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import Message from '../../common/message/index';
import { getReporte, getReporteAnio } from './../../services/Reportes/index';


const ReporteGanado = ({ consulta, fecha_inicio, fecha_fin, anio }) => {
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [reloadList, setReloadList] = useState(false);
const [dataList, setDataList] = useState([]);
  
let endpoint;
  switch (consulta) {
    case 'Toros_Venta':
      endpoint = '/reportes/torosVenta/'
      useEffect(() => {
        setLoading(true);
        getReporte(endpoint, fecha_inicio, fecha_fin)
          .then((data) => {
            if (!data.hasError) {
              console.log("reportes ", endpoint, ' ', data);
              //   const FormatDate = data.map(col => {
              //     const date = new Date(col.fecha_inicio)
              //     const newdate = getLongMonthName(date).concat('-', date.getFullYear());
              //     return { ...col, fecha_inicio: newdate }
              // });
              setDataList(data);
              setError(null)
              setReloadList(false);
            } else {
              setDataList(null);
              setError(data.error)
            }
          })
        setLoading(false);
      }, [reloadList]);
      break;
    case 'Ganado_vendido':
      endpoint = '/reportes/torosVentaAnio/'
      useEffect(() => {
        setLoading(true);
        getReporteAnio(endpoint, anio)
          .then((data) => {
            if (!data.hasError) {
              console.log("reportes ", endpoint, ' ', data);
              //   const FormatDate = data.map(col => {
              //     const date = new Date(col.fecha_inicio)
              //     const newdate = getLongMonthName(date).concat('-', date.getFullYear());
              //     return { ...col, fecha_inicio: newdate }
              // });
              setDataList(data);
              setError(null)
              setReloadList(false);
            } else {
              setDataList(null);
              setError(data.error)
            }
          })
        setLoading(false);
      }, [reloadList]);
      break;
    case 'Ganado_Descarte':
      console.log('El kilogramo de platanos cuesta $0.48.');
      break;
    case 'Ganado_Equino':
      console.log('El kilogramo de cerezas cuesta $3.00.');
      break;
    case 'Mangos':
    case 'Papayas':
      console.log('El kilogramo de mangos y papayas cuesta $2.79.');
      break;
    default:
      window.alert("Intentelo nuevamente");
  }



  return (

    <>
      <CrudForm />


      {loading && <LoadingComponent />}
      {error && <Message error={error} />}
      {dataList && <DataTableList
        key="datatableReporteTorosVenta"
        dataList={dataList}
        columns={columns}
        header={"Reporte de Toros Listos para la Venta"}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        filters={filters}
      />
      }



    </>
  )

}

export default ReporteGanado;