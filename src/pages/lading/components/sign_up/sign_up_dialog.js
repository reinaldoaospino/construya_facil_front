import { Button, TextField } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFetchWithLoader from '../../../../hooks/useFechWithLoader';
import { sigUp } from '../../../../services/auth-service';
import "./sign_up_dialog.scss";


const SignUpDialog = () => {
    const [ contrasenaIguales, setContrasenaIguales ] = React.useState(true);
    const [ usuarioRegistrado, setusuarioRegistrado ] = React.useState(false);

    const { loading, callEndpoint } = useFetchWithLoader();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setContrasenaIguales(true)
        if (data.contrasena_1 !== data.contrasena_2) {
            setContrasenaIguales(false)
            return;
        }        
        const response = await callEndpoint(sigUp(data.nombre, data.apellido, data.correo, data.contrasena_1,data.empresa))
        if (response.status === 200) {
            navigate("admin/proyectos")
        }
    };

    return (
        <div className="signUp_container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center">Crea tu cuenta</h3>
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    {...register("nombre", { required: true })}
                />
                <TextField
                    id="apellido"
                    label="Apellido"
                    variant="outlined"
                    type="text"
                    {...register("apellido", { required: true })}
                />
                <TextField
                    id="correo"
                    label="Correo"
                    variant="outlined"
                    type="email"
                    {...register("correo", { required: true })}
            
                />
                 <TextField
                    id="empresa"
                    label="Empresa"
                    variant="outlined"
                    type="text"
                    autoComplete='off'
                    {...register("empresa", { required: true })}
                />
                <TextField
                    id="contrasena_1"
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    autoComplete='off'
                    {...register("contrasena_1", { required: true })}
                />
                <TextField
                    id="contrasena_2"
                    label="Repetir Contraseña"
                    variant="outlined"
                    type="password"
                    autoComplete='off'
                    {...register("contrasena_2", { required: true })}
                />
                <Button variant="contained" type="submit">
                    Registrar
                </Button>
                {
                    !contrasenaIguales ?
                        <h5 className='invalid_contrasena text-center'>Contraseñas deben ser iguales</h5>
                        : null
                }
            </form>
        </div>
    )
}

export default SignUpDialog