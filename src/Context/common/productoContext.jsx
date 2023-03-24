
import React, { useEffect, createContext, useState } from 'react';
import { createDato, getDatos, updateDato } from '../../services';

const ProductoContext = createContext();

const ProductoProvider = ({ children}) => {
    const [list,setList] = useState([]);
    const [dataToEdit, setDataToEdit] = useState([]);
    const [reloadList,setReloadList] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const columns = [
        { 
            field: 'nombre_pro',
            header: 'Producto',
            sortable: true,
            filter:true,
        },
        { 
            field: 'descripcion_pro',
            header: 'Descripcion',
            sortable: true,
            filter:true,
        },
        { 
            field: 'categoria_pro',
            header: 'Categoría',
            sortable: true,
            filter:true,
        },
    ];
    const endpoint='/productos/';

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
        console.log("ProductoContext: ",list)
        setLoading(false);
        // eslint-disable-next-line
    },[reloadList]); 

    const createData = async (data) => {
        await createDato(endpoint, data)
          .then(response => {
            if (!response.hasError) {
              setList([...list, response]);
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
        const endpoint = `/productos/${data.id}`;
        await updateDato(endpoint, data)
          .then(response => {
            console.log(response + '==respuestaupdtae');
            if (!response.hasError) {
              let newData = list.map(nuevo => (nuevo.id === data.id ? data : nuevo));
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
        list,
        dataToEdit,
        setDataToEdit,
        error,
        loading,
        columns,
        createData,
        updateData


    };
    return (
        <ProductoContext.Provider
        value={data} >
            {children}

        </ProductoContext.Provider>
    )

}

export {ProductoProvider};
export default ProductoContext;