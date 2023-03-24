import { API_URL } from '../../../consts/index';
import axios from "axios";


//const endpoint = '/ganadogrupo/';
let item;
let config;
export const getGanadoGrupo = async (endpoint) => {
    try {   
        item=  JSON.parse(window.localStorage.getItem('text'));
        console.log(item.token,'x-tokrn');
        config = {
            headers: {
                'x-token': `${item.token}`
            }
        };
    } catch (e) {
        console.error(e);
    }
    try {
        const peticion = await axios.get(`${API_URL}${endpoint}`,config);
        if(peticion.data){
            return peticion.data;
        };
    } catch (error) {
        return {
            hasError: true,
            error
        };
    };  
};

