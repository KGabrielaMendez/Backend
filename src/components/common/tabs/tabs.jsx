import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CrudGanado from "./CrudganadoIndex";
import CrudOrdenio from './CrudordenioIndex';
import CompraVenta from './CompraVenta';
import PaPlanS from "./menuPlanS";
import CrudPendiente from "../../CrudPlanSanitario/crudPendiente";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'} variant={'body2'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function PestañasLateral() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="card">

            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: '-webkit-flex', height: 'flex' }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Eventos Próximos" {...a11yProps(0)} />
                    <Tab label="Historial" {...a11yProps(1)} />
                </Tabs>

                <TabPanel value={value} index={0}>
                <CrudPendiente />
                </TabPanel>

                <TabPanel value={value} index={1}>
                <CrudPlanSanitario />
                </TabPanel>


            </Box>
        </div>
    );
}
