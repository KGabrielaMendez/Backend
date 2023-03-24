import React from 'react'; 
import { TextField } from "@mui/material";

export const TextField =({ 
    id, 
    name,
    label,
    type,
    handleChange,
    value, 
}) =>{


    return(
        <TextField
    id="peso_kg"
    name="peso_kg"
    label="Peso (kg)"
    type="number"
    variant="outlined"
    InputLabelProps={{
        shrink: true,
    }}
    defaultValue={form.peso_kg}
    onChange={handleChange} />
    )
}
