import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import elements
import Homepage from '../components/homepage';
import Login  from './../components/login/index';

//modulo de usuarios
import PaginaUsuario from './../views/modulo_usuario/menu';

import CrudEmpleado from './../views/modulo_usuario/CrudEmpleado';

//modulo de inventario
import CrudInventario from '../views/modulo_inventario/CrudInventario';
import PaginaInventario from './../views/modulo_inventario/menu';

//{/* menu de modulos */}
import MenuGanado from '../views/menu-modulos/menuGanado';
import MenuInventario from '../views/menu-modulos/menuInventario';
import MenuUsuarios from '../views/menu-modulos/menuUsuarios';
//modulo de ganado
import CrudGanado from '../views/modulo_ganado/CrudganadoIndex';
import PaPlanS from '../views/modulo_ganado/menuPlanS';
import PlanSanitario from '../views/modulo_ganado/CrudplanSanitIndex'
import ControlMensual from '../views/modulo_ganado/CrudordenioIndex';
import CompraVenta from './../views/modulo_ganado/CompraVenta';


//Pestañas_Ganado
import PaginaGanado from './../views/modulo_ganado/index';
import CrudProducto from './../views/modulo_inventario/CrudProducto';
import CrudUsuario from '../views/modulo_usuario/CrudUsuario';
import CrudOcupacion from '../views/modulo_usuario/CrudOcupacion';


const AllRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="login" element={<Login />} />

        {/* menu de modulos */}
        <Route exact path="/paganado" element={<PaginaGanado />} />
        <Route exact path="/menuganado" element={<MenuGanado />} />
        <Route exact path="/menuinventario" element={<MenuInventario />} />
        <Route exact path="/menuusuarios" element={<MenuUsuarios />} />

        {/* modulo de ganado */}
        <Route exact path="ganado" element={<CrudGanado />} />
         {/* submodulos ganado */}
         <Route exact path="paPlanS" element={<PaPlanS />} />
         <Route exact path="plansanitario" element={<PlanSanitario />} />
         <Route exact path="controlmensual" element={<ControlMensual />} />
         <Route exact path="comerciante" element={<CompraVenta />} />
        
        {/*<Route exact path="usuarios" element={<ListaUsuarios />} /> */}
        <Route exact path="pausuarios" element={<PaginaUsuario />} />
        <Route exact path="empleados" element={<CrudEmpleado />} />
        <Route exact path="usuarios" element={<CrudUsuario />} />

{// modulo de inventario
}
        <Route exact path="painventario" element={<PaginaInventario />} />
        <Route exact path="inventario" element={<CrudInventario />} />
        <Route exact path="producto" element={<CrudProducto />} />
        <Route exact path="ocupacion" element={<CrudOcupacion />} />

    

    
    </Routes>
);

export default AllRoutes;