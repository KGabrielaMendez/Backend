import React, {useState } from 'react';
import { createContext, useEffect } from 'react';
import { createDato, getDatos, updateDato } from '../../services/index';

const GetOcupacionContext = createContext();

const GetOcupacionProvider = ({children}) => {

const [listOcupacion, setListOcupacion] =useState([]);
const [selected, setSelected] = useState('');
const [reloadUsers, setReloadUsers] = useState(true);
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const columns =[
    
        {
            field: 'ocupacion',
            header: 'Puestos de Trabajo',
            sortable: true,
            filter: true
        },
    
]

const handleChangeOcup = (event) => {
        setListOcupacion(event.target.value);
}; 

const endpoint = '/ocupaciones/';

useEffect(() => {
setLoading(true);
    getDatos(endpoint)
    .then((data) => {
        if (!data.hasError) {
            console.log(data,'datos ocupacion')
            setListOcupacion(data);
            setReloadUsers(false);
        } else {
            setListOcupacion("no hay datos")
        }
    });
    setLoading(false);
},[reloadUsers]);

const createData = async (data) => {
    await createDato(endpoint, data)
      .then(response => {
        console.log(response + '==respuesta');
        if (!response.hasError) {
          setListOcupacion([...listOcupacion, response]);
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
    let endpointd = `${endpoint}/${data.id}/`;
    console.log(data.id + '==respuestaendpoint-----');
    console.log(data + '==data usuario en context');
    await updateDato(endpointd, data)
      .then(response => {
        console.log(response+ '==respuestaupdtae');
        if (!response.hasError) {
          let newData = listOcupacion.map(nuevo => (nuevo.id === data.id ? data : nuevo));
          setReloadUsers(true);
          setListOcupacion(newData);
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
      `¿Estás seguro de eliminar el registro de '${selected.ocupacion}'?`
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

    selected, setSelected,
    listOcupacion,setListOcupacion,
    handleChangeOcup,
    columns,
    deleteData,
    error,
    setError,
    createData,
    loading,
    updateData

};

return (
    <GetOcupacionContext.Provider
      value={data}>
      {children}
    </GetOcupacionContext.Provider>
)

}

export { GetOcupacionProvider};
export default GetOcupacionContext;