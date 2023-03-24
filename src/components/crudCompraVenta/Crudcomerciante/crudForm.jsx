import { Dialog, DialogActions, TextField } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Toast } from 'primereact/toast';
import Context from '../../../Context/context';
import ButtonAddEdit from '../../common/buttons/addEdit';

const initialForm = {
  nombre_com: '',
  ruc_com: '',
  direccion_com: '',
  telefono_com: '',
  estado_com: 1
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
  } = useContext(Context);


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
//eliminar cambiando el estado
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
      setdataDelete({
        id: dataToEdit.id,
        estado: 0
      });

      console.log(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);


  //abrir cuadro de ingreso y actualizacion de datos
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //cambiar el estado de activo a inactivo
  const handleDelete = async (e) => {
    e.preventDefault();

    console.log(dataDelete, '::::::editado')
    await deleteData(dataDelete);
    if (!error) {
      toast.current.show({ severity: 'success', summary: 'Registro Eliminado', detail: 'Se eliminó correctamente' });
    } else {
      toast.current.show({ severity: 'error', summary: 'Error al agregar Datos', detail: 'COntacte al admin' });
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
    if (!form.nombre_com || !form.ruc_com || !form.telefono_com) {
      alert("Datos incompletos");
      return;
    }
    if (dataToEdit) {
      await updateData(form);
      toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'Los datos han sido actualizados correctamente' });
    } else {
      await createData(form);
      if (!error) {
        toast.current.show({ severity: 'success', summary: 'Creado Correctamente', detail: 'Dato Creado' });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error al agregar Datos', detail: 'COntacte al admin' });
      }
    }
    handleReset();
  };


  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <>


      <ButtonAddEdit
        dataToEdit={dataToEdit}
        del={handleDelete}
        change={handleClickOpen} />

      <Toast ref={toast}></Toast>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>
          {dataToEdit ?
            <>
              <h1>EDITAR REGISTRO </h1>
              <h3>Nombre: {dataToEdit.nombre_com}</h3>
            </> :
            <b>AGREGAR DATOS DE COMERCIANTE</b>
          }
        </DialogTitle>
        <DialogContent >
          <Toast ref={toast}></Toast>
          <div>

            <TextField
            visible={false}
              required
              id="nombre_com"
              name="nombre_com"
              label="Nombre Comerciante"
              variant="filled"
              defaultValue={form.nombre_com}
              onChange={handleChange} />
            <TextField
              id="ruc_com"
              name="ruc_com"
              label="RUC"
              variant="filled"
              defaultValue={form.ruc_com}
              onChange={handleChange} />

            <TextField
              id="direccion_com"
              name="direccion_com"
              label="Dirección"
              variant="filled"
              defaultValue={form.direccion_com}
              onChange={handleChange} />

            <TextField
              id="telefono_com"
              name="telefono_com"
              label="Teléfono"
              variant="filled"
              defaultValue={form.telefono_com}
              onChange={handleChange} />

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
