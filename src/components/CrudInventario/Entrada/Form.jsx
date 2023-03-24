
import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductoContext from './../../../Context/common/productoContext';
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, MenuItem, Select } from '@mui/material';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';



export const Agregar = ({
  createData: createEntrada, error
}) => {
  const toast = useRef(null);
  const {
    list
  } = useContext(ProductoContext);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState([]);
  const [producto, setProducto] = useState('');

  //agregar al array el id del producto
  useEffect(() => {
    const fecha= new Date().toUTCString();
    setForm({
      ...form,
      "id_pro": producto,
      fecha_entrada: `${fecha}`,
    })
    console.log('datos de form en useEffect comerciante line44: ', form)
  }, [producto])

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
    });
    console.log("guardar en form: ",form)
  };

  const handleChangeProducto = (event) => { 
    setProducto(event.target.value);
  };



  //guardar nuevo registro o el editado
  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.fecha_entrada || !form.fechaexp) {
      alert("Datos incompletos");
      return;
    }
      const endpoint = '/inventario/';
      await createEntrada(form,endpoint);
      if (error === null) {
        toast.current.show({ severity: 'success', summary: 'Creado Correctamente', detail: 'Dato Creado' });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error al agregar Datos', detail: 'COntacte al admin' });
      }
    
    handleReset();
  };

  const handleReset = (e) => {
    setForm([]);
  };

    ///var results = dataList.filter(function (dataList) { return dataList.arete_gan !== null }); 
    const dynamicMenuItem = list.map(col => {
      return <MenuItem key={col.id} value={col.id} >{col.nombre_pro}</MenuItem>
    });

  return (
    <>
      <Button
      label="Agregar a Stock"
      icon="pi pi-plus"
      className="p-button-success mr-2"
        onClick={handleClickOpen}
      ></Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>
          
            <b>AGREGAR ENTRADA DE INSUMOS</b>
          
        </DialogTitle>
        <DialogContent >
          <Toast ref={toast}></Toast>
          <div>
            <p />

            <Select
              labelId="demo-simple-select-helper-label"
              id="component-disabled"
              label="Producto"
              onChange={handleChangeProducto}
              variant="outlined"
              defaultValue="Producto"
            >
              <MenuItem key="" value="Producto" disabled={true}>Producto</MenuItem>

              {dynamicMenuItem}

            </Select>

            <TextField
              required
              id="fechaexp"
              name="fechaexp"
              type='date'
              label="Fecha de Expiración"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }} />

            <TextField
              id="cantidad"
              name="cantidad"
              label="Cantidad"
              variant="filled"
              type='number'
              onChange={handleChange}
              defaultValue={form.cantidad} />

            <TextField
              id="lote"
              name="lote"
              label="Lote"
              variant="filled"
              defaultValue={form.lote}
              onChange={handleChange} />

            <TextField
              id="observacion"
              name="observacion"
              label="Observacion"
              variant="filled"
              defaultValue={form.observacion}
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