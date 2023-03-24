import React,{useContext} from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBar } from "@mui/material";
import { PlanSProvider } from "../../Context/planSContext";
import CrudPlanSanitario from "./CrudplanSanitIndex";
import CrudPendiente from "../../components/CrudPlanSanitario/crudPendiente";
import { FormPlanS } from './../../components/CrudPlanSanitario/Form';
import { GetGrupoProvider } from "../../Context/grupoRazaContext";
import { ADMIN_ROLE } from "../../consts";
import LoginContext from "../../Context/login";

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

const PaPlanS = () => {
    const [value, setValue] = React.useState(0);
    const {sesion}= useContext(LoginContext);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="card">
            <Box sx={{ bgcolor: 'background.paper', width: 1000, height: 1000, boxShadow: 8 }}>


                <AppBar position="static">

                    <Tabs
                        textColor="inherit"
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="full width tabs example"
                    >
                        <Tab label="Eventos Próximos" {...a11yProps(0)} />
                        <Tab label="Historial" {...a11yProps(1)} />
                    </Tabs>

                </AppBar>
                {sesion.rol === ADMIN_ROLE &&
                <>
                    <PlanSProvider>
                        <GetGrupoProvider>
                            <FormPlanS />
                        </GetGrupoProvider>
                    </PlanSProvider>
                </>
                }

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

export default PaPlanS;