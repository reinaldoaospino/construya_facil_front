import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, InputLabel, Select, TextField } from '@mui/material';
import './editar_tarea.scss'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import { getProyectosByFilter } from '../../../../services/proyecto-service';
import useFetchWithLoader from '../../../../hooks/useFechWithLoader';
import { getAllUsers } from '../../../../services/usuario-service';
import useSessionStorage from '../../../../hooks/useSessionStorage';



const tareaInitialState = {
    data:
    {
        id: null,
        nombre: null,
        proyectoNombre: null,
        fechaInicio: null,
        fechaFin: null,
        estado: null,
        empleado: null,
        proyectoName: null
    },

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

function EditarTarea({ tareaData, handleClose }) {
    const [ tarea, setTarea ] = React.useState(tareaInitialState.data)
    const [ proyectos, setProyectos ] = React.useState(proyectoInitialState.data);
    const [ usuarios, setUsuarios ] = React.useState(userInitialState.data);

    const [ inicioValue, setinicioValue ] = React.useState(dayjs(tareaData?.fechaInicio));
    const [ finValue, setfinValue ] = React.useState(dayjs(tareaData?.fechaFin));
    const [ estadoValue, setEstadoValue ] = React.useState(tareaData?.estado);
    const [ proyectoValue, setProyectoValue ] = React.useState();
    const [ usuarioValue, setUsuarioValue ] = React.useState();
    const { loading, callEndpoint } = useFetchWithLoader();
    const { getValue: getSessionToken } = useSessionStorage('managamentUserToken')
    const userSession = getSessionToken()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm();



    React.useEffect(() => {

        const getProyectos = async () => {
            const response = await callEndpoint(
                getProyectosByFilter('', userSession.empresaId)
            )

            if (response?.status === 200) {
                setProyectos(response?.data)
                setProyectoValue(tareaData?.proyectoId)
            }
        }

        const getUsuarios = async () => {
            const response = await callEndpoint(
                getAllUsers()
            )

            if (response?.status === 200) {
                setUsuarios(response?.data)
                setUsuarioValue(tareaData?.userId)
            }
        }

        getProyectos();

        getUsuarios();

        tarea.id = tareaData.id
        tarea.nombre = tareaData.nombre;
        tarea.fechaInicio = tareaData.fechaInicio
        tarea.fechaFin = tareaData.fechaFin
        tarea.estado = tareaData.estado
        tarea.userId = tareaData.userId
        tarea.proyectoId = tareaData.proyectoValue
        setTarea(tarea)
    }, [])



    const onSubmit = (data) => {
        tarea.nombre = data.nombre;
        tarea.fechaInicio = inicioValue
        tarea.fechaFin = finValue
        tarea.estado = estadoValue
        tarea.userId = usuarioValue
        tarea.proyectoId = proyectoValue
        setTarea(tarea);
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
        <div className='editarTarea_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    defaultValue={tareaData?.nombre}
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
                            value={proyectoValue ? proyectoValue : ''}
                            label="proyecto"
                            onChange={handleProyectoChange}
                        >
                            {proyectos.map((item, index) =>
                                <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                }


                {usuarios && usuarioValue &&
                    <FormControl fullWidth>
                        <InputLabel id="usuariopSelectLabel">Usuarios</InputLabel>
                        <Select
                            labelId="usuariopSelectLabel"
                            id="usuarioSelect"
                            value={usuarioValue ? usuarioValue : ''}
                            label="usuario"
                            onChange={handleUsuarioChange}
                        >
                            {usuarios.map((item, index) =>
                                <MenuItem key={item.id} value={item.id}>{item.name}  {item.lastName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                }

                <Button variant="contained" type="submit">
                    Guardar
                </Button>
            </form>
        </div>
    )
}

export default EditarTarea