import { API_URL } from '../../consts/index';
import axios from "axios";


const endpoint = '/ganado/';

let item;
let config;
try {   
    item=  JSON.parse(window.localStorage.getItem('text'));
    config = {
        headers: {
            'x-token': `${item.token}`
        }
    };
} catch (e) {
    //console.error(e);
}

export const getDatos = async (endpoint) => {
try {   
    item=  JSON.parse(window.localStorage.getItem('text'));
    
    config = {
        headers: {
            'x-token': `${item.token}`
        }
    };
} catch (e) {
    console.error(e);
}
    console.log(endpoint,config,'tokenservice');
    try {
        const peticion = await axios.get(`${API_URL}${endpoint}`,config);
        console.log(peticion,'despues de axios');
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

export const getDato = async (endpoint,id) => {
    console.log('services/crud: ', id);
    try {
        const response = await axios.get(`${API_URL}${endpoint}${id}`,config);
        if (response.data) {
            return response.data
        };
    } catch (error) {
        return {
            hasError: true,
            error
        };
    };
};

export const createDato = async (endpoint, state,token) => {
    try {
        console.log(endpoint,"datos en services");
        const response = await axios
            .post(`${API_URL}${endpoint}`, state,config)
            .then((response)=> {
                console.log("then de response", response);
                return response;
            })
            .catch(({response})=> {
                return response;
            })
        if (response) {
            return response;
        } else {
            console.log("error en else de response")
            return {
                hasError: true,
            }
        }
    } catch (error) {
        console.log("error en catch de createDato", error);
        return {
            hasError: true,
            error
        };
    };
};

export const updateDato = async (endpoint, data) => {
    try {
        const response = await axios.put(
            `${API_URL}${endpoint}`, data,config
        );

        if (response.data) {
            return response.data
        };
    } catch (error) {
        return {
           hasError: true,
            error
        }
    }
};

export const descarteDato = async (id, data) => {
    try {
        const response = await axios.put(
            `${API_URL}${endpoint}${id}`, data,config
        );

        if (response.data) {
            return response.data
        };
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }
};
export const deleteDato = async id => {
    try {
        const response = await axios.delete(`${API_URL}${endpoint}${id}`,config);

        if (response.data) {
            return response.data;
        };
    } catch (error) {
        return {
            hasError: true,
            error
        };
    };
};
