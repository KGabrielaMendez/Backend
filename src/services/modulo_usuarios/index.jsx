import {API_URL}from '../../consts/index';
import axios from "axios";



//cambiar estado de usuarios 
export const ChangeState = async (endpoint, data) => {
    try {
        const response = await axios.put(
            `${API_URL}${endpoint}`, data
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