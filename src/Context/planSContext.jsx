import React, { createContext, useState, useEffect } from 'react';
import { getDatos, createDato, getDato, updateDato } from '../services';
import { getLongMonthName } from './../consts/index';

const PlanSContext = createContext();

const PlanSProvider = ({ children }) => {

  const [dataToEdit, setDataToEdit] = useState('');
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadList, setReloadList] = useState(true);
  const endpoint = "/plansanitario/";

  const columnsProximo = [
    {
      field: "fecha_inicio",
      header: "Fecha",
      sortable: false,
      filter: true,
     
    },
    {
      field: "dosis",
      header: "Control",
      sortable: true,
      filter: true
    },
    {
      field: "nombre_gru",
      header: "Grupo",
      sortable: true,
      filter: true
    },
    {
      field: "descripcion_ps",
      header: "Descripción",
      sortable: false,
      filter: true
    },

    {
      field: "estado",
      header: "Estado",
      sortable: false,
      filter: true,
    
    },

  ]

  useEffect(() => {
    setLoading(true);
    getDatos(endpoint)
      .then((data) => {
        if (!data.hasError) {
          console.log("plansanitarioContext", data);
          const FormatDate = data.map(col => {
            const date = new Date(col.fecha_inicio)
            const newdate = getLongMonthName(date).concat('-', date.getFullYear());
            return { ...col, fecha_inicio: newdate }
        });
          setDataList(FormatDate);
          setError(null)
          setReloadList(false);
        } else {
          setDataList(null);
          setError(data.error)
        }
      })
    setLoading(false);
  }, [reloadList]);

  const createData = async (data) => {
    await createDato(endpoint, data)
      .then(response => {
        if (!response.hasError) {
          setDataList([...dataList, response]);
          setError(null);
          setReloadList(true);
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

  const updateData = async (data,toast) => {
    const endpoint = `/plansanitario/${data.id}`;
    await updateDato(endpoint, data)
      .then(response => {
        if (!response.hasError) {
          let newData = dataList.map(nuevo => (nuevo.id === data.id ? data : nuevo));
          setDataList(newData);
          setReloadList(true);
          setError(null);
        } else {
          setError(response.error)
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al guardar los datos:' });
          window.alert(" ", response.error);
        }
      })
      .catch(err => {
        console.error(err);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error en la conexión:' });
      });
  };

  const deleteData = async (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );
    if (isDelete) {
      let newData = dataList.filter((el) => el.id !== id);
      setDataList(newData);
      setReloadList(true);
      return true;
    } else {
      return;
    }
  };

  console.log(dataList,'con formato de fecha')
  const data = {
    dataToEdit,
    setDataToEdit,
    createData,
    deleteData,
    loading,
    setLoading,
    error,
    setError,
    dataList,
    setDataList,
    columnsProximo,
    reloadList,
    updateData
  };
  return (
    <PlanSContext.Provider
      value={data}>
      {children}
    </PlanSContext.Provider>
  )
}
export { PlanSProvider };
export default PlanSContext;