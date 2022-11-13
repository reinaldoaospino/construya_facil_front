import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import './crear_proyecto.scss'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const proyectoInitialState = {
    data: {
        id: null,
        nombre: null,
        fechaInicio: null,
        fechaFin: null
    }
}


const CrearProyecto = ({ handleClose }) => {
    const [ proyecto, setProyecto ] = React.useState(proyectoInitialState.data)
    const [ inicioValue, setinicioValue ] = React.useState(dayjs());
    const [ finValue, setfinValue ] = React.useState(dayjs());
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    const onSubmit = (data) => {
        proyecto.nombre = data.nombre;
        proyecto.fechaInicio = inicioValue
        proyecto.fechaFin = finValue
        setProyecto(proyecto);
        handleClose(proyecto);
    }

    const handleInicioChange = (newValue) => {
        setinicioValue(newValue);
    };

    const handleFinChange = (newValue) => {
        setfinValue(newValue);
    };

    return (
        <div className='editarProyecto_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    {...register("nombre", { required: true })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DesktopDatePicker
                        id="fechaInicio"
                        label="Fecha Inicio"
                        name="fechaInicio"
                        value={inicioValue}
                        onChange={handleInicioChange}                        
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        id="fechaFin"
                        label="Fecha Fin"
                        name="fechaFin"
                        value={finValue}
                        onChange={handleFinChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button variant="contained" type="submit">
                    Crear
                </Button>
            </form>
        </div>
    )
}

export default CrearProyecto