import React, { useContext, useEffect, useState, useRef } from 'react';

import { Stack, TextField } from '@mui/material';
import CrudContext from '../../Context/crudContext';
import { Dialog, DialogActions } from '@mui/material';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const initialForm =
{
    id: '',
    motivodesc_gan: '',
    fechadesc_gan: '',
    estado: '',
};

export const Descarte = () => {
    const toast = useRef(null);
    const {
        updateData,
        dataToEdit,
        setDataToEdit,
        error,
    } = useContext(CrudContext);
    const [open, setOpen] = React.useState(false);
    const [descarte, setDescarte] = useState(initialForm);

    useEffect(() => {
        if (dataToEdit) {
            setDescarte({
                id: dataToEdit.id,
                estado: 0,
                id_grupo: null,
                id_raza: null,
                motivodesc_gan:''
            });
            console.log(descarte, 'esto es descarte');
        }
    }, [dataToEdit]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDataToEdit('');
    };

    const handleChange = (e) => {
        setDescarte({
            ...descarte,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();     //para que no se autoprocese el form
        if (!descarte.motivodesc_gan || !descarte.fechadesc_gan) {
            alert("Datos incompletos ");
            return;
        }
        console.error("AQUI SE ACTUALIZA, LOS DATOS SON: ", descarte);

        await updateData(descarte);
        if (!error) {
            toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'Los datos han sido actualizados correctamente' });
            handleReset();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Los datos no se han guardado' });
        }
        setDataToEdit('');

    };

    const handleReset = () => {
        setDescarte(initialForm);
    };

    return (
        <>
            <Button
            disabled={!dataToEdit}
            label="DESCARTES"
            icon="pi pi-trash" 
            className="p-button-danger" 
            onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose} >
                <Toast ref={toast}></Toast>
                <DialogTitle>DESCARTE DE GANADO</DialogTitle>
                <DialogContent >
                       {/*  {dataToEdit.arete_gan ? 
                    <h4>{dataToEdit.arete_gan }
                        </h4>
                        :
                        <h4>{dataToEdit.nombre_gan} </h4>
                        } */}
                   
                    <TextField
                            id='ganadoDescarte'
                            type="text" 
                            name="motivodesc_gan"
                            label="Ingrese Motivo"
                            onChange={handleChange}
                            value={descarte.motivodesc_gan}
                        />
                    <p/>
                    <Stack component="form" noValidate spacing={3}>
                        <TextField
                            name="fechadesc_gan"
                            id="outlined"
                            label="Fecha de Descarte"
                            type="date"
                            onChange={handleChange}
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /></Stack><p />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Agregar Datos</Button>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>



        </>
    )

}