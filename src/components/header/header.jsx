import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import LanIcon from "@mui/icons-material/Lan";
import CloseIcon from "@mui/icons-material/Close";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../../hooks/useSessionStorage";

function Header() {
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();
  const { getValue: getSessionToken, removeValue: removeValue } =
    useSessionStorage("managamentUserToken");
  const userSession = getSessionToken();

  return (
    <Box className="headerContainer">
      <BottomNavigation
        showLabels
        value={value}
        className="buttonNavigationWrap"
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(newValue);
          switch (newValue) {
            case 1:
              navigate("usuarios");
              break;
            case 2:
              navigate("proyectos");
              break;
            case 3:
              navigate("tareas");
              break;
            case 4:
              navigate("reporte");
              break;
            case 5:
              removeValue();
              navigate("/");
              break;
            default:
              break;
          }
        }}
      >
        {userSession && (
          <h5>
            {userSession.userName} {userSession.userApellido}
            {userSession.userRole === 1 ? " (Admin)" : null}
          </h5>
        )}
        <BottomNavigationAction label="Usuarios" icon={<GroupIcon />} />
        <BottomNavigationAction label="Proyectos" icon={<LanIcon />} />
        <BottomNavigationAction label="Tareas" icon={<LanIcon />} />
        <BottomNavigationAction label="Reporte" icon={<LanIcon />} />
        <BottomNavigationAction label="Cerrar sesión" icon={<CloseIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Header;
