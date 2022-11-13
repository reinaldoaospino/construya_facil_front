import { Button, TextField } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import useFetchWithLoader from '../../../../hooks/useFechWithLoader';
import { GetUserById } from '../../../../services/usuario-service';
import './editar_usuario.scss'



const userInitialState = {
    data: {
        id: null,
        name: null,
        lastName: null,
        email: null
    }
}


const EditarUsuario = ({ userData, handleClose }) => {
    const [ user, setUser ] = React.useState(userInitialState.data)    

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    React.useEffect(() => {   
        user.id = userData.id     
        user.name = userData.name;
        user.lastName = userData.lastName;
        user.email = userData.email;
        setUser(user)

    }, [])

    const onSubmit = (data) => {

        user.name = data.nombre;
        user.lastName = data.apellido;
        user.email = data.correo;
        setUser(user)
        handleClose(user)
    }

    return (
        <div className='editarUsuario_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    defaultValue={userData?.name}
                    {...register("nombre", { required: true })}
                />
                <TextField
                    id="apellido"
                    label="Apellido"
                    variant="outlined"
                    type="text"
                    defaultValue={userData?.lastName}
                    {...register("apellido", { required: true })}
                />
                <TextField
                    id="correo"
                    label="Correo"
                    variant="outlined"
                    type="text"
                    defaultValue={userData?.email}
                    {...register("correo", { required: true })}
                />
                <Button variant="contained" type="submit">
                    Guardar
                </Button>
            </form>
        </div>
    )
}

export default EditarUsuario