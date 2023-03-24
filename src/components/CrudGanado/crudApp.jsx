import React, { useContext } from "react";
import CrudContext from "../../Context/crudContext";
import { CrudForm } from "./crudForm";
import LoadingComponent from '../common/loading/index';
import DataTableList from '../common/datatable/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { GetGrupoProvider } from "../../Context/grupoRazaContext";
import Message from '../common/message/index';
import { Descarte } from './descartes';
import { Toolbar } from 'primereact/toolbar';
import LoginContext from "../../Context/login";
import { ADMIN_ROLE, USER_ROLE, EMPLOYEE_ROLE } from '../../consts/index';
//import { exportExcel, exportPDF } from "../Reportes";
import { Button } from 'primereact/button';


const CrudApp = () => {
  const {
    setDataToEdit,
    dataToEdit,
    loading,
    columns,
    error,
    dataList,
  } = useContext(CrudContext);
  const { sesion } = useContext(LoginContext);

  const filters = {
    'arete_gan': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'nombre_gan': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'nombre_gru': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    },
    'tipo_gan': {
      operator: FilterOperator.AND,
      constraints: [{
        matchMode: FilterMatchMode.CONTAINS
      }]
    }
  };

  const ToolbarTemplate = () => {
    return (

      <React.Fragment>
        {(sesion.rol === ADMIN_ROLE || sesion.rol === EMPLOYEE_ROLE) &&
          <>
            <GetGrupoProvider>

              <CrudForm />
            </GetGrupoProvider>
            <Descarte />
          </>
        }


      </React.Fragment>
    )
  }

  return (

    <div>

      {loading && <LoadingComponent />}

      {dataList &&
        <>
          <Toolbar key="rtrj" className="mb-4" left={ToolbarTemplate}></Toolbar>
          <DataTableList
            key="datatableGanado"
            dataList={dataList}
            columns={columns}
            header={"GANADO"}
            filters={filters}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
        </>
      }
      {error && <Message error={error} />}



    </div>
  )

}

export default CrudApp;