import React, { Component } from 'react';
import { PlanSProvider } from '../../Context/planSContext';
import EventosProximos from './EvProximos';


class CrudPendiente extends Component {

    render() {
        return (
            <PlanSProvider>
            <EventosProximos/>
            </PlanSProvider>
        )
    }
}

export default CrudPendiente;