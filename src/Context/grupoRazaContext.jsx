import React, {useState } from 'react';
import { createContext, useEffect } from 'react';
import { getDatos } from '../services/CRUD/index';

const GetContext = createContext();

const GetGrupoProvider = ({children}) => {

const [dataListGrupo, setDataListGrupo] =useState([]);
const [dataListRaza, setDataListRaza] =useState([]);
const [grupo, setGrupo] = useState('');
const [raza, setRaza] = useState('');

const handleChangeGrupo = (event) => {
        setGrupo(event.target.value);
        console.log(grupo,'grupo en context')
}; 

const handleChangeRaza = (event) => {
        setRaza(event.target.value);
};
const endpointgrupo = '/grupo';
const endpointraza = '/raza';

useEffect(() => {

    getDatos(endpointgrupo)
    .then((data) => {
        if (!data.hasError) {
            console.log(data,'datos clase useeffect')
            setDataListGrupo(data);
        } else {
            setDataListGrupo("no hsy datos")
        }
    });
    
},[endpointgrupo]);

useEffect(() => {

    getDatos(endpointraza)
    .then((data) => {
        if (!data.hasError) {
            console.log(data,'datos clase useeffect raza')
            setDataListRaza(data);
        } else {
            setDataListRaza("no hsy datos")
        }
    });
    
},[endpointraza]);



const data = {

    grupo,setGrupo,
    raza, setRaza,
    dataListGrupo,setDataListGrupo,
    dataListRaza, setDataListRaza,
    handleChangeGrupo, handleChangeRaza
};

return (
    <GetContext.Provider
      value={data}>
      {children}
    </GetContext.Provider>
)

}

export { GetGrupoProvider};
export default GetContext;