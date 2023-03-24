import React, { createContext, useEffect, useState } from "react";
import { createDato, updateDato } from '../services/CRUD/index';
import { getGanadoGrupo } from './../services/';

const CrudContext = createContext();


const CrudProvider = ({ children }) => {

  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false)
  const columns = [
    {
      field: "arete_gan",
      header: "Numero de Arete",
      sortable: true,
      filter: true
    },
    {
      field: "nombre_gan",
      header: "Nombre de Caballo",
      sortable: true,
      filter: true
    },
    {
      field: "tipo_gan",
      header: "Tipo de Ganado",
      filter: true
    },
    {
      field: "fechanac_gan",
      header: "Fecha de Nacimiento",
      filter: false
    },
    {
      field: "sexo_gan",
      header: "Sexo",
      filter: false
    },
    {
      field: "nombre_gru",
      header: "Grupo",
      filter: true,
      sortable: true
    },
    {
      field: "nombre_ra",
      header: "Raza",
      filter: false,
      sortable: true
    }
  ];

  const ganado = '/ganadoGrupo/';
  useEffect(() => {
    setLoading(true);
    getGanadoGrupo(ganado)
      .then((data) => {
        if (!data.hasError) {
          console.log("crudContext", data)
          setDataList(data)
          setReloadUsers(false)
          setError(null);
        } else {
          console.error(".------------.--------.", data)
          setDataList(null);
          setError(data.error);
        };
      });
    setLoading(false);
  }, [reloadUsers])


  const createData = async (data) => {
    const endpoint = '/ganado'
    await createDato(endpoint, data)
      .then(response => {
        console.log(response + '==respuesta');
        if (!response.hasError) {
          setDataList([...dataList, response]);
        } else {
          setError(response.hasError)
        }
      })
      .catch(err => {
        console.error(err);
        window.alert("Hubo un error al guardar los datosC: ", err);
      });

  };


  const updateData = async (data) => {
    const endpoint = `/ganado/${data.id}`;
    await updateDato(endpoint, data)
      .then(response => {
        console.log(response + '==respuestaupdtae');
        if (!response.hasError) {
          let newData = dataList.map(nuevo => (nuevo.id === data.id ? data : nuevo));
          console.log("hasta aqui va bien")
          setDataList(newData);
          setReloadUsers(true);
          setError(null);
        } else {
          setError(response.error)
          window.alert("Hubo un error al guardar los datos: ", response.error);
        }
      })
      .catch(err => {
        console.error(err);
        window.alert("Hubo un error al guardar los datos: ", err);
      });
  };

  const deleteData = async (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar este registro con el id '${id}'?`
    );
    if (isDelete) {
      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };



  const data = {
    createData,
    updateData,
    deleteData,
    dataToEdit,
    setDataToEdit,
    loading,
    setLoading,
    error,
    setError,
    dataList,
    columns
  };
  return (
    <CrudContext.Provider
      value={data}>
      {children}
    </CrudContext.Provider>
  )
}
export { CrudProvider };

export default CrudContext;