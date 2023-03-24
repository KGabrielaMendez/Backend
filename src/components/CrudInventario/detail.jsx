import { FilterMatchMode, FilterOperator } from 'primereact/api';
import React, { useContext, useEffect, useState, useRef } from 'react';
import InventarioContext from './../../Context/inventarioContext';
import DataTableList from './../common/datatable/datatable2';
import LoadingComponent from './../common/loading/index';
import Message from './../common/message/index';
import { Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { getDato } from '../../services';
import { Salida } from './Salida/Form';
import { getLongMonthName } from './../../consts/index';

export const DetalleInventario = () => {
    const { selected,
        setSelected,
        loading,
        error,
    } = useContext(InventarioContext);
    const toast = useRef(null);
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
    const [salida, setSalida] = useState('');
    const [reload, setReload] = useState(false);
    const columns = [
        {
            field: 'cantidad',
            header: 'Cantidad',
            sortable: false,
            filter: false,
            
        },
        {
            field: 'fecha_entrada',
            header: 'Fecha de Entrada',
            sortable: true,
            filter: true,
            dataType: "dateonly",
            filterField:"date", 
        },
        {
            field: 'fechaexp',
            header: 'Fecha de Expiración',
            sortable: true,
            filter: true,
        },
        {
            field: 'lote',
            header: 'Lote',
            sortable: false,
            filter: false,
        },
    ];
    const filters = {
        'fecha_entrada': {
            operator: FilterOperator.AND,
            constraints: [{
                matchMode: FilterMatchMode.DATE_IS
            }]
        },
        'fechaexp': {
            operator: FilterOperator.AND,
            constraints: [{
                matchMode: FilterMatchMode.DATE_IS
            }]
        },

    };
    const endpoint = '/inventario/';
    useEffect(() => {
        console.log('seleccionar en detalle: ', salida)
        if (selected) {
            const id_pro = [selected.id_pro]
            console.log(id_pro, ' :id_pro')
            getDato(endpoint, id_pro)
                .then((db) => {
                    if (!db.hasError) {
                        console.log("detalles inventario: ", db);
                        const FormatDate = db.map(col => {
                            const date_Entrada = new Date(col.fecha_entrada);
                            const date_Exp = new Date(col.fechaexp);
                            console.log(date_Entrada.getUTCDate(),'dia de la smana');
                            const newdate = `${date_Entrada.getUTCDate()}/${getLongMonthName(date_Entrada)}/${date_Entrada.getFullYear()}`;
                            const fechaExp = `${date_Exp.getUTCDate()}/${getLongMonthName(date_Exp)}/${date_Exp.getFullYear()}`;
                            return { ...col, fecha_entrada: newdate , fechaexp:fechaExp}
                        });
                          setList(FormatDate);
                        setOpen(true);
                        setReload(false);
                    } else {
                        console.error(".--------.", db.error)
                        setList('');
                    };
                })
        };
    }, [selected, reload]);

    const handleClose = () => {
      
        setOpen(false);
        setSelected('');
      
    };

    return (
        <>
            {loading && <LoadingComponent />}
            {error && <Message error={error} />}
            {selected &&
            
            <Dialog open={open} onClose={handleClose} >
                <Toast ref={toast}></Toast>
                <DialogTitle align="center">
                   DETALLES DE producto
                   
                   
                   
                    </DialogTitle>
                <DialogContent >
                    <div>
                        <table >
                            <tbody>
                                <tr>
                                    <th>
                                        <b>PRODUCTO: </b> {selected.nombre_pro}
                                    </th></tr><tr>
                                    <th>
                                        <b>CATEGORÍA: </b> {selected.categoria_pro}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Salida salida={salida} 
                    setSalida={setSalida} 
                    reload={reload}
                    setReload={setReload}
                    />
                    <DataTableList
                        header={"CUENTA MENSUAL DE LECHE"}
                        filters={filters}
                        key="datatableDetalleInv"
                        dataList={list}
                        columns={columns}
                        dataToEdit={salida}
                        setDataToEdit={setSalida}
                    >

                    </DataTableList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
             }
        </>
    )


}