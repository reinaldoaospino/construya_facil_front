import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { Button, Divider, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import "./usuarios_page..scss";
import useFetchWithLoader from '../../hooks/useFechWithLoader';
import { getAll } from '../../services/usuario-service';


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

export default function UsuariosPage() {
    const [ users, setUsers ] = React.useState(userInitialState.data)    
    const { loading, callEndpoint } = useFetchWithLoader();
    React.useEffect(() => {
        const getUsers = async () => {
            const response = await callEndpoint(
                getAll()
            )
            

            setUsers(response.data)
        }
        getUsers()
    }, [])

    return (
        <div className='usuarioPageContainer'>
            <h2>Control Usuarios</h2>
            <Divider />
            <div className='inputsContainer'>
                <TextField id="outlined-basic" label="Buscar" variant="outlined" />
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
                                        <Button variant="contained">Editar</Button>
                                        <Button variant="contained">Elimintar</Button>
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
        </div>

    );
}