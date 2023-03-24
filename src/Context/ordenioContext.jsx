import React, { createContext, useEffect, useState } from "react";
import { getLongMonthName } from "../consts";
import { getDatos,createDato} from './../services/index';

const OrdenioContext = createContext();


const OrdenioProvider = ({ children }) => {

  const [dataSelect, setDataSelect] = useState('');
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false)
  const columns= [
    {
        field: 'anio',
        header: 'Año',
        sortable: true,
        filter: true
    },
    {
        field: 'mes',
        header: 'Mes',
        sortable: true,
        filter: true
    },
    {
        field: 'litros_mes',
        header: 'Litros mensuales',
        sortable: false,
        filter: true
    },
    {
        field: 'cuenta_mes',
        header: 'Cuenta mensual $',
        sortable: false,
        filter: true
    }
];
console.log("datos seleccionados",dataSelect)
console.log("children",children);

  const endpoint = '/controlmensual/';
  useEffect(() => {
    setLoading(true);
    getDatos(endpoint)
      .then((data) => {
        if (!data.hasError) {
          console.log("ordenioContext", data)
          const FormatDate = data.map(col => {
            const date = new Date(col.fecha_ord);
            const newdate = getLongMonthName(date);
            return { ...col, mes: newdate }
        });
          setDataList(FormatDate);
          setError(null);
          setReloadUsers(false);
        } else {
          console.error(".------------.--------.", data)
          setDataList(null);
          setError(data.error);
        };
      });
    setLoading(false);
  }, [reloadUsers])


  const createData = async (data) => {
    const endpoint= '/ordenio/'
    await createDato(endpoint, data)
      .then(response => {
        if (!response.hasError) {
          setDataList([...dataList, response]);
          setError(null);
          setReloadUsers(true);
          console.log("ingreso corrrecto")
          return true;
        } else {
          console.error(".------------.--------.", response.error)
          setError(response.error)
          return false;
        }
      })
      .catch(err => {
        console.error(err);
        window.alert("Hubo un error al guardar los datos: ", err);
      });

  };



  const deleteData = async (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );
    if (isDelete) {
      let newData = dataList.filter((el) => el.id !== id);
      setDataList(newData);
    } else {
      return;
    }
  };



  const data = {
    createData,
    deleteData,
    dataSelect,
    setDataSelect,
    loading,
    setLoading,
    error,
    setError,
    dataList,
    columns,
  };
  return (
    <OrdenioContext.Provider
      value={data}>
      {children}
    </OrdenioContext.Provider>
  )
}
export { OrdenioProvider };

export default OrdenioContext;