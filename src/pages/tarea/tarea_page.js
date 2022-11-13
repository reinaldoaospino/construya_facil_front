import React from 'react'
import { Button, Dialog, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";

import './tarea_page.scss'
import EditarTarea from './components/editar_tarea/editar_tarea';
import ConfirmarDialog from '../../components/confirmar_dialog/confirmar_dialog';
import { useForm } from 'react-hook-form';
import { CreateTarea, DeleteTarea, getTareasByFilter, UpdateTarea } from '../../services/tarea-service';
import useFetchWithLoader from '../../hooks/useFechWithLoader';
import CrearTarea from './components/crear_tarea/crear_tarea';
import dayjs from 'dayjs';
import { getProyectosByFilter } from '../../services/proyecto-service';
import useSessionStorage from '../../hooks/useSessionStorage';


const tareaInitialState = {
    data: [
        {
            id: null,
            nombre: null,
            proyectoNombre: null,
            fechaInicio: null,
            fechaFin: null,
            estado: null,
            empleado: null,
            proyectoName: null,
            userId: null,
            proyectoId: null
        },
    ]
}


function TareaPage() {
    const [ tareas, setTareas ] = React.useState(tareaInitialState.data);
    const [ openEditarTarea, setOpenEditarTarea ] = React.useState(false);
    const [ openCrearTarea, setOpenCrearTarea ] = React.useState(false);
    const [ openConfirmarEliminar, setOpenConfirmarEliminar ] = React.useState(false);
    const [ tareaEditar, setTareaEditar ] = React.useState();
    const [ tareaEliminar, setTareaEliminar ] = React.useState();
    const { loading, callEndpoint } = useFetchWithLoader();
    const { getValue: getSessionToken } = useSessionStorage('managamentUserToken')
    const userSession = getSessionToken()


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    React.useEffect(() => {
        const getTareas = async () => {
            var response;

            if (userSession.userRole === 1) {

                response = await callEndpoint(
                    getProyectosByFilter('', null)
                )
            } else {
                response = await callEndpoint(
                    getProyectosByFilter('', userSession.empresaId)
                )
            }


            if (response?.status === 200) {
                maptareas(response.data)
            }
        }
        getTareas()
    }, [])

    const handleEditarTarea = (tareaData) => {
        console.log(tareaData)
        setTareaEditar(tareaData);
        setOpenEditarTarea(true)

    }

    const handleEditarTareaClose = async (tarea) => {
        await callEndpoint(UpdateTarea(tarea))

        var response;

        if (userSession.userRole === 1) {

            response = await callEndpoint(
                getProyectosByFilter('', null)
            )
        } else {
            response = await callEndpoint(
                getProyectosByFilter('', userSession.empresaId)
            )
        }

        if (response.status === 200) {
            maptareas(response.data)
        }
        setTareaEditar(null)
        setOpenEditarTarea(false)
    }

    const handleCrearTarea = () => {
        setOpenCrearTarea(true)
    }

    const handleCrearTareaClose = async (data) => {
        if (data) {
            await callEndpoint(CreateTarea(data))
        }

        var response;

        if (userSession.userRole === 1) {

            response = await callEndpoint(
                getProyectosByFilter('', null)
            )
        } else {
            response = await callEndpoint(
                getProyectosByFilter('', userSession.empresaId)
            )
        }

        if (response.status === 200) {
            maptareas(response.data)
        }

        setOpenCrearTarea(false)
    }

    const handleConfirmarEliminarOpen = (idTarea) => {
        setTareaEliminar(idTarea)
        setOpenConfirmarEliminar(true)
    }


    const handleConfirmarEliminarClose = async (result) => {
        if (result === 'si') {
            await callEndpoint(
                DeleteTarea(tareaEliminar)
            )

            var response;

            if (userSession.userRole === 1) {

                response = await callEndpoint(
                    getProyectosByFilter('', null)
                )
            } else {
                response = await callEndpoint(
                    getProyectosByFilter('', userSession.empresaId)
                )
            }

            if (response.status === 200) {
                maptareas(response.data)
            }
        }


        setTareaEliminar(null)
        setOpenConfirmarEliminar(false)
    }

    const estadoMapper = (estado) => {
        switch (estado) {
            case 0:
                return 'Por hacer'
            case 1:
                return 'En progreso'
            case 2:
                return 'Finalizada'
            default:
                break;
        }
    }

    const convertDateTostring = (data) => {
        return `${dayjs(data).date()}/${dayjs(data).month() + 1}/${dayjs(data).year()}`;
    }


    const filterTareas = async (data) => {

        var response;

        if (userSession.userRole === 1) {

            response = await callEndpoint(
                getProyectosByFilter('', null)
            )
        } else {
            response = await callEndpoint(
                getProyectosByFilter('', userSession.empresaId)
            )
        }

        if (response.status === 200) {
            maptareasWithFilter(response.data, data.textoFiltro)

        }
    }


    const maptareas = (data) => {
        var tareas = [];

        data.forEach(x => {
            tareas.push(...x.tareas)
        });
        setTareas(tareas)
    }

    const maptareasWithFilter = (data, text) => {
        console.log(text)
        var tareas = [];
        data.forEach(x => {
            tareas.push(...x.tareas)
        });

        var tareasFilter = tareas.filter(x => {
            return x.nombre.toLowerCase().includes(text.toLowerCase())
        })


        setTareas(tareasFilter)
    }
    return (
        <div className='usuarioPageContainer'>

            <h2>Control Tareas</h2>
            <Divider />
            <form className='inputsContainer' onSubmit={handleSubmit(filterTareas)}>
                <TextField id="outlined-basic" label="Nombre" variant="outlined" {...register("textoFiltro", { required: false })} />
                <Button variant="contained" className='buscar-btn' type='submit'>Buscar</Button>
                <Button variant="contained" className='btn-create' onClick={handleCrearTarea}>Crear</Button>

            </form>
            <Divider />
            <TableContainer className='tableContainer' component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead >
                        <TableRow className='tableHead' >
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha Inicio</TableCell>
                            <TableCell>Fecha Fin</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Empleado</TableCell>
                            <TableCell>Proyecto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tareas ?
                                tareas.map((tarea) => (
                                    <TableRow key={tarea.id}>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {tarea.nombre}
                                        </TableCell>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {convertDateTostring(tarea.fechaInicio)}
                                        </TableCell>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {convertDateTostring(tarea.fechaFin)}
                                        </TableCell>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {estadoMapper(tarea.estado)}
                                        </TableCell>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {tarea.userName}
                                        </TableCell>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {tarea.proyectoName}
                                        </TableCell>
                                        <TableCell style={{ width: 20 }}>
                                            <div className='buttonGroup' variant="contained" aria-label="outlined primary button group">
                                                <Button variant="contained" onClick={() => handleEditarTarea(tarea)}>Editar</Button>
                                                <Button variant="contained" onClick={() => handleConfirmarEliminarOpen(tarea.id)}>Elimintar</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : null
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>

                        </TableRow>
                    </TableFooter>
                </Table>

            </TableContainer>
            <Dialog open={openEditarTarea} onClose={handleEditarTareaClose}>
                {<EditarTarea tareaData={tareaEditar} handleClose={handleEditarTareaClose} />}
            </Dialog>
            <Dialog open={openConfirmarEliminar} onClose={handleConfirmarEliminarClose}>
                {<ConfirmarDialog handleClose={handleConfirmarEliminarClose} />}
            </Dialog>
            <Dialog open={openCrearTarea} onClose={handleCrearTareaClose}>
                {<CrearTarea handleClose={handleCrearTareaClose} />}
            </Dialog>
        </div>
    )
}

export default TareaPage