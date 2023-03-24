import { Dialog, DialogActions, TextField } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { RolProvider } from "../../../Context/common/rolContext";

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Toast } from 'primereact/toast';
import MenuItem from '@mui/material/MenuItem';
import ModuloUsuarioContext from './../../../Context/moduloUsuarioContext';
import SelectItem from '../../common/selectItem/Comerciante';
import RolContext from '../../../Context/common/rolContext';
import './SpeedDialDemo.css';


export const CrudFormUser = () => {
  //toast muestra mensajes emergentes
  const toast = useRef(null);
  const { createData,
    updateData,
    dataToEdit,
    setDataToEdit,
    error,
    deleteData
  } = useContext(ModuloUsuarioContext);

  const { listRol } = useContext(RolContext);

  const [rol, setRol] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState([]);
  const [dataDelete, setdataDelete] = useState([]);

  //para actualizar datos
  useEffect(() => {
    if (dataToEdit) {
      setdataDelete({
        id: dataToEdit.id,
        estado: 0
      });
      setForm({
        id: dataToEdit.id,
      });

      console.log(dataToEdit);
    } else {
      setForm([]);
    }
  }, [dataToEdit]);

  //para ingresar o actualizar el id de rol
  useEffect(() => {
    console.log("rol: ", rol)
    setForm({
      ...form,
      id_rol: rol,
    })
  }, [rol]);

  //abrir cuadro de ingreso y actualizacion de datos
  const handleClickOpen = () => {
    if (dataToEdit.usuario) {
      toast.current.show({ severity: 'warn', summary: 'No procesado!', detail: 'El empleado ya tiene registrado un usuario' });
      return;
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    console.log(dataDelete, '::::::editado')
    await deleteData(dataDelete);
    if (!error) {
      toast.current.show({ severity: 'delete', summary: 'Registro Eliminado', detail: 'Se eliminó correctamente' });
    } else {
      toast.current.show({ severity: 'error', summary: 'Error al agregar Datos', detail: 'COntacte al admin' });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    console.log("Datos para crear usuario: ", form)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.id_rol || !form.id || !form.password || !form.usuario) {
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
      if (!error) {
        toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'Los datos han sido actualizados correctamente' });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error al crear Usuario', detail: 'COntacte al admin' });
      }
    }
    handleReset();
  };
  const handleChangeRol = (event) => {
    setRol(event.target.value);
  };

  const dynamicMenuItem = listRol.map(col => {
    return <MenuItem key={col.id} value={col.id} >{col.tipo_rol}</MenuItem>
  });


  const handleReset = (e) => {
    setForm([]);
    setDataToEdit("");
  };


  return (
    <>
      {dataToEdit &&
        <>
          <span className="p-buttonset">
  
            <Button
              onClick={handleClickOpen}
              label="Asignar Usuario"
              icon="pi pi-user-plus"
              className="p-button-secondary">

            </Button>

            <Button
              onClick={handleDelete}
              icon="pi pi-user-minus"
              className="p-button-warning"
              label="Remover Usuario" >
            </Button>

          </span>

            
        </>
      }


      <Toast ref={toast}></Toast>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle><b>AGREGAR EMPLEADO</b></DialogTitle>
        <DialogContent >
          <Toast ref={toast}></Toast>
          <div>
            {dataToEdit ?
              <>
                <h1>Editar Registro</h1>
                <h3>Id: {dataToEdit.id} form: {form.id}</h3>
              </>
              : <b>Ingrese los datos solicitados</b>}
            <br />


            {!dataToEdit ?

              <SelectItem
                disabled={false}
                name="tipo_rol"
                label="Elija un Rol"
                id="component-disabled"
                selected={listRol}
                handleChange={handleChangeRol}
                dynamicMenuItem={dynamicMenuItem}
                value={rol}
              />
              :
              <>
                <TextField
                  name="usuario"
                  id="usuario"
                  label="Nombre de Usuario"
                  type="text"
                  onChange={handleChange}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={dataToEdit.nombre_completo}
                />
                <SelectItem
                  disabled={false}
                  name="tipo_rol"
                  label="Elija un Rol"
                  id="component-disabled"
                  selected={listRol}
                  handleChange={handleChangeRol}
                  dynamicMenuItem={dynamicMenuItem}
                  value={form.id_rol}
                />

              </>
            }
            <TextField
              name="password"
              id="password"
              label="Password"
              type="password"
              onChange={handleChange}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />


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
