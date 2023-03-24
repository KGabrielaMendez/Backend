import React, { Component } from 'react';
import { getGanadoGrupo } from '../../services';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import ErrorComponent from './../../components/common/error/index';
import LoadingComponent from './../../components/common/loading/index';
import DataTableList from './../../components/common/datatable/datatable';
import CrudApp from './CRUD/crudApp';
import {CrudProvider} from '../../Context/crudContext'

class Descartes extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isReady: false,
            hasError: false,
            error: null,
            columns: [
                {
                    field: "arete_gan",
                    header: "Numero de Arete",
                    sortable: true,
                    filter: true
                },
                {
                    field: "tipo_gan",
                    header: "Tipo de Ganado",
                    filter: true
                },
                {
                    field: "fechanac_gan",
                    header: "Fecha de Nacimiento",
                    filter: false
                },
                {
                    field: "sexo_gan",
                    header: "Sexo",
                    filter: false
                },
                {
                    field: "estado",
                    header: "Estado",
                    filter: false
                },
                {
                    field: "nombre_gru",
                    header: "Grupo",
                    filter: true,
                    sortable: true
                },
                {
                    field: "nombre_ra",
                    header: "Raza",
                    filter: false,
                    sortable: true
                }
            ],
        }
    };

    componentDidMount = async () => {
        const ganado = '/ganadoGrupo/';
        const data = await getGanadoGrupo(ganado);
        if (!data.hasError) {
            this.setState({
                data,
                isReady: true
            });
        } else {
            this.setState({

                hasError: true,
                error: data.error,

            });

        };
    };

    render() {
        const {
            data,
            isReady,
            hasError,
            error,
            columns
        } = this.state;

        const filters = {
            'arete_gan': {
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

        return (
            <>
                {
                    isReady ?
                        <>
                            {/* llama
                         a un boton para agregar Nuevo registro
                          y a la tabla con los datos*/}
                            <CrudProvider>
                                <CrudApp />
                            </CrudProvider>
                        </>

                        : hasError ?
                            <ErrorComponent
                                error={error}
                            />
                            : <LoadingComponent />
                }

            </>
        )
    }
}



export default Descartes;