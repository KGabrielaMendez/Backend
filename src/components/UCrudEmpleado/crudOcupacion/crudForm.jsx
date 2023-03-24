import { Dialog, DialogActions} from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Toast } from 'primereact/toast';
import GetOcupacionContext from './../../../Context/common/ocupacionContext';
import ButtonAddEdit from '../../common/buttons/addEdit';


export const CrudForm = () => {
  //toast muestra mensajes emergentes
  const toast = useRef(null);

  const { 
    setSelected,
    selected,
    deleteData,
    updateData,
    createData,
    error
 } = useContext(GetOcupacionContext);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState([]);
  const [dataDelete, setdataDelete] = useState([]);


  //para actualizar datos
  useEffect(() => {
    if (selected) {
      setForm(selected);
      setdataDelete({
        id: selected.id,
        estado: 0,
      });
      console.log(selected);
    } else {
      setForm({
        'estado': 1,
        'ocupacion':''
    });
    }
  }, [selected]);


  //abrir cuadro de ingreso y actualizacion de datos
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.ocupacion) {
      alert("Datos incompletos");
      return;
    }
    if (!form.id ) {
      console.log("entra a if de crear")
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

  const handleReset = (e) => {
    setForm([]);
    setSelected("");
  };

  return (
    <>

      <ButtonAddEdit
        dataToEdit={selected}
        del={handleDelete}
        change={handleClickOpen} />

      <Toast ref={toast}></Toast>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle><b>AGREGAR TRABAJO</b></DialogTitle>
        <DialogContent >
          <Toast ref={toast}></Toast>
          <div>
            {selected ?
              <>
                <h1>Editar Registro</h1>
               
              </>
              : <b>Ingrese los datos solicitados</b>}
            <br />
            <label>Ocupación: </label>
            <input
              type="text" name="ocupacion"
              placeholder="Ingrese Ocupación"
              onChange={handleChange}
              defaultValue={form.ocupacion} /><p />

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
