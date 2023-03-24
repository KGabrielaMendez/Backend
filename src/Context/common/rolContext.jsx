
import React, { useEffect, createContext, useState } from 'react';
import { createDato, getDatos, updateDato } from '../../services';

const RolContext = createContext();

const RolProvider = ({ children}) => {
    const [listRol,setList] = useState([]);
    const [dataToEdit, setDataToEdit] = useState([]);
    const [reloadList,setReloadList] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const endpoint='/roles/';

    useEffect(() => {
        setLoading(true);
        getDatos(endpoint)
        .then((list) => {
            if(!list.hasError){
                setList(list);
                setReloadList(false);
                setError(null);
            }else{
                setList(null);
                setError(list.error);
            }
        });
        console.log("RolesContext: ",listRol)
        setLoading(false);
        // eslint-disable-next-line
    },[reloadList]);

    const createData = async (data) => {
        await createDato(endpoint, data)
          .then(response => {
            if (!response.hasError) {
              setList([...listRol, response]);
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
        const endpoint = `/roles/${data.id}`;
        await updateDato(endpoint, data)
          .then(response => {
            console.log(response + '==respuestaupdtae');
            if (!response.hasError) {
              let newData = listRol.map(nuevo => (nuevo.id === data.id ? data : nuevo));
              console.log("hasta aqui va bien")
              setList(newData);
              setReloadList(true);
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


    const data = {
        listRol,
        dataToEdit,
        setDataToEdit,
        error,
        loading,
        createData,
        updateData


    };
    return (
        <RolContext.Provider
        value={data} >
            {children}

        </RolContext.Provider>
    )

}

export {RolProvider};
export default RolContext;