import React, { useContext,useEffect, useState } from "react";
import { CrudFormUser } from "./crudForm";
import LoadingComponent from '../../common/loading/index';
import DataTableList from '../../common/datatable/datatable';
import Message from '../../common/message/index';
import ModuloUsuarioContext from './../../../Context/moduloUsuarioContext';
import { RolProvider } from "../../../Context/common/rolContext";
import { getDatos } from "../../../services";


const CrudApp = () => {
  const {
    setDataToEdit,
    dataToEdit,
    loading,
    error,
    setError,
    setReloadUsers,
  } = useContext(ModuloUsuarioContext);
const [list, setList] = useState([]);
  const endpoint = '/empleados/usuarios/';
  useEffect(() => {
    getDatos(endpoint)
      .then((data) => {
        if (!data.hasError) {
          console.log("Usuarios", data)
          setList(data)
          setReloadUsers(false)
          setError(null);
        } else {
          console.error(".------------.--------.", data)
          setList([]);
          setError(data.error);
        };
      });
  }, [endpoint]);


  const columns= [
    {
        field: 'nombre_completo',
        header: 'Nombre y Apellido',
        sortable: true,
        filter: true
    },
    {
        field: 'usuario',
        header: 'Nombre de Usuario',
        sortable: true,
        filter: true
    },
    {
        field: 'email_usr',
        header: 'E-mail',
        sortable: true,
        filter: true
    }
  ];

  return (

    <>
      <RolProvider>
          <CrudFormUser listEmpleados={list}/>
      </RolProvider>

      {loading && <LoadingComponent />}
      {error && <Message error={error} />}

      {list && <DataTableList
        key="datatableUsuario"
        dataList={list}
        columns={columns}
        header={"LISTA DE USUARIOS"}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      }



    </>
  )

}

export default CrudApp;