import { Dialog, DialogActions } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Button } from 'primereact/button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Toast } from 'primereact/toast';
import OrdenioContext from './../../Context/ordenioContext';
import { getDato } from '../../services';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import Message from './../common/message/index';
import LoadingComponent from './../common/loading/index';
import { getDayName, precio_litro } from '../../consts';

export const DetailOrdenio = () => {
    const { dataSelect,
        loading,
        error, setError
    } = useContext(OrdenioContext);
    const toast = useRef(null);
    const dt = useRef(null);

    const [open, setOpen] = React.useState(false);
    const [dataList, setDataList] = useState([])
    const [preciolitro, setPrecio] = useState('');

    //funciones para cerrar la ventana flotante
    const handleClose = () => {
        setOpen(false);
    };

    //realiza consulta que devuelve los detalles del dato seleccionado
    useEffect(() => {
        const endpoint = '/ordenio/';
        if (dataSelect) {
            const data = [dataSelect.fecha_ord];
            setPrecio(precio_litro);
            getDato(endpoint, data)
                .then((db) => {
                    if (!db.hasError) {
                        console.log("detail---------", db)
                        const FormatDate = db.map(col => {
                            const date = new Date(col.dia)
                            console.log(col.dia,'col.dia')
                            const newdate = `${date.getDate()}-${getDayName(date)}`;
                            return { ...col, fecha_ord: newdate }
                        });
                          setDataList(FormatDate);
            
                        setError(null);
                    } else {
                        console.error(".------------.--------.", db.error)
                        setDataList('');
                        setError(db);
                    };
                });
                setOpen(true);
        }
        
    }, [dataSelect]);


    const exportCSV = () => {
        dt.current.exportCSV();
    }


     let footerGroup = <ColumnGroup>
        <Row>
            <Column footer="Días" footerStyle={{ textAlign: 'center' }} />
            <Column footer="Litros Totales" footerStyle={{ textAlign: 'center' }} />
            <Column footer="Precio por Litro" footerStyle={{ textAlign: 'center' }} />

        </Row>
        <Row>
            <Column footer={dataList.length} footerStyle={{ textAlign: 'center' }}/>
            <Column footer={dataSelect.litros_mes} footerStyle={{ textAlign: 'center' }}/>
            <Column footer={preciolitro} footerStyle={{ textAlign: 'center' }}/>

        </Row>
        <Row>
            <Column footer=""  footerStyle={{ textAlign: 'center' }} />
            <Column footer="Precio Total" footerStyle={{ textAlign: 'center', color:'#FF0000' }} />
            <Column footer={dataSelect.cuenta_mes} footerStyle={{ textAlign: 'center', color:'#FF0000' }} />
        </Row>
    </ColumnGroup>

    return (
        <>

            {loading && <LoadingComponent />}
            {error && <Message error={error} />}
            <Dialog open={open} onClose={handleClose} >
                <Toast ref={toast}></Toast>
                <DialogTitle align="center">Detalles </DialogTitle>
                <DialogContent >
                    <DataTable
                    ref={dt}
                        key="detalleOrdenio"
                        value={dataList}
                        header={`Detalles ${dataSelect.mes} ${dataSelect.anio}`}
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
                    >

                        <Column field="fecha_ord" header="Día" sortable />
                        <Column field="litros_ord" header="Litros Diarios" />
                        <Column field="numerovacas_ord" header="N° Vacas Ordeñadas" />
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