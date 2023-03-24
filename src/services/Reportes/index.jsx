import { API_URL } from '../../consts/index';
import axios from "axios";

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
};
export const getReporte = async (endpoint,fecha_inicio,fecha_fin) => {
    console.log('services/reportes: ', fecha_inicio,fecha_fin);
    try {
        const response = await axios.get(`${API_URL}${endpoint}${fecha_inicio}/${fecha_fin}`,config);
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
export const getReporteAnio = async (endpoint,anio) => {
    console.log('services/reportes: ', fecha_inicio,fecha_fin);
    try {
        const response = await axios.get(`${API_URL}${endpoint}${anio}`,config);
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