import { API_URL } from '../../../consts/index';
import axios from "axios";


//const endpoint = '/plansanitario/';


export const getGanadoGrupo = async (endpoint) => {
    try {
        const peticion = await axios.get(`${API_URL}${endpoint}`);
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

