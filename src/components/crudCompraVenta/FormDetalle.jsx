import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CVContext from '../../Context/CompraVentaContext';
import Autocomplete from '@mui/material/Autocomplete';
import CrudContext from '../../Context/crudContext';
import DataTableList from '../common/datatable/datatable2';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Column } from 'primereact/column';

const columns = [
    {
        field: "arete_gan",
        header: "N° de Arete",
    },
    {
        field: "peso_kg",
        header: "Peso (KG)"
    },
    {
        field: "precio_libra",
        header: "Precio de Libra"
    },
    {
        field: "precio_unitario",
        header: "Precio Unitario"
    }
];

export const FormDetalleCV = () => {
    const { 
        dataToEdit,
        setDataToEdit,
    } = useContext(CVContext);
    const { dataList } = useContext(CrudContext);
    const [peso_kilos,setPeso_kilos] =useState (0);
    const [form, setForm] = useState([]);
    const [dataGanado, setDataGanado] = useState([]);
    const listDetail=[];

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const [subtotal, setSubtotal] = useState(0);
    const [destare, setDestare] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
   
    useEffect(() => {
        setDataGanado(dataList);
    }, [dataList]);

    useEffect(() => {
      
      //destare 
      setDestare(subtotal*0.02);
      //precio total 
      setPrecioTotal(subtotal-(subtotal*0.02));
    },[subtotal]);
    console.log("dataGanado", dataGanado);

    useEffect(() => {
        setForm({
            ...form,
            "precio_unitario": ((form.peso_kg * 2.2) * form.precio_libra),
        });
    }, [form.precio_libra]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.arete_gan || !form.peso_kg || !form.precio_libra) {
            alert("Datos incompletos");
            return;
        };
        //subtotal
      setSubtotal(subtotal+form.precio_unitario);
        listDetail.push(form);
        setPeso_kilos(parseInt(peso_kilos) + parseInt(form.peso_kg));
      setForm([]);

    };
    var results;
    try {
        results = dataList.filter(function (dataList) { return dataList.arete_gan !== null });
    }catch(error){
        alert("hubo un error")
    }

    const defaultProps = {

        options: results,
        getOptionLabel: (option) => option.arete_gan,

    };


    let footerGroup = <ColumnGroup>
    <Row>
        <Column footer="Cantidad de Reses"  footerStyle={{textAlign: 'center'}}/>
        <Column footer="Peso Kilos" footerStyle={{textAlign: 'center'}}/>
        <Column footer="Peso Libras"/>
        <Column footer="Subtotal" footerStyle={{textAlign: 'center'}}/>
    </Row>
    <Row>
        <Column footer={listDetail.length}  footerStyle={{textAlign: 'center'}}/>
        <Column footer={peso_kilos} footerStyle={{textAlign: 'center'}}/>
        <Column footer={peso_kilos*2.2} footerStyle={{textAlign: 'center'}}/>
        <Column footer={subtotal.toFixed(2)}  footerStyle={{textAlign: 'center'}}/>
    </Row>
    <Row>
        <Column footer=""  footerStyle={{textAlign: 'center'}}/>
        <Column footer=""  footerStyle={{textAlign: 'center'}}/>
        <Column footer="Destare 2%" footerStyle={{textAlign: 'center', color:'#037ADF' }}/>
        <Column footer={destare.toFixed(2)} footerStyle={{textAlign: 'center', color:'#037ADF'}}/>
    </Row>
    <Row>
    <Column footer="" footerStyle={{textAlign: 'center' }}/>
    <Column footer="" footerStyle={{textAlign: 'center' }}/>
    <Column footer="TOTAL" footerStyle={{textAlign: 'center' ,color: '#FF0000'}}/>

        <Column footer={precioTotal.toFixed(2)}  footerStyle={{textAlign: 'center' ,color: '#FF0000'}}/>
    </Row>
    </ColumnGroup>;


    return (
        <>
            HOLA
            <center>
                <h3> Detalles </h3>
            </center>

            <table>
                <tbody>
                    <tr>
                        <th>
                            <Autocomplete
                                {...defaultProps}
                                name="arete_gan-auto"
                                id="disable-clearable"
                                disableClearable
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Arete de Ganado"
                                        defaultValue={form.arete_gan}
                                        name='arete_gan'
                                        onSelect={handleChange}
                                    />
                                )}
                            />
                        </th>
                        <th>
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
                        </th>
                        <th><TextField
                            id="precio_libra"
                            name="precio_libra"
                            label="Precio de Libra"
                            variant="outlined"
                            defaultValue={0.60}
                            onSelect={handleChange} />
                        </th>
                        <th><Button
                            color="success"
                            variant="contained"
                            onClick={handleSubmit}>Agregar Datos</Button></th>

                    </tr>
                </tbody>
            </table>
            <div>
                {listDetail &&
                    <DataTableList
                    
                        key="tablaDetallesCV"
                        dataList={listDetail}
                        columns={columns}
                        header={""}
                        dataToEdit={dataToEdit}
                        setDataToEdit={setDataToEdit} 
                        footer={footerGroup} />
                }
            </div>
        </>
    )
};

