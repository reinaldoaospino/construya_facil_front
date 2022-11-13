import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { Button, Dialog, Divider, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import "./proyecto_page.scss";
import EditarProyecto from './components/editar_proyecto/editar_proyecto';
import ConfirmarDialog from '../../components/confirmar_dialog/confirmar_dialog';
import CrearProyecto from './components/crear_proyecto/crear_proyecto';
import { useForm } from 'react-hook-form';
import { CreateProyecto, DeleteProyecto, getProyectosByFilter, UpdateProyecto } from '../../services/proyecto-service';
import useFetchWithLoader from '../../hooks/useFechWithLoader';
import dayjs from 'dayjs';
import useSessionStorage from '../../hooks/useSessionStorage';




const proyectoInitialState = {
    data: [
        {
            id: null,
            nombre: null,
        }
    ]
}

function ProyectoPage() {
    const [ proyectos, setProyectos ] = React.useState(proyectoInitialState.data);
    const [ openEditarProyecto, setOpenEditarProyecto ] = React.useState(false);
    const [ openCrearProyecto, setOpenCrearProyecto ] = React.useState(false);
    const [ openConfirmarEliminar, setOpenConfirmarEliminar ] = React.useState(false);
    const [ proyectoEditar, setProyectoEditar ] = React.useState();
    const [ proyectoEliminar, setProyectoEliminar ] = React.useState();
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
        const getProyectos = async () => {
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
                setProyectos(response?.data)
            }
        }
        getProyectos()
    }, [])

    const handleEditarProyecto = (proyectoData) => {
        setProyectoEditar(proyectoData);
        setOpenEditarProyecto(true)

    }

    const handleEditarProyectoClose = async (proyecto) => {
        await callEndpoint(UpdateProyecto(proyecto))
        setOpenEditarProyecto(false)

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
            setProyectos(response?.data)
        }
        setProyectoEditar(null)
        setOpenEditarProyecto(false)
    }

    const handleCrearProyecto = () => {

        setOpenCrearProyecto(true)

    }

    const handleCrearProyectoClose = async (data) => {
        console.log(data)

        if (data) {
            data.empresaId = userSession.empresaId;
            await callEndpoint(CreateProyecto(data))
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
            setProyectos(response?.data)
        }

        setOpenCrearProyecto(false)
    }

    const handleConfirmarEliminarOpen = (idProyecto) => {
        setProyectoEliminar(idProyecto)
        setOpenConfirmarEliminar(true)
    }


    const handleConfirmarEliminarClose = async (result) => {
        if (result === 'si') {
            await callEndpoint(
                DeleteProyecto(proyectoEliminar)
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
                setProyectos(response?.data)
            }
        }


        setProyectoEliminar(null)
        setOpenConfirmarEliminar(false)
    }

    const filterProyectos = async (data) => {
        var proyectosRespones;
        if (userSession.userRole === 1) {
            proyectosRespones = await callEndpoint(
                getProyectosByFilter(data.textoFiltro, null)
            )
        } else {
            proyectosRespones = await callEndpoint(
                getProyectosByFilter(data.textoFiltro, userSession.empresaId)
            )
        }

        if (proyectosRespones.status === 200) {
            setProyectos(proyectosRespones.data)

        }
    }

    const convertDateTostring = (data) => {
        return `${dayjs(data).date()}/${dayjs(data).month() + 1}/${dayjs(data).year()}`;
    }

    return (
        <div className='usuarioPageContainer'>

            <h2>Control Proyectos</h2>
            <Divider />
            <form className='inputsContainer' onSubmit={handleSubmit(filterProyectos)}>
                <TextField id="outlined-basic" label="Nombre" variant="outlined" {...register("textoFiltro", { required: false })} />
                <Button variant="contained" className='buscar-btn' type='submit'>Buscar</Button>
                <Button variant="contained" className='btn-create' onClick={handleCrearProyecto}>Crear</Button>

            </form>
            <Divider />
            <TableContainer className='tableContainer' component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead >
                        <TableRow className='tableHead' >
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha Inicio</TableCell>
                            <TableCell>Fecha Fin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            proyectos ?
                                proyectos.map((proyecto) => (
                                    <TableRow key={proyecto.id}>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {proyecto.nombre}
                                        </TableCell>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {convertDateTostring(proyecto.fechaInicio)}
                                        </TableCell>
                                        <TableCell style={{ width: 700 }} component="th" scope="row">
                                            {convertDateTostring(proyecto.fechaFin)}
                                        </TableCell>
                                        <TableCell style={{ width: 20 }}>
                                            <div className='buttonGroup' variant="contained" aria-label="outlined primary button group">
                                                <Button variant="contained" onClick={() => handleEditarProyecto(proyecto)}>Editar</Button>
                                                <Button variant="contained" onClick={() => handleConfirmarEliminarOpen(proyecto.id)}>Elimintar</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : null
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog open={openEditarProyecto} onClose={handleEditarProyectoClose}>
                {<EditarProyecto proyectoData={proyectoEditar} handleClose={handleEditarProyectoClose} />}
            </Dialog>
            <Dialog open={openConfirmarEliminar} onClose={handleConfirmarEliminarClose}>
                {<ConfirmarDialog handleClose={handleConfirmarEliminarClose} />}
            </Dialog>
            <Dialog open={openCrearProyecto} onClose={handleCrearProyectoClose}>
                {<CrearProyecto handleClose={handleCrearProyectoClose} />}
            </Dialog>
        </div>
    )
}

export default ProyectoPage