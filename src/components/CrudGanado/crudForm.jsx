import { Dialog, DialogActions, Select, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CrudContext from '../../Context/crudContext';
import SelectItemGrupo from '../common/selectItem/Grupo';
import SelectItemRaza from '../common/selectItem/Raza';
import GetContext from '../../Context/grupoRazaContext';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';


const initialForm = {
  tipo_gan: '',
  arete_gan: null,
  nombre_gan: '',
  fechanac_gan: '',
  sexo_gan: '',
  estado: 1,
  observacion_gan: '',
  id_raza: '',
  id_grupo: ''
};

export const CrudForm = () => {
  const toast = useRef(null);
  const { createData,
    updateData,
    dataToEdit,
    setDataToEdit
  } = useContext(CrudContext);



  const { grupo,
    dataListGrupo,
    handleChangeGrupo,
    raza,
    dataListRaza,
    handleChangeRaza }
    = useContext(GetContext);

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState(initialForm);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
      setEdit(true);

      console.log(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);


  useEffect(() => {
    setForm({
      ...form,
      id_grupo: grupo,
      id_raza: raza
    })
    console.log('en array', grupo);
  }, [grupo, raza])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    console.log("raza....", form)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.tipo_gan || !form.fechanac_gan) {
      alert("Datos incompletos");
      return;
    }
    if (dataToEdit) {
      await updateData(form);
      toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'Los datos han sido actualizados correctamente' });
    } else {
      await createData(form);
      toast.current.show({ severity: 'success', summary: 'Creado Correctamente', detail: 'Dato Creado' });

    }
    handleReset();
    setEdit(false);
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit("");
    
  };
  return (
    <>



      {(!dataToEdit)  ?
        <Button label="Nuevo"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={handleClickOpen}
        /> :
        <>
          <Button label="Actualizar"
          icon="pi pi-pencil"
          className="p-button-bg-pink-100"
          onClick={handleClickOpen}
          />
        
        </>
      }

      <Dialog open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth='md'>
        <DialogTitle>
          {!dataToEdit ? "AGREGAR" : "ACTUALIZAR"}</DialogTitle>
        <DialogContent >
          <Toast ref={toast}></Toast>
          <form onSubmit={handleSubmit}>


            {dataToEdit ?
              <TextField
              
                fullWidth
                type="text" name="tipo_gan"
                label="Tipo Ganado"
                onChange={handleChange}
                value={form.tipo_gan}
                variant="outlined"
                size="small"
              />
            :
              <FormControl fullWidth={true}>
                <InputLabel >Tipo de Ganado</InputLabel>
                <Select
                  fullWidth={true}
                  labelId="demo-simple-select-helper-label"
                  id="tipo_gan"
                  name="tipo_gan"
                  label={"Tipo Ganado"}
                  value={form.tipo_gan}
                  variant="outlined"
                  size="small"
                  placeholder={"Tipo Ganado"}
                  onChange={(e) => setForm({ ...form, tipo_gan: e.target.value })} >
                  <MenuItem key="0" value="Tipo Ganado" disabled={true}>Tipo Ganado</MenuItem>
                  <MenuItem key="1" value='Bovino'>Bovino</MenuItem>
                  <MenuItem key="2" value='Equino'>Equino</MenuItem>
                </Select>
              </FormControl>
            }
            <p />
            {form.tipo_gan === "Equino" ?
              <>
                <TextField
                  fullWidth
                  disabled={edit}
                  type="text" name="nombre_gan"
                  label="Nombre de Caballo"
                  onChange={handleChange}
                  value={form.nombre_gan}
                  variant="outlined"
                  size="small"
                />
              </>
              :
              <>
                <TextField
                  disabled={edit}
                  variant="outlined"
                  size="small"
                  type="text" name="arete_gan"
                  fullWidth
                  label="Ingrese Arete (numero/año)"
                  onChange={handleChange}
                  value={form.arete_gan}
                />

              </>

            }
            <p />
            <TextField
            disableFuture={true}
              variant="outlined"
              size="small"
              fullWidth
              required
              id="outlined-required"
              name="fechanac_gan"
              type='date'
              label="Fecha Nacimiento"
              value={form.fechanac_gan}
              defaultValue={"Ingrese Fecha"}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }} />
            <p />
            {dataToEdit ? 
            <TextField
            fullWidth
            type="text" name="sexo_gan"
            label="Sexo"
            onChange={handleChange}
            value={form.sexo_gan}
            variant="outlined"
            size="small"
          />
          :
            <FormControl fullWidth={true}>
              <InputLabel fullWidth={true}>Sexo</InputLabel>
              <Select
                id="component-disabled"
                labelId="outlined-required"
                name="sexo_gan"
                label="Sexo"
                value={form.sexo_gan}
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleChange} >
                <MenuItem key="0" value="Sexo" disabled={true}>Sexo</MenuItem>
                <MenuItem key="1" value='Macho'>Macho</MenuItem>
                <MenuItem key="2" value='Hembra'>Hembra</MenuItem>
              </Select>
            </FormControl>
            }
            <p />
            <TextField
              id="outlined-required"
              fullWidth
              type="text" name="observacion_gan"
              label="Observacion Ganado"
              onChange={handleChange}
              value={form.observacion_gan}
              variant="outlined"
              size="small"
            /><p />

            <label>Seleccione Raza: </label><p />
            {dataToEdit ?
              
            <SelectItemRaza
            form={dataToEdit.nombre_ra}
            raza={dataListRaza.raza}
            dataListRaza={dataListRaza}
            handleChangeRaza={handleChangeRaza} />
            :
            <SelectItemRaza
            raza={dataListRaza.raza}
            dataListRaza={dataListRaza}
            handleChangeRaza={handleChangeRaza} />
          }
            <p />

            <label>Seleccione Grupo: </label><p />
            {dataToEdit ?
            <SelectItemGrupo
            form={dataToEdit.nombre_gru}
              grupo={grupo}
              dataListGrupo={dataListGrupo}
              handleChangeGrupo={handleChangeGrupo} />
              :
            <SelectItemGrupo
              grupo={grupo}
              dataListGrupo={dataListGrupo}
              handleChangeGrupo={handleChangeGrupo} />
            }
            <p />
            <p />


          </form>
        </DialogContent>
        <DialogActions>
          <Button type="reset"
            onClick={handleReset}
            className="p-button-raised p-button-secondary"
          >Limpiar</Button>
          <Button
            className="p-button-raised p-button-success"
            onClick={handleSubmit}>Agregar Datos</Button>
          <Button
            className="p-button-raised p-button-info"
            onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )

}
