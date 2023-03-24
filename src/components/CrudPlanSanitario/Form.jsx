import React, { useContext, useEffect, useState, useRef } from 'react';

import { Dialog, DialogActions, Select, MenuItem, TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import SelectItemGrupo from '../common/selectItem/Grupo';

import PlanSContext from '../../Context/planSContext';
import { getDatos } from '../../services';
import GetContext from '../../Context/grupoRazaContext';
import LoginContext from '../../Context/login';
import { ADMIN_ROLE } from '../../consts';

export const FormPlanS = () => {
    const {sesion}=useContext(LoginContext);
    const toast = useRef(null);
    const {
        setDataToEdit,
        dataToEdit,
        setLoading,
        createData
    } = useContext(PlanSContext);
    const {
        dataListGrupo, grupo,
        handleChangeGrupo
    } = useContext(GetContext);

    const [dosisList, setDosisList] = useState([]);
    const [dosis, setDosis] = useState([]);

    const endpoint = '/dosis/';
    useEffect(() => {
        setLoading(true);
        getDatos(endpoint)
            .then((data) => {
                if (!data.hasError) {
                    console.log("Dosiis---...", data)
                    setDosisList(data)
                } else {
                    console.error(".------------.--------.", data)
                };
            });
        setLoading(false);
    }, [endpoint]);



    const [open, setOpen] = useState(false);
    const [form, setForm] = useState([]);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);

            console.log(dataToEdit);
        } else {
            setForm([]);
        }
    }, [dataToEdit]);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        setForm({
            ...form,
            id_dosis: dosis,
            id_gru: grupo

        })
        console.log('en array', dosis, grupo);
    }, [dosis, grupo]);

    const handleChangeDosis = (e) => {
        console.log(e.target.value, 'dosis seleccionada');
        setDosis(e.target.value);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
        console.log("dosis....", form)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();     //para que no se autoprocese el form
        if (!form.id_dosis || !form.fecha_inicio || !form.estado|| !form.descripcion_ps) {
            alert("Datos incompletos");
            return;
        }
        // if (dataToEdit) {
        //     await updateData(form);
        //     toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'Los datos han sido actualizados correctamente' });
        // } else {
        await createData(form);
        toast.current.show({ severity: 'success', summary: 'Creado Correctamente', detail: 'Dato Creado' });

        //   }
        handleReset();
    };

    const handleReset = (e) => {
        setForm([]);
        setDataToEdit([]);
    };


    const dynamicMenuItem = dosisList.map(col => {
        return <MenuItem key={col.id} value={col.id} >{col.dosis}</MenuItem>
    });

    return (
        <>
      
           
                <Button label="Nuevo"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={handleClickOpen}
                />
               
            

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>AGREGAR</DialogTitle>
                <DialogContent >
                    <Toast ref={toast}></Toast>
                    <form onSubmit={handleSubmit}>

                        {dataToEdit ?
                            <>
                                <h1>Editar Registro</h1>
                            </>
                            : <h1>Agregar Dato </h1>}

                        <label>Grupo: </label><p />
                        <SelectItemGrupo
                            grupo={grupo}
                            dataListGrupo={dataListGrupo}
                            handleChangeGrupo={handleChangeGrupo} />

                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="component-disabled"
                            label={"Dosis"}
                            onChange={handleChangeDosis}
                            variant="outlined"
                            defaultValue={"Control"}
                        >
                            <MenuItem key="0" value="Control" disabled={true}>Seleccione Control</MenuItem>
                            {dynamicMenuItem}
                        </Select>

                        <TextField
                            required
                            id="fecha_inicio"
                            name="fecha_inicio"
                            type='date'
                            label="Fecha de control"
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }} />

                        <TextField
                            id="descripcion_ps"
                            name="descripcion_ps"
                            label="Descripción"
                            variant="filled"
                            defaultValue={form.descripcion_ps}
                            onChange={handleChange} />
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="estado_ps"
                            name="estado"
                            label="Estado"
                            variant="filled"
                            defaultValue={"Estado"}
                            value={form.estado}
                            onChange={handleChange} >
                            <MenuItem key="0" value="Estado" disabled={true}>Estado</MenuItem>
                            <MenuItem key="1" value="completo" >Completo</MenuItem>
                            <MenuItem key="2" value="pendiente" >Pendiente</MenuItem>

                        </Select>

                        <input type="reset" value="Limpiar" onClick={handleReset} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Agregar Datos</Button>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>

        </>
    )

}
