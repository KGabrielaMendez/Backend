import React, { createContext,useEffect,useState } from 'react';
import { createDato, getDatos } from '../services/index';

const InventarioContext = createContext();

const InventarioProvider = ({ children}) => {
    const [dataList, setDataList] = useState([]);
    const [reloadList, setReloadList] = useState(true);
    const [selected, setSelected] = useState('');
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        { 
            field: 'nombre_pro',
            header: 'Producto',
            sortable:true,
            filter: true,
        },
        { 
            field: 'cantidad',
            header: 'Cantidad',
            sortable:true,
        },
        { 
            field: 'categoria_pro',
            header: 'Categoría',
            sortable:true,
            filter: true,
        },
    ];

    const endpoint = '/inventario/';

    useEffect(() =>{
        setLoading(true);
        getDatos(endpoint)
            .then ((list) => {
                if(!list.hasError){
                    console.log("Inventario: ", list);
                    setDataList(list);
                    setReloadList(false);
                    setError(null);
                }else{
                    console.error(".--------.", list.error)
            setDataList(null);
            setError(list.error);
                }
            });
            console.log("InventarioContext Lista:: ",dataList);
            setLoading(false);
    },[reloadList]);

    const createData = async (data,endpoint) => {
        await createDato(endpoint, data)
          .then(response => {
            console.log(response + 'crear entrada');
            if (!response.hasError) {
              setDataList([...dataList, response]);
              setReloadList(true);
            } else {
              setError(response.hasError)
            }
          })
          .catch(err => {
            console.error(err);
            window.alert("Hubo un error al guardar los datosC: ", err);
          });
    
      };




    const data = {
       dataList,
       setSelected,
       selected,
       columns,
       error,setError,
       loading,
       setLoading,
       createData,
       reloadList,setReloadList
    };
    return (
        <InventarioContext.Provider
        value={data} >
            {children}
        </InventarioContext.Provider>
    )
}

export {InventarioProvider};
export default InventarioContext;

