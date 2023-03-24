import React, { useState } from "react";
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import ReportesGanado from './ganado';

const ReportesGanado = () => {
const [reporte, setReporte] = useState('p');
const [tipo, setTipo] = useState('p');
const [anio, setAnio] = useState('');


console.log(tipo, '  -  ', reporte);
    return (
        <>
        <h2 align="center">REPORTES MÓDULO DE GANADO</h2>
            <FormControl fullWidth={true}>
                <InputLabel >Seleccione Opción</InputLabel>
                <Select
                    fullWidth={true}
                    labelId="demo-simple-select-helper-label"
                    id="opcion"
                    name="opcion"
                    label={"Reporte"}
                    value={reporte}
                    variant="outlined"
                    size="small"
                    placeholder={"Tipo Ganado"}
                    onChange={(e) => setReporte(e.target.value)} >
                    <MenuItem key="025" value="p" disabled={true}>Elija una Opcion</MenuItem>
                    <MenuItem key="0" value="Toros_Venta">Toros Listos para la Venta</MenuItem>
                    <MenuItem key="1" value='Ganado_vendido'>Ganado Vendido</MenuItem>
                    <MenuItem key="2" value='Ganado_Descarte'>Ganado Descarte</MenuItem>
                    <MenuItem key="3" value='Ganado_Equino'>Ganado Equino</MenuItem>
                </Select>
                <p/>
            </FormControl>
            <FormControl fullWidth={true}>
                <InputLabel >Tipo de Reporte</InputLabel>
                <Select
                    fullWidth={true}
                    labelId="demo-simple-select-helper-label"
                    id="opcion"
                    name="opcion"
                    label={"Reporte"}
                    value={tipo}
                    variant="outlined"
                    size="small"
                    placeholder={"Tipo Ganado"}
                    onChange={(e) => setTipo(e.target.value)} >
                    <MenuItem key="025" value="p" disabled={true}>Elija una Opcion</MenuItem>
                    <MenuItem key="0" value="Anual">Anual</MenuItem>
                    <MenuItem key="1" value='Por_Fechas'>Por Fechas</MenuItem>
                </Select>
            </FormControl>

            {tipo === "Anual" ?
        <>
        <h2>Seleccione el Año</h2>
            <TextField
            type="number"
            value={anio}
            defaultValue={'Año'}
            label="Ingrese año"
            onChange={(e)=> setAnio(e.target.value)}
/>
<Button onClick={<ReportesGanado/>} label={"Consultar"}/>
        </>    
        : tipo === "Por_Fechas" &&<>
        <b>Fecha Inicio</b>
        <b>Fecha Fin</b>
        </>
        }
        </>
    )
}

export default ReportesGanado;
