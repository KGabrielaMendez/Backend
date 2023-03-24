import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';


const MenuLateral = () => {
    const [visibleRight, setVisibleRight] = useState(false);

    return (
        <div>
            <div className="card">
                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <Link to="/inventario/"> <h5>Control de Inventarios</h5> </Link><p/>
                    <Link to="/producto/"><h5>Productos</h5></Link><p/>

                    <Link to="/">Inicio </Link><p/>
                    <Link to="/menuusuarios"> Módulo de Usuarios</Link><p/>
                    <Link to="/paganado"> Módulo de Ganado </Link><p/>
                    <Link to="/menuinventario"> Módulo de Inventario</Link><p/>

                </Sidebar>
                <Button icon="pi pi-bars" onClick={() => setVisibleRight(true)} className="mr-2" />
            </div>
        </div>
    )
}

export default MenuLateral