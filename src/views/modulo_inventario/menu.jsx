import React,{useContext} from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CrudInventario from './CrudInventario';
import CrudProducto from './CrudProducto';
import LoginContext from "../../Context/login";
import { ADMIN_ROLE } from "../../consts";
import Salidas from "./Salida";

export function TabPanel(props) {
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

export default function PaInventario() {
    const [value, setValue] = React.useState(0);
    const {sesion} = useContext(LoginContext);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="card">
            <Box  sx={{ flexGrow: 1, bgcolor: 'background.paper', display: '-webkit-flex', height: 1000 ,boxShadow:5}}>
                
                    <Tabs
                         orientation="vertical"
                         variant="scrollable"
                         value={value}
                         onChange={handleChange}
                         aria-label="Vertical tabs example"
                         sx={{ borderRight: 2, borderColor: 'divider' ,width:300 }}
                     >
                         <Tab label="Inventario" {...a11yProps(0)} />
                    <Tab label="Producto" {...a11yProps(1)} />
                    {sesion.rol===ADMIN_ROLE &&
                    <Tab label="Egresos" {...a11yProps(2)} />
                    }
                
                    </Tabs>
                
                <TabPanel value={value} index={0}>


                    <CrudInventario />

                </TabPanel>

                <TabPanel value={value} index={1}>
                    <CrudProducto />
                </TabPanel>
                {sesion.rol===ADMIN_ROLE &&
                <TabPanel value={value} index={2}>
                    <Salidas />
                </TabPanel>
}
            </Box>
        </div>
    );
}
