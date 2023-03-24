import React from 'react';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';


const SelectItem = (
  {
    id,
    name,
    selected,
    handleChange,
    dynamicMenuItem,
    disabled,
    label
  }) => {

  return (

    <div >
      <Select
      disabled={disabled}
        labelId="demo-simple-select-helper-label"
        id="id"
        
        label={label}
        onChange={handleChange}
        variant="outlined"
        defaultValue={label}
      >
 <MenuItem key="" value={label} disabled={true}>{label}</MenuItem>

        {dynamicMenuItem}

      </Select>
    </div>

  )
}
export default SelectItem;