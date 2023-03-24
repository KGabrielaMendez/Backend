import { API_URL } from '../consts/index';
import axios from "axios";

export const createLogin = async (endpoint, state) => {
    try {
        console.log(endpoint,"datos en services");
        const response = await axios
            .post(`${API_URL}${endpoint}`, state)
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