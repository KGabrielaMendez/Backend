import { API_URL } from '../../../consts/index';
import axios from "axios";

const endpoint = '/ganadogrupo/';

//obtener el ganado que pertenece a X grupo
export const getGrupoByGanado = async (params) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}${params}`);
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

export const getGrupos = async () => {
    try {
        const response = await axios.get(`${API_URL}/grupo`);
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


export const descarteGrupo= async (id, data) => {
    try {
        const response = await axios.put(
            `${API_URL}${endpoint}${id}`, data
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