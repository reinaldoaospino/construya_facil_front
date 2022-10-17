import React from 'react'
import './editar_proyecto.scss'
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';



const proyectos = {
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


const proyectoInitialState = {
    data: {
        id: null,
        name: null
    }
}


const EditarProyecto = ({ idProyecto, handleClose }) => {
    const [ proyecto, setProyecto ] = React.useState(proyectoInitialState.data)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    React.useEffect(() => {
        const proyecto = proyectos.data.find(x => x.id === idProyecto)
        setProyecto(proyecto)
        let defaultValues = {
            nombre: proyecto.name,

        }
        reset({ ...defaultValues })
    }, [])

    const onSubmit = (data) => console.log(data);

    return (
        <div className='editarProyecto_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    defaultValue={proyecto.name ?? ''}
                    {...register("nombre", { required: true })}
                />
                <Button onClick={handleClose} variant="contained" type="submit">
                    Guardar
                </Button>
            </form>
        </div>
    )
}

export default EditarProyecto