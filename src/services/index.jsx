import {
    getGanadoGrupo
} from './modulo_ganado/ganado/index.jsx';
import { getDatos, getDato, createDato, deleteDato, updateDato } from './CRUD/index';
import { getGrupoByGanado, getGrupos } from './modulo_ganado/grupo/index';
import { ChangeState } from './modulo_usuarios/index';
import { createLogin } from './login';
import { getReporte,getReporteAnio } from './Reportes/index';



export {

    getGanadoGrupo,
    getGrupos,
    getGrupoByGanado,
    getDatos,
    getDato,
    createDato,
    updateDato,
    deleteDato,
    ChangeState,

    createLogin, 
    getReporte,
    getReporteAnio
};