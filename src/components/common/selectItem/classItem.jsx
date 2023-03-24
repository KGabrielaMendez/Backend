import React, { Component } from 'react'
import { getDatos } from './../../../services/CRUD/index';
import SelectItemGrupo from './index';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default class SelectItemByDb extends Component {
    
    constructor(props) {
        super();
        this.state = {
            data: [],
            isReady: false,
            hasError: false,
            error: null,
            endpoint: props.endpoint,
            placeholder: props.placeholder,
            optionLabel: props.optionLabel,
            selectedData: '',
            onChangeId: props.handleChange,
        }
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange = (event) => {
        
        this.setState({
            selectedData: event.target.value
        });
        console.error('esto.-------',event.target.value);
        

    }

    componentDidMount = async () => {
        console.log('endpoint: ' + this.state.endpoint)
        console.log('key: ' + this.state.endpoint)

        const data = await getDatos(this.state.endpoint);
        if (!data.hasError) {
            this.setState({
                data,
                isReady: true,
            });
        } else {
            this.setState({
                hasError: true,
                error: data.error
            })
        }
    }
    render() {

        const {
            data,
            placeholder,
            onChangeId,
            optionLabel } = this.state;
        console.log("index of: ", data, placeholder)

        const dynamicMenuItem = data.map(col => {
            if (optionLabel === "nombre_ra") {
                return <option key={col.id} value={col.id} >{col.nombre_ra}</option>

            } else {
                return <option key={col.id} value={col.id} >{col.nombre_gru}</option>

            }
        });

        return (
            <>
            <th>
<select value={this.state.selectedData} onChange={this.handleChange} >
{dynamicMenuItem}
</select>
<button onClick={onChangeId} value="Agregar Grupo y Raza">Agregar</button>
</th>
                {/* <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedData}
                    label={placeholder}
                    onChange={handleChange}

                    placeholder={placeholder}

                >
                    {dynamicMenuItem}

                </Select> */}
                {this.state.selectedData}

                {/* <SelectItem 
        datos={data} 
        placeholder={placeholder}
        optionLabel={optionLabel}
        onChange={(e) => this.setState({selectedData: e.target.value})}/> */}

            </>
        )
    }
}

function Hijo (props){
    return this.state.selectedData;
}
