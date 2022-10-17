import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { Button, Dialog, Divider, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import "./usuarios_page..scss";
import useFetchWithLoader from '../../hooks/useFechWithLoader';
import { getAll } from '../../services/usuario-service';
import EditarUsuario from './components/editar_usuario/editar_usuario';
import ConfirmarDialog from '../../components/confirmar_dialog/confirmar_dialog';


const userInitialState = {
    data: [
        {

            id: 1,
            name: 'Jose',
            lastName: 'Hernandez',
            email: 'jose.hernandez@gmail.com'
        },
        {
            id: 2,
            name: 'Max',
            lastName: 'Perez',
            email: 'max.perez@gmail.com'
        },
        {
            id: 3,
            name: 'Monica',
            lastName: 'Colmenares',
            email: 'monica.colmenares@gmail.com'
        }
    ]
}

export default function UsuariosPage() {
    const [ users, setUsers ] = React.useState(userInitialState.data)
    const [ openEditarUsuario, setOpenEditarUsuario ] = React.useState(false)
    const [ openConfirmarEliminar, setConfirmarEliminar ] = React.useState(false)
    const [ usuarioEditar, setUsuarioEditar ] = React.useState(1)
    const { loading, callEndpoint } = useFetchWithLoader();
    React.useEffect(() => {
        // const getUsers = async () => {
        //     const response = await callEndpoint(
        //         getAll()
        //     )


        //     setUsers(response.data)
        // }
        // getUsers()
    }, [])

    const handleEditarUsuarioOpen = (idUsuario) => {
        setUsuarioEditar(idUsuario)
        setOpenEditarUsuario(true)
    }


    const handleEditarUsuarioClose = () => {
        setOpenEditarUsuario(false)
    }

    const handleConfirmarEliminarOpen = (idUsuario) => {
        setConfirmarEliminar(true)
    }


    const handleConfirmarEliminarClose = () => {
        setConfirmarEliminar(false)
    }


    return (
        <div className='usuarioPageContainer'>
            <h2>Control Usuarios</h2>
            <Divider />
            <div className='inputsContainer'>
                <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                <TextField id="outlined-basic" label="Apellido" variant="outlined" />
                <TextField id="outlined-basic" label="Correo" variant="outlined" />
                <Button variant="contained" className='buscar-btn'>Buscar</Button>

            </div>
            <Divider />
            <TableContainer className='tableContainer' component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="custom pagination table">
                    <TableHead >
                        <TableRow className='tableHead' >
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell >Correo</TableCell>
                            <TableCell >Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {users.map((row) => (
                            <TableRow key={row.name}>
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
                                    <div className='buttonGroup' variant="contained" aria-label="outlined primary button group">
                                        <Button variant="contained" onClick={() => handleEditarUsuarioOpen(row.id)}>Editar</Button>
                                        <Button variant="contained" onClick={() => handleConfirmarEliminarOpen(row.id)}>Elimintar</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog open={openEditarUsuario} onClose={handleEditarUsuarioClose}>
                {<EditarUsuario idUsuario={usuarioEditar} handleClose={handleEditarUsuarioClose} />}
            </Dialog>
            <Dialog open={openConfirmarEliminar}>
                {<ConfirmarDialog handleClose={handleConfirmarEliminarClose} />}
            </Dialog>
        </div>

    );
}