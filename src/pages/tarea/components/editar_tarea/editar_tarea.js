import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, InputLabel, Select, TextField } from '@mui/material';
import './editar_tarea.scss'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';

const ReactHookFormSelect = ({
    name,
    label,
    defaultValue,
    children,
    control,
    ...props
}) => {
    const labelId = `${name}-label`;
    console.log(props)
    return (
        <FormControl {...props}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                render={({ field }) => <Select labelId={labelId} label={label}>
                    {children}
                </Select>}
                name="firstName"
                control={control}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
};

const tareas = {
    data: [
        {
            id: 1,
            name: "Comprar productos",
            proyectoNombre: "Construccion cancha de tenis",
            fechaInicio: dayjs('2022-10-10T21:11:54'),
            fechaFin: dayjs('2023-10-10T21:11:54'),
            estado: 1,
            empleado: 2
        },
        {
            id: 2,
            name: "Comprar decoracion",
            proyectoNombre: "Construccion cancha de tenis",
            fechaInicio: dayjs('2022-10-10T21:11:54'),
            fechaFin: dayjs('2023-10-10T21:11:54'),
            estado: 2,
            empleado: 1

        },
        {
            id: 3,
            name: "Comprar muebles",
            proyectoNombre: "Construccion cancha de tenis",
            fechaInicio: dayjs('2022-10-10T21:11:54'),
            fechaFin: dayjs('2023-10-10T21:11:54'),
            estado: 3,
            empleado: 3

        },
    ]
}


const tareaInitialState = {
    data: {
        id: null,
        name: null,
        proyectoNombre: null,
        fechaInicio: null,
        fechaFin: null,
        estado: 1,
        empleado: null
    }
}

function EditarTarea({ idTarea, handleClose }) {
    const [ tarea, setTarea ] = React.useState(tareaInitialState.data)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm();



    React.useEffect(() => {
        const tarea = tareas.data.find(x => x.id === idTarea)
        setTarea(tarea)
        let defaultValues = {
            nombre: tarea.name,
            fechaInicio: tarea.fechaInicio,
            fechaFin: tarea.fechaFin,
            estado: tarea.estado,
            empleado: tarea.empleado

        }
        reset({ ...defaultValues })
    }, [])



    const onSubmit = (data) => console.log(data);

    return (
        <div className='editarTarea_container'>
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
                        label="Fecha Inicio"
                        inputFormat="DD/MM/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        {...register("fechaInicio", { required: true })}
                    />
                    <DesktopDatePicker
                        label="Fecha Fin"
                        inputFormat="DD/MM/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        {...register("fechaFin", { required: true })}
                    />
                </LocalizationProvider>

                <ReactHookFormSelect
                    id="estado"
                    name="estado"
                    label="Estado"
                    control={control}
                    variant="outlined"
                    margin="normal"                       

                >
                    <MenuItem value={1}>Por hacer</MenuItem>
                    <MenuItem value={2}>En progreso</MenuItem>
                    <MenuItem value={3}>Finalizado</MenuItem>
                </ReactHookFormSelect>
                <Select
                    labelId="empleadoLabel"
                    id="empleadoId"
                    value={tarea.empleado ?? ''}
                    label="Empleado"
                    {...register("empleado", { required: true })}
                >
                    <MenuItem value={1}>Maxi</MenuItem>
                    <MenuItem value={2}>Jorge</MenuItem>
                    <MenuItem value={3}>Carlos</MenuItem>

                </Select>
                <Button onClick={handleClose} variant="contained" type="submit">
                    Guardar
                </Button>
            </form>
        </div>
    )
}

export default EditarTarea