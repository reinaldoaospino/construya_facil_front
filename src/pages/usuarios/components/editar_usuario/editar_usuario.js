import { Button, TextField } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import './editar_usuario.scss'

const users = {
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

const userInitialState = {
    data: {
        id: null,
        name: null,
        lastName: null,
        email: null
    }
}


const EditarUsuario = ({ idUsuario, handleClose }) => {
    const [ user, setUser ] = React.useState(userInitialState.data)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    React.useEffect(() => {
        const user = users.data.find(x => x.id === idUsuario)
        setUser(user)
        let defaultValues = {
            nombre: user.name,
            apellido: user.lastName,
            correo: user.email
        }
        reset({ ...defaultValues })
    }, [])

    const onSubmit = (data) => console.log(data);

    return (
        <div className='editarUsuario_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    value={user.name ?? ''}
                    {...register("nombre", { required: true })}
                />
                <TextField
                    id="apellido"
                    label="Apellido"
                    variant="outlined"
                    type="text"
                    value={user.lastName ?? ''}

                    {...register("apellido", { required: true })}
                />
                <TextField
                    id="correo"
                    label="Correo"
                    variant="outlined"
                    type="text"
                    value={user.email ?? ''}

                    {...register("correo", { required: true })}
                />
                <Button onClick={handleClose} variant="contained" type="submit">
                    Guardar
                </Button>
            </form>
        </div>
    )
}

export default EditarUsuario