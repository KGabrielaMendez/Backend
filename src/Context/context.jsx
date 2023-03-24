import React, { createContext, useEffect, useState } from "react";
import { getDatos, createDato, updateDato } from './../services/index';

const Context = createContext();


const Provider = ({ children }) => {

    const [dataToEdit, setDataToEdit] = useState('');
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState();
    const [reloadUsers, setReloadUsers] = useState(true)
  
    const endpoint = '/comerciante/';
    useEffect(() => {
      setLoading(true);
      getDatos(endpoint)
        .then((data) => {
          if (!data.hasError) {
            console.log("Usuarios---...", data)
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
    }, [reloadUsers]);

    

    const createData = async (data) => {
      await createDato(endpoint, data)
        .then(response => {
          console.log(response + '==respuesta');
          if (!response.hasError) {
            setDataList([...dataList, response]);
            setError(null);
          } else {
            setError(response.error)
          }
        })
        .catch(err => {
          console.error(err);
          window.alert("Hubo un error al guardar los datos: ", err);
        });
    };

    const updateData = async (data) => {
      const endpoint = `/comerciante/${data.id}`;
      console.log(data.id + '==respuestaendpoint-----');
      console.log(data.estado + '==ESTADOOOOOO');
      await updateDato(endpoint, data)
        .then(response => {
          console.log(typeof JSON.stringify(response)+ '==respuestaupdtae');
          if (!response.hasError) {
            let newData = dataList.map(nuevo => (nuevo.id === data.id ? data : nuevo));
            setDataList(newData);
            setError(null)
          } else {
            setError(response.error);
          }
        })
        .catch(err => {
          console.error(err);
          window.alert("Hubo un error al guardar los datos: ", err);
        });
    };

    const deleteData = async (data) => {
      let isDelete = window.confirm(
        `¿Estás seguro de eliminar el registro de '${dataToEdit.nombre_com}'?`
      );
        console.log("--estadocontext: ", data)
      if (isDelete) {
        let endpointd = `${endpoint}/${data.id}/`;
        await updateDato(endpointd, data)
        .then(response => {
            console.log(response+ '==respuestadelete');
            if (!response.hasError) {
              setReloadUsers(true);
              setError(null)
            } else {
              setError(response.error);
            }
          })
          .catch(err => {
            console.error(err);
            window.alert("Hubo un error al guardar los datos: ", err);
          });
      };
    }

    const data = {
        dataToEdit,
        setDataToEdit,
        loading,
        setLoading,
        error,
        setError,
        dataList,
        createData,
        updateData,
        deleteData
    };
    return (
        <Context.Provider
            value={data}>
            {children}
        </Context.Provider>
    )
}

export { Provider };
export default Context;