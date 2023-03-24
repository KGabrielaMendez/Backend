import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import GetContext from '../../../Context/grupoRazaContext';
import { FormControl, InputLabel } from '@mui/material';


const SelectItemGrupo = ({form}) => {

  const { grupo, dataListGrupo, handleChangeGrupo }
    = useContext(GetContext);

  const dynamicMenuItem = dataListGrupo.map(col => {
    return <MenuItem key={col.id} value={col.id} >{col.nombre_gru}</MenuItem>
  });

  return (

    <div >
      <FormControl fullWidth={true}>
        <InputLabel >{form ? 
              form
            : "Grupo"}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="grupo-id"
          label={"Grupo"}
          onChange={handleChangeGrupo}
          variant="outlined"
          defaultValue={"Grupo"}
          value={grupo}
        >
          <MenuItem key="0" value="Grupo" disabled={true}>Grupo</MenuItem>
          {dynamicMenuItem}

        </Select>
      </FormControl>
    </div>

  )
}
export default SelectItemGrupo;