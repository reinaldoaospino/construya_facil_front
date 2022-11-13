import React from 'react'
import './editar_proyecto.scss'
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';



const proyectoInitialState = {
    data: {
        id: null,
        nombre: null,
        fechaInicio: null,
        fechaFin: null
    }
}


const EditarProyecto = ({ proyectoData, handleClose }) => {
    const [ proyecto, setProyecto ] = React.useState(proyectoInitialState.data)
    const [ inicioValue, setinicioValue ] = React.useState(dayjs(proyectoData?.fechaInicio));
    const [ finValue, setfinValue ] = React.useState(dayjs(proyectoData?.fechaFin));
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    React.useEffect(() => {
        proyecto.id = proyectoData.id;
        proyecto.nombre = proyectoData.nombre;
        proyecto.fechaInicio = proyectoData.fechaInicio;
        proyecto.fechaFin = proyectoData.fechaFin;
        setProyecto(proyecto)
    }, [])

    const onSubmit = (data) => {
        proyecto.nombre = data.nombre;
        proyecto.fechaInicio = inicioValue;
        proyecto.fechaFin = finValue;
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
                    defaultValue={proyectoData?.nombre}
                    {...register("nombre", { required: true })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DesktopDatePicker
                        id="fechaInicio"
                        label="Fecha Inicio"
                        name="fechaInicio"
                        inputFormat='DD/MM/YYYY'
                        value={inicioValue}
                        onChange={handleInicioChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        id="fechaFin"
                        label="Fecha Fin"
                        name="fechaFin"
                        inputFormat='DD/MM/YYYY'
                        value={finValue}
                        onChange={handleFinChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button onClick={handleClose} variant="contained" type="submit">
                    Guardar
                </Button>
            </form>
        </div>
    )
}

export default EditarProyecto