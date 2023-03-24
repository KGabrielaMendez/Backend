import React, { useContext, useEffect, useState } from "react";
import PlanSContext from "../../Context/planSContext";
import LoadingComponent from '../common/loading/index';
import DataTableList from '../common/datatable/datatable';
import { FilterMatchMode, FilterOperator} from 'primereact/api';
import Message from '../common/message/index';

const CrudApp = () => {
    const {
        setDataToEdit,
        dataToEdit,
        loading,
        error,
        dataList,
        columnsProximo,
    } = useContext(PlanSContext);

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

            {loading && <LoadingComponent />}

            {dataList &&
                <>
                    <DataTableList
                        key="datatablePlanSa"
                        dataList={dataList}
                        columns={columnsProximo}
                        header={"HISTORIAL DE PLAN SANITARIO"}
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

export default CrudApp;