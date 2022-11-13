import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './crear_tarea.scss'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import useFetchWithLoader from '../../../../hooks/useFechWithLoader';
import { getProyectosByFilter } from '../../../../services/proyecto-service';
import { getAllUsers, getUsersByFilter } from '../../../../services/usuario-service';
import useSessionStorage from '../../../../hooks/useSessionStorage';

const tareaInitialState = {
    data: {
        id: null,
        nombre: null,
        fechaInicio: null,
        fechaFin: null,
        estado: null,
        userId: null,
        proyectoId: null
    }
}


const proyectoInitialState = {
    data: [
        {
            id: null,
            nombre: null,
        }
    ]
}


const userInitialState = {
    data: [
        {
            id: null,
            name: null,
            lastName: null,
            email: null
        }
    ]
}



const CrearTarea = ({ handleClose }) => {
    const [ tarea, settarea ] = React.useState(tareaInitialState.data)
    const [ proyectos, setProyectos ] = React.useState(proyectoInitialState.data);
    const [ usuarios, setUsuarios ] = React.useState(userInitialState.data);
    const [ inicioValue, setinicioValue ] = React.useState(dayjs());
    const [ finValue, setfinValue ] = React.useState(dayjs());
    const [ estadoValue, setEstadoValue ] = React.useState(0);
    const [ proyectoValue, setProyectoValue ] = React.useState();
    const [ usuarioValue, setUsuarioValue ] = React.useState();
    const { getValue: getSessionToken } = useSessionStorage('managamentUserToken')
    const userSession = getSessionToken()

    const { loading, callEndpoint } = useFetchWithLoader();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    React.useEffect(() => {
        const getProyectos = async () => {
            const response = await callEndpoint(
                getProyectosByFilter('', userSession.empresaId)
            )

            if (response?.status === 200) {
                setProyectos(response?.data)
                setProyectoValue(response?.data[ 0 ].id)
            }
        }


        const getUsuarios = async () => {
            const response = await callEndpoint(
                getUsersByFilter('', userSession.empresaId)
            )

            if (response?.status === 200) {
                setUsuarios(response?.data)
            }
        }

        getProyectos();
        getUsuarios();

    }, [])


    const onSubmit = (data) => {
        tarea.nombre = data.nombre;
        tarea.fechaInicio = inicioValue
        tarea.fechaFin = finValue
        tarea.estado = estadoValue
        tarea.userId = usuarioValue
        tarea.proyectoId = proyectoValue
        settarea(tarea);
        handleClose(tarea);
    }

    const handleInicioChange = (newValue) => {
        setinicioValue(newValue);
    };

    const handleFinChange = (newValue) => {
        setfinValue(newValue);
    };

    const handleEstadoChange = (event) => {
        setEstadoValue(event.target.value);
    };

    const handleProyectoChange = (event) => {
        setProyectoValue(event.target.value);
    };

    const handleUsuarioChange = (event) => {
        setUsuarioValue(event.target.value);
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
                <FormControl fullWidth>
                    <InputLabel id="estadoSelectLabel">Estado</InputLabel>
                    <Select
                        labelId="estadoSelectLabel"
                        id="estadoSelect"
                        value={estadoValue}
                        label="Estado"
                        onChange={handleEstadoChange}
                    >
                        <MenuItem value={0}>Por Hacer</MenuItem>
                        <MenuItem value={1}>En Progreso</MenuItem>
                        <MenuItem value={2}>Finalizado</MenuItem>
                    </Select>
                </FormControl>

                {proyectos && proyectoValue &&
                    <FormControl fullWidth>
                        <InputLabel id="proyectoSelectLabel">Proyecto</InputLabel>
                        <Select
                            labelId="proyectoSelectLabel"
                            id="proyectoSelect"
                            value={proyectoValue}
                            label="proyecto"
                            onChange={handleProyectoChange}
                        >
                            {proyectos.map((item, index) =>
                                <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                }

                {usuarios &&
                    <FormControl fullWidth>
                        <InputLabel id="usuariopSelectLabel">Usuarios</InputLabel>
                        <Select
                            labelId="usuariopSelectLabel"
                            id="usuarioSelect"
                            value={usuarioValue ? usuarioValue : ''}
                            label="usuariop"
                            onChange={handleUsuarioChange}
                        >
                            {usuarios.map((item, index) =>
                                <MenuItem key={item.id} value={item.id}>{item.name}  {item.lastName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                }

                <Button variant="contained" type="submit">
                    Crear
                </Button>
            </form>
        </div>
    )
}

export default CrearTarea