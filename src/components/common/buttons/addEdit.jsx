import { Button } from 'primereact/button';
import React, { useContext } from 'react';

import { SplitButton } from 'primereact/splitbutton';
import LoginContext from '../../../Context/login';

function ButtonAddEdit(props) {
    const {sesion} = useContext(LoginContext);

    const { dataToEdit,
        change,
        del
    } = props;

    const items = [
        {
            label: 'Actualizar',
            className: 'p-button-info',
            icon: 'pi pi-refresh',
            command: () => {
                change()
            }
        },
        {
            label: 'Eliminar',
            icon: 'pi pi-times',
            command: () => {
               del()
            }
        },
    ]
    return (
        <>

{sesion.rol ===1 ||sesion.rol ===2 &&
            <div height="50px" width="25%">
                {!dataToEdit ?
                    <>
                        <Button label="Nuevo"
                            icon="pi pi-plus"
                            className="p-button-success mr-2"
                            onClick={change}
                        />
                        
                    </> :
                    <>
                    <SplitButton label="Actualizar" onClick={change}
                    className="p-button-raised p-button-plain p-button-text mr-2 mb-2 right" 
                    model={items}/>
                       
                    </>
                }
            </div>
    }
        </>
    )
}

export default ButtonAddEdit;