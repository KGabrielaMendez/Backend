import { Box, Stack, TextField } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import SelectItem from './../common/selectItem/Comerciante';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getDatos } from './../../services/CRUD/index';

export const FormMaestroCV = () => {
  const toast = useRef(null);
  const [listComerciante, setListComerciante] = useState([])
  const [comerciante, setComerciante] = useState('');
  const [listDetail, setListDetail] = useState([]);
  const [form, setForm] = useState([])
  const [show, setShow] = useState(false);



  const endpoint = '/comerciante/'
  //lista de comerciante
  useEffect(() => {
    getDatos(endpoint)
      .then((data) => {
        if (!data.hasError) {
          console.log("comerciantes---...", data)
          setListComerciante(data);
        } else {
          console.error(".------------.--------.", data.error)
        };
      });
  }, [comerciante]);
  const aux = new Date();
  let fecha = '';
  //agregar al array dato de comerciante
  useEffect(() => {
   setForm({
      ...form,
      "id_comerciante": comerciante,
      "fecha_negociacion": aux.toJSON()
    })
      }, [comerciante])


  //guarda datos en form conforme va ingresando
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    console.log('datos de form en useEffect line55: ', form)
  };

  //guarda datos en array
  const handleSubmit = async (e) => {
    e.preventDefault();     //para que no se autoprocese el form
    if (!form.tipo_negociacion || !form.id_comerciante || !form.fecha_negociacion) {
      alert("Datos incompletos");
      return;
    }
    window.alert(form.fecha_negociacion)
    listDetail.push(form);
    setListDetail({ listDetail });
    console.log(form, 'kkjhk');
    setShow(true);
    console.log(listDetail, 'datos de negociacion')
  };


  const handleChangeComerciante = (event) => {
    setComerciante(event.target.value);
  };


  console.log('comerciante---: ', listComerciante);


  ///var results = dataList.filter(function (dataList) { return dataList.arete_gan !== null }); 
  const dynamicMenuItem = listComerciante.map(col => {
    return <MenuItem key={col.id} value={col.id} >{col.nombre_com}</MenuItem>
  });


  return (
    <>
      <Toast ref={toast}></Toast>
      <Box sx={{ p: 7, border: '2px dashed grey', fontWeight: 'medium' }}>

        <div  >


          <table >
            <tbody>
              <tr>
                <th>
                  <Select
                    disabled={show}
                    id="component-disabled"
                    labelId="tipo_negociacion"
                    name="tipo_negociacion"
                    label="Tipo"
                    defaultValue="Tipo Transacción"
                    onChange={e => {
                      setForm({
                        ...form,
                        tipo_negociacion: e.target.value
                      })
                    }}
                  >
                    <MenuItem key="" value="Tipo Transacción" disabled={true}>Tipo Transacción</MenuItem>
                    <MenuItem key="Compra" value="Compra" >Compra</MenuItem>
                    <MenuItem key="Venta" value="Venta" >Venta</MenuItem>
                  </Select>
                </th>
                <th>
                  <SelectItem
                    disabled={show}
                    id="component-disabled"
                    selected={comerciante}
                    handleChange={handleChangeComerciante}
                    dynamicMenuItem={dynamicMenuItem}
                  />
                </th>
                {/*  <th><Stack component="form" noValidate spacing={3}>
                <TextField
                  disabled={show}
                  name="fecha_negociacion"
                  id="component-disabled"
                  label="Fecha"
                  type="date"
                  onChange={handleChange}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /></Stack>
              </th> */}
                <th>
                  <TextField
                    id="component-disabled"
                    disabled={show}
                    name="destare"
                    label="Destare %"
                    variant="outlined"
                    onChange={handleChange} />
                </th>
                <th>
                  <Button
                    disabled={show}
                    id="component-disabled"
                    color="success"
                    variant="contained"
                    onClick={handleSubmit}>Validar</Button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </>
  )

}
