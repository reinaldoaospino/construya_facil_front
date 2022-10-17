import React from 'react'
import { Button, Dialog, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";

import './tarea_page.scss'
import EditarTarea from './components/editar_tarea/editar_tarea';
import ConfirmarDialog from '../../components/confirmar_dialog/confirmar_dialog';


const tareaInitialState = {
    data: [
        {
            id: 1,
            name: "Comprar productos",
            proyectoNombre: "Construccion cancha de tenis",
            fechaInicio: "10/10/2022",
            fechaFin: "10/10/2023",
            estado: "Por hacer",
            empleado: "Maxi"
        },
        {
            id: 2,
            name: "Comprar decoracion",
            proyectoNombre: "Construccion cancha de tenis",
            fechaInicio: "10/10/2022",
            fechaFin: "10/10/2023",
            estado: "En progreso",
            empleado: "Maxi"

        },
        {
            id: 3,
            name: "Comprar muebles",
            proyectoNombre: "Construccion cancha de tenis",
            fechaInicio: "10/10/2022",
            fechaFin: "10/10/2023",
            estado: "Finalizado",
            empleado: "Jorge"

        },
    ]
}


function TareaPage() {
    const [ tareas, setTareas ] = React.useState(tareaInitialState.data);
    const [ openEditarTarea, setOpenEditarTarea ] = React.useState(false);
    const [ openCrearTarea, setOpenCrearTarea ] = React.useState();
    const [ openConfirmarEliminar, setOpenConfirmarEliminar ] = React.useState();
    const [ tareaEditar, setTareaEditar ] = React.useState();

    const handleEditarTarea = (idProyecto) => {
        setTareaEditar(idProyecto);
        setOpenEditarTarea(true)

    }

    const handleEditarTareaClose = () => {
        setOpenEditarTarea(false)
    }

    const handleCrearTarea = () => {

        setOpenCrearTarea(true)

    }

    const handleCrearTareaClose = () => {
        setOpenCrearTarea(false)
    }

    const handleConfirmarEliminarOpen = (idUsuario) => {
        setOpenConfirmarEliminar(true)
    }


    const handleConfirmarEliminarClose = () => {
        setOpenConfirmarEliminar(false)
    }

    return (
        <div className='usuarioPageContainer'>

            <h2>Control Tareas</h2>
            <Divider />
            <div className='inputsContainer'>
                <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                <Button variant="contained" className='buscar-btn'>Buscar</Button>
                <Button variant="contained" className='btn-create' onClick={handleCrearTarea}>Crear</Button>

            </div>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tareas.map((tarea) => (
                                <TableRow key={tarea.name}>
                                    <TableCell style={{ width: 700 }} component="th" scope="row">
                                        {tarea.name}
                                    </TableCell>
                                    <TableCell style={{ width: 700 }} component="th" scope="row">
                                        {tarea.fechaInicio}
                                    </TableCell>
                                    <TableCell style={{ width: 700 }} component="th" scope="row">
                                        {tarea.fechaFin}
                                    </TableCell>
                                    <TableCell style={{ width: 700 }} component="th" scope="row">
                                        {tarea.estado}
                                    </TableCell>
                                    <TableCell style={{ width: 700 }} component="th" scope="row">
                                        {tarea.empleado}
                                    </TableCell>
                                    <TableCell style={{ width: 20 }}>
                                        <div className='buttonGroup' variant="contained" aria-label="outlined primary button group">
                                            <Button variant="contained" onClick={() => handleEditarTarea(tarea.id)}>Editar</Button>
                                            <Button variant="contained" onClick={() => handleConfirmarEliminarOpen(tarea.id)}>Elimintar</Button>
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
            <Dialog open={openEditarTarea}>
                {<EditarTarea idTarea={tareaEditar} handleClose={handleEditarTareaClose} />}
            </Dialog>
            {/* <Dialog open={openConfirmarEliminar}>
                {<ConfirmarDialog handleClose={handleConfirmarEliminarClose} />}
            </Dialog> */}
            {/* <Dialog open={openCrearTarea}>
                {<CrearProyecto handleClose={handleCrearTareaClose} />}
            </Dialog> */}
        </div>
    )
}

export default TareaPage