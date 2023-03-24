import React, { useContext, useEffect, useState, useRef } from 'react';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

import LoadingComponent from './../common/loading/index';
import Message from './../common/message/index';
import DataTableList from './../common/datatable/datatable';

import PlanSContext from '../../Context/planSContext';
import { getDato } from '../../services';
import { ADMIN_ROLE, EMPLOYEE_ROLE, getLongMonthName } from '../../consts';
import LoginContext from '../../Context/login';

const EventosProximos = () => {
    const toast = useRef(null);
    const { sesion } = useContext(LoginContext);
    const {
        setDataToEdit,
        dataToEdit,
        loading,
        setLoading,
        dataList: dataP,
        error,
        setError,
        columnsProximo,
        updateData
    } = useContext(PlanSContext);
    const [reload, setReload] = useState(false);
    const [dataList, setDataList,] = useState([]);

    const [state, setState] = useState([]);

    const endpoint = "/plansanitario/";


    console.log("RENDERIZADO proximos")

    useEffect(() => {
        console.log("inicia useEfect", dataP.length);
        setLoading(true);
        getDato(endpoint, "pendiente")
            .then((data) => {
                if (!data.hasError) {
                    console.log("axios- getDato", data);
                    const FormatDate = data.map(col => {
                        const date = new Date(col.fecha_inicio)
                        const newdate = (getLongMonthName(date).concat('-', date.getFullYear()));
                        return { ...col, fecha_inicio: newdate }
                    });
                    setDataList(FormatDate);
                    setReload(false);
                    setError(null);
                } else {
                    setDataList(null);
                    setError(data.error)
                }
            })
        setLoading(false);
        console.log("termina useEfect", dataP.length);
    }, [reload]);


    useEffect(() => {
        if (dataToEdit) {
            const q = window.confirm('Está seguro que desea marcar como completa?');
            if (q) {
                updateData(state, changeState);
            }
            setReload(true);
        }
    }, [state]);


    const changeState = () => {
        setState({
            ...state,
            id: dataToEdit.id,
            estado: 'completo'
        });
        console.error("Completo:", dataList.length);
    };





    const header = (
        <>
            <div className="table-header-container">
                <h2>"PLAN SANITARIO PENDIENTES"</h2>
                {(sesion.rol === ADMIN_ROLE || sesion.rol === EMPLOYEE_ROLE) &&
                    dataToEdit &&
                    <Button icon="pi pi-check" label="Completado" onClick={changeState} />

                }
            </div>
        </>
    );

    console.log(dataList, ' :dataList')
    const filters = {
        'fecha_inicio': {
            operator: FilterOperator.AND,
            constraints: [{
                matchMode: FilterMatchMode.CONTAINS
            }]
        },
        'dosis': {
            operator: FilterOperator.AND,
            constraints: [{
                matchMode: FilterMatchMode.CONTAINS
            }]
        },
        'estado': {
            operator: FilterOperator.AND,
            constraints: [{
                matchMode: FilterMatchMode.CONTAINS
            }]
        },
    };

    return (
        <>
            <Toast ref={toast}></Toast>
            {loading && <LoadingComponent />}

            {
                dataList &&
                <>
                    <DataTableList
                        key={"datatableProximo"}
                        dataList={dataList}
                        columns={columnsProximo}
                        header={header}
                        filters={filters}
                        dataToEdit={dataToEdit}
                        setDataToEdit={setDataToEdit}
                    />
                </>
            }
            {error && <Message error={error} />}
        </>
    )
}

export default EventosProximos;


