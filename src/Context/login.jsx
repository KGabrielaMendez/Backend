import React, { createContext, useState } from "react";
import { useLocalStorage } from "../custom/useLocalStorage.js";
import {createLogin } from './../services/index';

const LoginContext = createContext();


const LoginProvider = ({ children }) => {

    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sesion, setSesion] = useLocalStorage('text','');
    const endpoint = '/auth/login/';
  

    const CreateLogin = async (data) => {
      await createLogin(endpoint, data)
        .then(response => {
          if (response.status <200 && response.status>=300) {
            //si hay error
            window.alert(response.data.message, '-----');
        } 
            //si se loguea correctamente
           
           try{
               const user = {
                   id: response.data.user.id,
                   usuario: response.data.user.usuario,
                   rol: response.data.user.id_rol,
                   token: response.data.token
               };
   
               setSesion(user);
               setError(null);
           }catch(error){
            window.alert(response.data.message);
            return;
           
        }
        })
        .catch(err => {
          console.error("Hubo un error al guardar los datos: ",err);
        });
    };
    const Logout =() => {
        setSesion(null);
    };



    const data = {
       
        loading,
        setLoading,
        error,
        setError,
        CreateLogin,
        Logout,
        sesion
       
    };
    return (
        <LoginContext.Provider
            value={data}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginProvider };
export default LoginContext;