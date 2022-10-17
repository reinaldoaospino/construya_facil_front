import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { Button, Dialog, Divider, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import "./proyecto_page.scss";
import EditarProyecto from './components/editar_proyecto/editar_proyecto';
import ConfirmarDialog from '../../components/confirmar_dialog/confirmar_dialog';
import CrearProyecto from './components/crear_proyecto/crear_proyecto';



const proyectoInitialState = {
    data: [
        {
            id: 1,
            name: "Construccion cancha de tenis",
        },
        {
            id: 2,
            name: "Construccion belgrano",
        },
        {
            id: 3,
            name: "Construccion campo de futbol",
        }
    ]
}

function ProyectoPage() {
    const [ proyectos, setProyectos ] = React.useState(proyectoInitialState.data);
    const [ openEditarProyecto, setOpenEditarProyecto ] = React.useState();
    const [ openCrearProyecto, setOpenCrearProyecto ] = React.useState();
    const [ openConfirmarEliminar, setOpenConfirmarEliminar ] = React.useState();
    const [ proyectoEditar, setProyectoEditar ] = React.useState();

    const handleEditarProyecto = (idProyecto) => {
        setProyectoEditar(idProyecto);
        setOpenEditarProyecto(true)

    }

    const handleEditarProyectoClose = () => {
        setOpenEditarProyecto(false)
    }

    const handleCrearProyecto = () => {

        setOpenCrearProyecto(true)

    }

    const handleCrearProyectoClose = () => {
        setOpenCrearProyecto(false)
    }

    const handleConfirmarEliminarOpen = (idUsuario) => {
        setOpenConfirmarEliminar(true)
    }


    const handleConfirmarEliminarClose = () => {
        setOpenConfirmarEliminar(false)
    }

    return (
        <div className='usuarioPageContainer'>

            <h2>Control Proyectos</h2>
            <Divider />
            <div className='inputsContainer'>
                <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                <Button variant="contained" className='buscar-btn'>Buscar</Button>
                <Button variant="contained" className='btn-create' onClick={handleCrearProyecto}>Crear</Button>

            </div>
            <Divider />
            <TableContainer className='tableContainer' component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead >
                        <TableRow className='tableHead' >
                            <TableCell>Nombre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            proyectos.map((proyecto) => (
                                <TableRow key={proyecto.name}>
                                    <TableCell style={{ width: 700 }} component="th" scope="row">
                                        {proyecto.name}
                                    </TableCell>
                                    <TableCell style={{ width: 20 }}>
                                        <div className='buttonGroup' variant="contained" aria-label="outlined primary button group">
                                        <Button variant="contained" onClick={() => handleEditarProyecto(proyecto.id)} className="btn-create">Ver Tareas</Button>
                                            <Button variant="contained" onClick={() => handleEditarProyecto(proyecto.id)}>Editar</Button>
                                            <Button variant="contained" onClick={() => handleConfirmarEliminarOpen(proyecto.id)}>Elimintar</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog open={openEditarProyecto}>

                {<EditarProyecto idProyecto={proyectoEditar} handleClose={handleEditarProyectoClose} />}
            </Dialog>
            <Dialog open={openConfirmarEliminar}>
                {<ConfirmarDialog handleClose={handleConfirmarEliminarClose} />}
            </Dialog>
            <Dialog open={openCrearProyecto}>
                {<CrearProyecto handleClose={handleCrearProyectoClose} />}
            </Dialog>
        </div>
    )
}

export default ProyectoPage