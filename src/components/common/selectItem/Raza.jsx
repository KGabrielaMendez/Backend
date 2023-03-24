import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';


const SelectItemRaza = (
  {
    raza,
    dataListRaza,
    handleChangeRaza,
    form
  }) => {


  console.log(dataListRaza, 'datos getcontext raza',form)

  const dynamicMenuItem = dataListRaza.map(col => {
    return <MenuItem key={col.field} value={col.id} >{col.nombre_ra}</MenuItem>
  });

  return (

    <div >
      <FormControl fullWidth ={true}>
              <InputLabel >
              {form ? 
              form
            : "Raza"}
              </InputLabel>
      <Select
      key="12rza"
      fullWidth={true}
        labelId="demo-simple-select-helper-label"
        id="outlined-required"
        variant="outlined"
        size="small"
        value={raza}
        label={"Raza"}
        onChange={handleChangeRaza}
        defaultValue={"Raza"}
      >
        <MenuItem key="0" value="Raza" disabled={true}>Raza</MenuItem>
        {dynamicMenuItem}

      </Select>
      </FormControl>
    </div>

  )
}
export default SelectItemRaza;