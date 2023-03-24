import React, {useContext } from 'react';
import { useFormik } from 'formik';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
//import { CountryService } from '../service/CountryService';
import logo from './../../assets/hacienda-Acapulco.jpg';
import './index.css';
import LoginContext from '../../Context/login';


const Login = () => {

    const {CreateLogin } = useContext(LoginContext);

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: '',
        },
        validate: (data) => {
            let errors = [];
            if (!data.usuario) {
                errors.name = 'Nombre de usuario es requerido.';
            }
            // if (!data.email) {
            //     errors.email = 'Email es requerido.';
            // }
            // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            //     errors.email = 'e-mail inválido. Ejemplo: example@email.com';
            // }
            if (!data.password) {
                errors.password = 'Contraseña requerida.';
            }
            return errors;
        },
        onSubmit: async (data) => {
            await CreateLogin(data);
            
        }

    });


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const passwordHeader = <h6>Contraseña</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Al menos una mayúscula</li>
                <li>Al menos una minúscula</li>
                <li>Al menos un número</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

    return (
        <>

            <div className="form-demo">

                <div className="flex justify-content-center">
                    <div className="card">
                        <h1 align="center">HACIENDA ACAPULCO</h1>
                        <div align="center">
                            <Image src={logo} template="Preview Content" alt="Image Text" align="center" />
                        </div>
                        {/* <h3 align="center">Cría y reproducción de Ganado Bovino</h3> */}

                        <h5 className="text-center">Inicio de Sesión</h5>
                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText
                                        id="name" name="usuario"
                                        value={formik.values.usuario}
                                        onChange={formik.handleChange}
                                        autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                    <label
                                        htmlFor="name"
                                        className={classNames({ 'p-error': isFormFieldValid('name') })}
                                    >
                                        Nombre*
                                    </label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                        className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                    <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Contraseña*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>


                            <Button type="submit" label="Iniciar Sesión" className="mt-2" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;