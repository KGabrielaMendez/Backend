import React, { useContext } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CrudApp from './Crudcomerciante/index';
import ListaTransacciones from './ListadoT';
import { Provider } from "../../Context/context";
import { AppBar } from "@mui/material";
import { CrudForm } from './crudForm';
import LoginContext from './../../Context/login';


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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const { sesion } = useContext(LoginContext);
  console.log(sesion.rol,'id_rol en crudapp compra venta')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="card">
      <Box sx={{ bgcolor: 'background.paper', width: 1000, height: 1000 }}>
        <AppBar position="static">

          <Tabs
            textColor="inherit"
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="full width tabs example"
          >
           
            <Tab label="Lista de Transacciones" {...a11yProps(0)} />
            <Tab label="Comerciantes" {...a11yProps(1)} />
            {sesion.rol === 1 &&
              <Tab label="Nueva Transacción" {...a11yProps(2)} />
            }
          </Tabs>
        </AppBar>
       

        <TabPanel value={value} index={0}>
          <ListaTransacciones />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Provider>
            <CrudApp />
          </Provider>
        </TabPanel>

        {sesion.rol === 1 && 
        <TabPanel value={value} index={2}>
          <CrudForm />

        </TabPanel>
        }


      </Box>
    </div>
  );
}
