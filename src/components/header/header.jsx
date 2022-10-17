import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import LanIcon from "@mui/icons-material/Lan";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SummarizeIcon from "@mui/icons-material/Summarize";
import "./header.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box className="headerContainer">
      <BottomNavigation
        showLabels
        value={value}
        className="buttonNavigationWrap"
        onChange={(event, newValue) => {
          setValue(newValue);
          switch (newValue) {
            case 0:
              navigate("usuarios");
              break;
            case 1:
              navigate("proyectos");
              break;
            case 2:
              navigate("tareas");
              break;
            default:
              break;
          }
        }}
      >
        <BottomNavigationAction label="Usuarios" icon={<GroupIcon />} />
        <BottomNavigationAction label="Proyectos" icon={<LanIcon />} />
        <BottomNavigationAction label="Tareas" icon={<LanIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Header;
