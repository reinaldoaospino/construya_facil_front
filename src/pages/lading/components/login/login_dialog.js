import React from 'react'
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";


import "./login_dialog.scss";
import useFetchWithLoader from '../../../../hooks/useFechWithLoader';
import { login } from '../../../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../components/spinner/spinner';
import useSessionStorage from '../../../../hooks/useSessionStorage';

const LoginDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, callEndpoint } = useFetchWithLoader();
  const { setValue: SetValueSessionToken } = useSessionStorage('managamentUserToken')

  const navigate = useNavigate();

  const [ loginError, setLoginError ] = React.useState(false);


  const onSubmit = async (data) => {
    const response = await callEndpoint(login(data.correo, data.contrasena))

    if (response.status === 200) {
      console.log(response)
      SetValueSessionToken(response.data)
      navigate("admin/proyectos")
      return
    }

    setLoginError(true)

  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center">Inicia sesion en tu cuenta</h3>
        <TextField
          id="correo"
          label="Correo"
          variant="outlined"
          type="email"
          {...register("correo", { required: true })}
        />
        <TextField
          id="contrasena"
          label="Contraseña"
          variant="outlined"
          type="password"
          autoComplete='off'
          {...register("contrasena", { required: true })}
        />
        <Button variant="contained" type="submit">
          Ingresar
        </Button>
        {
          loginError ?
            <h6 className='text-center'>Usuario y/o contraseña incorrecto</h6> : null
        }
      </form>
      {
        loading ? <Spinner /> : null
      }
    </div>
  );
};

export default LoginDialog;
