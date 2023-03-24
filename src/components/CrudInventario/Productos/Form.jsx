
import React, { useContext,useEffect,useRef,useState } from 'react';
import ProductoContext from './../../../Context/common/productoContext';
import { Dialog, DialogContent, DialogTitle, TextField,DialogActions } from '@mui/material';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import ButtonAddEdit from '../../common/buttons/addEdit';


const initialForm = {
    nombre_pro: '',
    descripcion_pro: '',
    categoria_pro: '',
  };


export const CrudForm = () => {
    const toast = useRef(null);
    const { 
        createData,
        dataToEdit,
        setDataToEdit,
        updateData,
        error,
    
    } = useContext(ProductoContext);

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if(dataToEdit){
            setForm(dataToEdit);
            
        }else{
            setForm([]);
        }
    },[dataToEdit]);

  //abrir cuadro de ingreso y actualizacion de datos
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
// guardar los datos en form mientras se ingresa datos
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };
 //guardar nuevo registro o el editado
  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.nombre_pro || !form.categoria_pro) {
      alert("Datos incompletos");
      return;
    }
    if (dataToEdit) {
      await updateData(form);
      toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'Los datos han sido actualizados correctamente' });
    } else {
      await createData(form);
      if (error===null) {
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
     <Button
              onClick={handleClickOpen}
              label="Añadir nuevo Producto"
              icon="pi pi-plus"
              className="p-button-success">

            </Button>

         <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>
          
            <b>AGREGAR NUEVO PRODUCTO</b>
        
        </DialogTitle>
        <DialogContent >
        <Toast ref={toast}></Toast>
          <div>
            <TextField
              required
              id="nombre_pro"
              name="nombre_pro"
              label="Nombre Producto"
              variant="filled"
              
              onChange={handleChange} />
            <TextField
              id="descripcion_pro"
              name="descripcion_pro"
              label="Descripción"
              variant="filled"
              onChange={handleChange} />

            <TextField
              id="categoria_pro"
              name="categoria_pro"
              label="Categoría"
              variant="filled"
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