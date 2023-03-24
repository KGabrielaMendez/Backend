import {Dialog, DialogActions, Stack, TextField } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react'

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import OrdenioContext from './../../Context/ordenioContext';

const initialForm = {
  fecha_ord: null,
  litros_ord: null,
  numerovacas_ord: null
}
export const CrudForm = () => {
  const toast = useRef(null);
  const { createData , error} = useContext(OrdenioContext);

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState(initialForm);
  const [date, setDate] = useState('');

  //abrir y cerrar ventana
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //guarda datos ingresados en form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    console.log(form, ' :crudForm');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.litros_ord || !form.fecha_ord) {
      alert("Datos incompletos--", form.litros_ord, " <- grupo");
      return;
    }
    await createData(form)
      .then(res => {
        console.log(res)
        if (!error) {
          console.log("trueeeeeeeee")
          toast.current.show({ severity: 'success', summary: 'Creado Correctamente', detail: 'Dato Creado' });

        } else {
          toast.current.show({ severity: 'error', summary: 'Error al crear Dato', detail: 'No se ingresó el registro, problemas de conexión' });
        }
      })

  };
  //limpiar campos para ingresar nuevo dato
  const handleReset = (e) => {
    setForm([]);
  };


  const today = new Date();
  useEffect(() => {

    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    setDate(yyyy + '-' + mm + '-' + dd);
  })
  console.log(new Date().toDateString(), ' fechaaa');

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained" color="success"
          onClick={handleClickOpen} >
          Agregar Dato
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose} >
        <Toast ref={toast}></Toast>
        <DialogTitle>AGREGAR REGISTRO DIARIO</DialogTitle>
        <DialogContent >
          <form onSubmit={handleSubmit}>

            <label>Fecha: </label><p />
            <Stack component="form" noValidate spacing={3}>
              <TextField
                name="fecha_ord"
                id="date"
                label="Fecha"
                type="date"
                defaultValue={date}
                onChange={handleChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              /></Stack>
            <p /> <p />

         <div>    <label>Litros Totales:</label> <label>Vacas Ordeñadas:</label> <p /></div>
            <input
              type="number" name="litros_ord"
              placeholder="Ingrese Litros Totales"
              onChange={handleChange} />                      
            <input
              type="number" name="numerovacas_ord"
              placeholder="Numero de vacas ordeñadas"
              onChange={handleChange} /><p/>

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
