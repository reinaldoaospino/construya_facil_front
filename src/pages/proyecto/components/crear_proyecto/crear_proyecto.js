import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import './crear_proyecto.scss'

const proyectoInitialState = {
    data: {
        id: null,
        name: null
    }
}


const CrearProyecto = ({ handleClose }) => {
    const [ proyecto, setProyecto ] = React.useState(proyectoInitialState.data)
    const {
        register,
        handleSubmit,
        formState: { errors },        
    } = useForm();    

    const onSubmit = (data) => console.log(data);

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
                <Button onClick={handleClose} variant="contained" type="submit">
                    Crear
                </Button>
            </form>
        </div>
    )
}

export default CrearProyecto