import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import "./login_dialog.scss";

const LoginDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center">Inicia sesion en tu cuenta</h3>
        <TextField
          id="outlined-basic"
          label="Correo"
          variant="outlined"
          type="email"
          {...register("correo", { required: true })}
        />
        <TextField
          id="outlined-basic"
          label="Contraseña"
          variant="outlined"
          type="password"
          {...register("contrasena", { required: true })}
        />
        <Button variant="contained" type="submit">
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default LoginDialog;
