import { createContext, useState } from "react";
import { useLocalStorage } from "../custom/useLocalStorage.js";
import { createDato } from "../services";

const AuthContext = createContext();

const initialAuth = null;

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialAuth);
    const [credentials, setCredentials] = useLocalStorage([]);
    const endpoint = '/auth/login/';

    const handleAuth = (e) => {
        if (auth) {
            setAuth(null);
        } else {
            setAuth(true);
        }
    };

    const Auth = async (data) => {
        await createDato(endpoint, data)
            .then(response => {
                console.log(response.message,'antes de if')
                if (response.message) {
                    //si hay error
                    window.alert(response.message, '-----');

                } else {
                    //si se loguea correctamente
                    const user = {
                        id: response.data.user.id,
                        usuario: response.data.user.usuario,
                        rol: response.data.user.id_rol,
                        token: response.data.token
                    }


                    window.localStorage.setItem(
                        'loggedUser', JSON.stringify(user)
                    );
                    setCredentials(user);
                    console.error(credentials, 'credenciales');
                    setError(null);
                    formik.resetForm();
                }
            })
            .catch(error => {
                window.alert(error, 'sajdhg');
            })

    }

    const data = { auth, handleAuth, Auth };

    return (
        <AuthContext.Provider
            value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;