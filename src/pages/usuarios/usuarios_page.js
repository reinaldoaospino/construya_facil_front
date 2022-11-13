import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { Button, Dialog, Divider, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import "./usuarios_page..scss";
import useFetchWithLoader from '../../hooks/useFechWithLoader';
import { DeleteUser, getAllUsers, getUsersByFilter, UpdateUser } from '../../services/usuario-service';
import EditarUsuario from './components/editar_usuario/editar_usuario';
import ConfirmarDialog from '../../components/confirmar_dialog/confirmar_dialog';
import { useForm } from 'react-hook-form';
import useSessionStorage from '../../hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';


const userInitialState = {
    data: [
        {

            id: null,
            name: null,
            lastName: null,
            email: null,
            empresa: {
                id: null,
                nombre: null
            }
        }
    ]
}

export default function UsuariosPage() {
    const [ users, setUsers ] = React.useState(userInitialState.data)
    const [ openEditarUsuario, setOpenEditarUsuario ] = React.useState(false)
    const [ openConfirmarEliminar, setConfirmarEliminar ] = React.useState(false)
    const [ usuarioEditar, setUsuarioEditar ] = React.useState(null)
    const [ usuarioEliminar, setusuarioEliminar ] = React.useState(null)
    const { loading, callEndpoint } = useFetchWithLoader();
    const { getValue: getSessionToken } = useSessionStorage('managamentUserToken')
    const userSession = getSessionToken()
    const navigate = useNavigate();




    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    React.useEffect(() => {
        const getUsers = async () => {
            const response = await callEndpoint(
                getUsersByFilter('', null)
            )
            setUsers(response?.data)
        }
        getUsers()
    }, [])

    const handleEditarUsuarioOpen = (usuarioData) => {

        setUsuarioEditar(usuarioData)
        setOpenEditarUsuario(true)
    }


    const handleEditarUsuarioClose = async (user) => {
        await callEndpoint(UpdateUser(user))


        const response = await callEndpoint(
            getUsersByFilter('', null)

        )

        setUsers(response.data)
        setUsuarioEditar(null)
        setOpenEditarUsuario(false)
    }

    const handleConfirmarEliminarOpen = (idUsuario) => {
        setusuarioEliminar(idUsuario)
        setConfirmarEliminar(true)
    }


    const handleConfirmarEliminarClose = async (result) => {
        if (result === 'no') {
            setusuarioEliminar(null)
            setConfirmarEliminar(false)
            return;
        }

        await callEndpoint(
            DeleteUser(usuarioEliminar)
        )

        const response = await callEndpoint(
            getUsersByFilter('', null)

        )

        setUsers(response.data)

        setusuarioEliminar(null)
        setConfirmarEliminar(false)
    }

    const filterUsers = async (data) => {
        console.log(data)
        const usersRespones = await callEndpoint(
            getUsersByFilter(data.textoFiltro, null)
        )

        if (usersRespones.status === 200) {
            setUsers(usersRespones.data)

        }
    }


    return (
        userSession.userRole != 1 ?
            <h2>Solo usuarios administradores pueden acceder</h2>
            :
            <div className='usuarioPageContainer'>
                <h2>Control Usuarios</h2>
                <Divider />
                <form className='inputsContainer' onSubmit={handleSubmit(filterUsers)}>
                    <TextField id="outlined-basic" label="Filtro" variant="outlined"   {...register("textoFiltro", { required: false })} />
                    <Button variant="contained" className='buscar-btn' type='submit'>Buscar</Button>

                </form>
                <Divider />
                <TableContainer className='tableContainer' component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="custom pagination table">
                        <TableHead >
                            <TableRow className='tableHead' >
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell >Correo</TableCell>
                                <TableCell >Empresa</TableCell>
                                <TableCell >Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {users ? users.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell style={{ width: 200 }} component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{ width: 300 }}>
                                        {row.lastName}
                                    </TableCell>
                                    <TableCell style={{ width: 200 }}>
                                        {row.email}
                                    </TableCell>
                                    <TableCell style={{ width: 200 }}>
                                        {row.empresa.nombre}
                                    </TableCell>
                                    <TableCell style={{ width: 200 }}>
                                        <div className='buttonGroup' variant="contained" aria-label="outlined primary button group">
                                            <Button variant="contained" onClick={() => handleEditarUsuarioOpen(row)}>Editar</Button>
                                            <Button variant="contained" onClick={() => handleConfirmarEliminarOpen(row.id)}>Elimintar</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                        <TableFooter>
                            <TableRow>

                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Dialog open={openEditarUsuario} onClose={handleEditarUsuarioClose}>
                    {<EditarUsuario userData={usuarioEditar} handleClose={handleEditarUsuarioClose} />}
                </Dialog>
                <Dialog open={openConfirmarEliminar}>
                    {<ConfirmarDialog handleClose={handleConfirmarEliminarClose} />}
                </Dialog>
            </div>

    );
}