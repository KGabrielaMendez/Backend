import { Dialog, DialogActions, Stack, TextField } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Toast } from 'primereact/toast';
import GetOcupacionContext from './../../Context/common/ocupacionContext';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ModuloUsuarioContext from './../../Context/moduloUsuarioContext';
import ButtonAddEdit from '../common/buttons/addEdit';

const initialForm = {
  id: '',
  nombre_usr: '',
  apellido_usr: '',
  genero_usr: '',
  telefono_usr: '',
  cedula_usr: '',
  direccion_usr: '',
  email_usr: '',
  fecha_nac_usr: '',
  usuario: '',
  id_ocupacion: '',
  ocupacion: '',
  estado: 1
};

export const CrudForm = () => {
  //toast muestra mensajes emergentes
  const toast = useRef(null);
  const { createData,
    updateData,
    dataToEdit,
    setDataToEdit,
    error,
    deleteData
  } = useContext(ModuloUsuarioContext);

  const { listOcupacion, setSelected,
    selected } = useContext(GetOcupacionContext);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [dataDelete, setdataDelete] = useState([]);


  //para actualizar datos
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);

      console.log(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
      setdataDelete({
        id: dataToEdit.id,
        estado: 0,
        usuario: null,
        id_ocupacion: null,
        id_rol: null
      });

      console.log(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  //para ingresar o actualizar el id de ocupacion
  useEffect(() => {
    console.log("ocupacion: ", selected)
    setForm({
      ...form,
      id_ocupacion: selected
    })
  }, [selected]);

  //abrir cuadro de ingreso y actualizacion de datos
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    await deleteData(dataDelete,toast);
    if (!error) {
      toast.current.show({ severity: 'success', summary: 'Registro Eliminado', detail: 'Se eliminó correctamente' });
    } else {
      toast.current.show({ severity: 'error', summary: 'Error al agregar Datos', detail: {error} });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.nombre_usr || !form.apellido_usr || !form.direccion_usr || !form.fecha_nac_usr) {
      alert("Datos incompletos");
      return;
    }
    if (form.id === '') {
      await createData(form);
      if (!error) {
        toast.current.show({ severity: 'success', summary: 'Creado Correctamente', detail: 'Dato Creado' });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error al agregar Datos', detail: 'COntacte al admin' });
      }
    } else {
      await updateData(form);
      toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'Los datos han sido actualizados correctamente' });
    }
    handleReset();
  };


  const dynamicMenuItem = listOcupacion.map(col => {
    return <MenuItem key={col.id} value={col.id} >{col.ocupacion}</MenuItem>
  });



  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit("");
  };

  return (
    <>

      <ButtonAddEdit
        dataToEdit={dataToEdit}
        del={handleDelete}
        change={handleClickOpen} />

      <Toast ref={toast}></Toast>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle><b>AGREGAR EMPLEADO</b></DialogTitle>
        <DialogContent >
          <Toast ref={toast}></Toast>
          <div>
            {dataToEdit ?
              <>
                <h1>Editar Registro</h1>
                <h3>Nombre: {dataToEdit.nombre_completo}</h3>
              </>
              : <b>Ingrese los datos solicitados</b>}
            <br />
            <label>Nombre: </label>
            <input
              type="text" name="nombre_usr"
              placeholder="Ingrese nombre de empleado"
              onChange={handleChange}
              value={form.nombre_usr} /><p />

            <label>Apellido: </label>
            <input
              type="text" name="apellido_usr"
              placeholder="Ingrese apellido de empleado"
              onChange={handleChange}
              value={form.apellido_usr} /> <p />

            <label>Género: </label>
            <Select
              name="genero_usr"
              labelId="genero_usr"
              id="genero_usr"
              value={form.genero_usr}
              label="Género"
              onChange={e => {
                setForm({
                  ...form,
                  genero_usr: e.target.value
                })
              }} >
              <MenuItem key="Femenino" value="femenino" >Femenino</MenuItem>
              <MenuItem key="Masculino" value="masculino" >Masculino</MenuItem>
              <MenuItem key="Otro" value="otro" >Otro</MenuItem>
            </Select><p />

            <label>Teléfono:<br /> </label>
            <input
              type="text" name="telefono_usr"
              placeholder="Ingrese telefono de empleado"
              onChange={handleChange}
              value={form.telefono_usr} /><p />

            <label>Cédula: </label>
            <input
              type="text" name="cedula_usr"
              placeholder="Ingrese cedula de empleado"
              onChange={handleChange}
              value={form.cedula_usr} /><p />

            <label>Dirección: </label>
            <input
              type="text" name="direccion_usr"
              placeholder="Ingrese dirección de empleado"
              onChange={handleChange}
              value={form.direccion_usr} /><p />

            <label>Email: </label>
            <input
              type="text" name="email_usr"
              placeholder="Ingrese email de empleado"
              onChange={handleChange}
              value={form.email_usr} /><p />

            <Stack component="form" noValidate spacing={3}>
              <TextField
                name="fecha_nac_usr"
                id="date_nac"
                label="Fecha de Nacimiento"
                type="date"
                defaultValue={form.fecha_nac_usr}
                onChange={handleChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              /></Stack><p />

            <label>Ocupación: </label>
            {!dataToEdit ?
              <Select
                name="ocupacion"
                labelId="id_ocupacion"
                id="ocupacion"
                value={selected}
                label="ocupacion"
                onChange={e => { setSelected(e.target.value) }}
              >
                {dynamicMenuItem}
              </Select>
              :
              <Select
                name="ocupacion"
                labelId="id_ocupacion"
                id="ocupacion"
                value={form.id_ocupacion}
                label="ocupacion"
                onChange={e => { setSelected(e.target.value) }}
              >
                {listOcupacion.map(col => {
                  return <MenuItem key={col.id} value={col.id} >{col.ocupacion}</MenuItem>
                })
                }
              </Select>
            }



            <p />
            <p />

            <input type="reset" value="Limpiar" onClick={handleReset} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Agregar Datos</Button>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )

}
