import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import CrudGanado from './CrudganadoIndex';

const MenuGanado = () => {
    const menu = useRef(null);
    const toast = useRef(null);
    const items = [
        {
            label: 'Acciones',
            items: [
                {
                    label: 'Ganado',
                    command: () => {
                        toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                }
            ]
        },
        {
            label: 'Navigate',
            items: [
                {
                    label: 'React Website',
                    icon: 'pi pi-external-link',
                    url: 'https://reactjs.org/'
                },
                {
                    label: 'Router',
                    icon: 'pi pi-upload',
                    command:(e) => {
                        window.location.hash = "/fileupload"
                    }
                }
            ]
        }
    ];

    return (
        <div>
            <Toast ref={toast}></Toast>

            <div className="card">
                <h5>Inline</h5>
                <Menu model={items} />
                <CrudGanado />
                <h5>Overlay</h5>
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button label="Show" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
        </div>
    );
}

export default MenuGanado;