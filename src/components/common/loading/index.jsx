import React from 'react';
import { ProgressBar } from 'primereact/progressbar';


const LoadingComponent = () => {
    return (
        <>
            <p>Cargando ...</p>
            <ProgressBar mode="indeterminate" />
        </>
    )
}


export default LoadingComponent;