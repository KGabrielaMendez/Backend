import React, { useContext, useEffect, useState, useRef } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Row } from 'primereact/row';
import { ColumnGroup } from 'primereact/columngroup';

import { Box, Dialog, DialogActions, Stack } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { getDato } from '../../services';
import CVContext from './../../Context/CompraVentaContext';
import LoadingComponent from './../common/loading/index';
import Message from './../common/message/index';
import { getLongMonthName } from '../../consts';

export const DetailCV = () => {
    const { dataSelect,
        loading,
        error, setError
    } = useContext(CVContext);
    const toast = useRef(null);
    const dt = useRef(null);

    const [open, setOpen] = React.useState(false);
    const [dataList, setDataList] = useState([])

    //funciones para abrir y cerrar la ventana flotante
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
let fecha;
fecha= new Date(dataSelect.fecha_negociacion);
let newFecha;
    //realiza consulta que devuelve los detalles del dato seleccionado
    useEffect(() => {
        const endpoint = '/compraventa/';
        if (dataSelect) {
            let data = dataSelect.id;
            getDato(endpoint, data)
                .then((db) => {
                    if (!db.hasError) {
                        setDataList(db);
                        
                        const hora =`${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
                       newFecha= `${fecha.getUTCDate()}/${getLongMonthName(fecha)}/${fecha.getFullYear()}`;
                       console.log(newFecha,'nueva',hora);
                        setError(null);
                    } else {
                        setDataList([]);
                        setError(db.error);
                    };
                });
        }
    }, [dataSelect]);

    const exportCSV = () => {
        dt.current.exportCSV();
    }


    let footerGroup = <ColumnGroup>
        <Row>
            <Column footer={`Total Reses: ${dataList.length}`} colSpan={2} footerStyle={{ textAlign: 'center', color:'#7a3cde' }} />
            <Column footer="" />
            <Column footer={`Kilos Totales: ${dataSelect.total_kilos}`} colSpan={2} footerStyle={{ textAlign: 'right' }} />

            <Column footer={`Libras: ${dataSelect.total_kilos * 2.2}`} />
            <Column footer="" />
        </Row>
        <Row>
        <Column footer="" /><Column footer="" /><Column footer="" />
            <Column footer="DESTARE 2%:" colSpan={3} footerStyle={{ textAlign: 'right' , color:'#de3ca0'}} />
            <Column footer={dataSelect.destare} />
           
        </Row>
        <Row>
        <Column footer="" /><Column footer="" /><Column footer="" />
            <Column footer="Precio Total" colSpan={3} footerStyle={{ textAlign: 'right' , color:'blue'}} />
            <Column footer={dataSelect.precio_negociacion} colSpan={3} footerStyle={{ textAlign: 'right', color:'blue' }} />
        </Row>
    </ColumnGroup>

    return (
        <>
            {dataSelect && <Stack direction="row" spacing={2}>
                <Button
                    variant="contained" color="success"
                    onClick={handleClickOpen} >
                    Mostrar Detalles
                </Button>
            </Stack>}

            {loading && <LoadingComponent />}
            {error && <Message error={error} />}

            <Dialog open={open} onClose={handleClose}  >
                <Toast ref={toast}></Toast>
                <DialogTitle align="center">Detalles {dataSelect.tipo_negociacion}</DialogTitle>
                <DialogContent >
                    <Box className="card" >
                        <table>
                            <tbody>
                            <tr>
                                    <th>
                                        <strong>Nombre: </strong>
                                    </th>
                                    <th>
                                        {dataSelect.nombre_com}
                                    </th>
                                </tr>
                            <tr>
                                    <th>
                                        <strong>Teléfono: </strong>
                                    </th>
                                    <th>
                                        {dataSelect.telefono_com}
                                    </th>
                                </tr>
                                
                                <tr>
                                    <th>
                                        <strong>Fecha: </strong>
                                    </th>
                                    <th>
                                        {dataSelect.fecha_negociacion}
                                    </th>
                                </tr>
                                    <>
                                    {dataSelect.valores_pendientes_nego !== "0.00"
                                    ? 
                                        <tr>
                                            <th style={{color: 'red'}}>
                                                <strong>Valor Pendiente: </strong>
                                            </th>
                                            <th style={{color: 'red'}}>
                                                {dataSelect.valores_pendientes_nego}
                                            </th>
                                        </tr>
                                        :  <tr>
                                        <th style={{color: '#4fde3c', textAlign:"center"}}>
                                            <strong>PAGADO </strong>
                                        </th>
                                    </tr>
                        }
                                        </>
                        <tr>
                                            <th>
                                                <strong>Precio Total: </strong>
                                            </th>
                                            <th>
                                                {dataSelect.precio_negociacion}
                                            </th>
                                        </tr>
                                    </tbody>
                        </table>

                    </Box>
                    <DataTable
                        ref={dt}
                        key="detalleCV"
                        value={dataList}
                        header={"Detalles"}
                        size="small"
                        align="center"
                        showGridlines
                        responsiveLayout="scroll"
                        filterDisplay="menu"
                        rows={31}
                        paginator
                        dataKey="id"
                        footerColumnGroup={footerGroup}
                        removableSort
                        virtualScrollerOptions={{ itemSize: 46 }}
                    >

                        <Column field="id_ganado" header="Id" sortable />
                        <Column field="arete_gan" header="N° Arete" />
                        <Column field="sexo_gan" header="Tipo" />
                        <Column field="nombre_ra" header="Raza" />
                        <Column field="peso_kg" header="Peso (kg)" />
                        <Column field="peso_libras" header="Peso en Libra" />
                        <Column field="precio_total" header="Precio Unitario" />

                    </DataTable>
                    <Button label="Exportar a CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}