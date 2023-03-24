import React, { useContext } from 'react';
import DataTableList from './../../common/datatable/datatable';
import ProductoContext from './../../../Context/common/productoContext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { CrudForm } from './Form';

export const IndexProductos = () => {
    const {
        list,
        setDataToEdit,
        dataToEdit,
        columns
    } = useContext(ProductoContext);

    const filters = {
        'nombre_pro': {
            operator: FilterOperator.AND,
            constraints: [{
                matchMode: FilterMatchMode.CONTAINS
            }]
        },
        'categoria_pro': {
            operator: FilterOperator.AND,
            constraints: [{
                matchMode: FilterMatchMode.CONTAINS
            }]
        },
    };



    return (
        <>
       <CrudForm />
            {list && <DataTableList
            key="dtProducto"
                header="LISTA DE PRODUCTOS"
                dataList={list}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
                columns={columns}
                filters={filters}
            />
            }
        </>
    )

}
