import React, { createContext, useEffect, useState,useContext } from "react";
import { getDatos, createDato, updateDato } from './../services/index';
import LoginContext from './login';

const ModuloUsuarioContext = createContext();


const ModuloUsuarioProvider = ({ children }) => {

    const [dataToEdit, setDataToEdit] = useState('');
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState();
    const [reloadUsers, setReloadUsers] = useState(false)
    const columns= [
      {
          field: 'nombre_completo',
          header: 'Nombre y Apellido',
          sortable: true,
          filter: true
      },
      {
          field: 'genero_usr',
          header: 'Género',
          sortable: true,
          filter: true
      },
      {
          field: 'telefono_usr',
          header: 'Teléfono',
          sortable: true,
          filter: true
      },    
      {
        field: 'direccion_usr',
        header: 'Dirección',
        sortable: true,
        filter: true
    }, 

    {
      field: 'ocupacion',
      header: 'Ocupación',
      sortable: true,
      filter: true
  }
    ];
    const {sesion} = useContext(LoginContext);

    const endpoint = '/empleados/';
    useEffect(() => {
      setLoading(true);
      getDatos(endpoint)
        .then((data) => {
          if (!data.hasError) {
            console.log("Usuarios", data)
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
      const endpoint = '/empleados/'
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
      const endpoint = `/empleados/${data.id}`;
      console.log(data.id + '==respuestaendpoint-----');
      console.log(data + '==data usuario en context');
      await updateDato(endpoint, data)
        .then(response => {
          console.log(response+ '==respuestaupdtae');
          if (!response.hasError) {
            let newData = dataList.map(nuevo => (nuevo.id === data.id ? data : nuevo));
            setReloadUsers(true);
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

    const deleteData = async (data,toast) => {
      if(sesion.id === data.id){
        toast.current.show({ severity: 'error', summary: 'USUARIO ACTUAL', detail: 'ESTE USUARIO NO SE PUEDE ELIMINAR' });
        setError("Usuario Actual");
        return;
      }
      let isDelete = window.confirm(
        `¿Estás seguro de eliminar el usuario '${dataToEdit.nombre_completo}'?`
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
        setDataList,
        columns,
        createData,
        updateData,
        deleteData,
        reloadUsers,
        setReloadUsers
    };
    return (
        <ModuloUsuarioContext.Provider
            value={data}>
            {children}
        </ModuloUsuarioContext.Provider>
    )
}

export { ModuloUsuarioProvider };
export default ModuloUsuarioContext;