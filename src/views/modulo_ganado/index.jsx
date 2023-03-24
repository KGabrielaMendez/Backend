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
import ReportesGanado from './../Reportes/ganado';



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

export default function PaginaGanado() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="card">
            
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper',display: '-webkit-flex', height: 1000 ,boxShadow:5 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 2, borderColor: 'divider' ,width:300}}
                >
                    <Tab label="Ganado" {...a11yProps(0)} />
                    <Tab label="Plan Sanitario" {...a11yProps(1)} />
                    <Tab label="Control Mensual de Leche" {...a11yProps(2)} />
                    <Tab label="Compra y Venta" {...a11yProps(3)} />
                    <Tab label="Reportes" {...a11yProps(4)} />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <CrudGanado />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <PaPlanS />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <CrudOrdenio />
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <CompraVenta />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <ReportesGanado />
                </TabPanel>

            </Box>
        </div>
    );
}
