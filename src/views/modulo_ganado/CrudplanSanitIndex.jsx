import React, { Component } from 'react';
import CrudApp from '../../components/CrudPlanSanitario/crudApp';
import { PlanSProvider } from '../../Context/planSContext';


class CrudPlanSanitario extends Component {

    render() {
        return (
            <PlanSProvider>
            <CrudApp/>
            </PlanSProvider>
        )
    }
}

export default CrudPlanSanitario;