import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions} from '@mui/material';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import InventarioContext from './../../../Context/inventarioContext';
import LoginContext from '../../../Context/login';

export const Salida = ({
  salida, setSalida, reload, setReload
}) => {
  const toast = useRef(null);
const {sesion} = useContext(LoginContext);
  const {
    error,setSelected,
    createData: createSalida,
  } = useContext(InventarioContext);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState([]);



useEffect(() => {
if(salida){
  const fecha= new Date().toUTCString();
    setForm({
      ...form,
      'id_entrada':salida.id,
      'fecha_salida': `${fecha}`,
      'id_usuario': sesion.id
  })
}
},[salida])

console.log(salida,"AQUI ES EL FORM SALIDA linea 32")
  //abrir cuadro de ingreso y actualizacion de datos
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSalida([]);
    setSelected('');
    setOpen(false);
  };
  // guardar los datos en form mientras se ingresa datos
  const handleChange = (e) => {
    
    
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("guardar en form salida: ",form)
  };

  //guardar nuevo registro o el editado
  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.fecha_salida || !form.cantidad) {
      alert("Datos incompletos");
      return;
    }
    if(form.cantidad >salida.cantidad){
      window.alert("Excede la cantidad en stock.");
      return;
    }
      const endpoint = '/salidas/';
      await createSalida(form,endpoint);
      if (error === null) {
        setReload(true);
        toast.current.show({ severity: 'success', summary: 'Retirado', detail: 'Se ha registrado la Salida' });
       
      } else {
        toast.current.show({ severity: 'error', summary: 'Error al agregar Datos', detail: 'COntacte al admin' });
      }
      setSalida([]);
    
    handleReset();
  };

  const handleReset = (e) => {
    setForm([]);
    setSalida([]);
  };

  return (
    <>{salida &&
      <Button label="Registrar Salida"
      icon="pi pi-check"
      className="p-button-warning"
      onClick={handleClickOpen}>
       
      </Button>
    }
    

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>
         
            <b>REGISTRE SALIDA DE INSUMOS</b>

        </DialogTitle>
        <DialogContent >
          <Toast ref={toast}></Toast>
          <div>
            Cantidad: {salida.cantidad}
            <p />
              
            <TextField
              id="cantidad"
              name="cantidad"
              label="Cantidad"
              variant="filled"
              type='number'
              onChange={handleChange}
              defaultValue={form.cantidad} />
            <TextField
              id="observacion"
              name="observacion"
              label="Observacion"
              variant="filled"
              type='text'
              onChange={handleChange}
              defaultValue={form.observacion} />

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