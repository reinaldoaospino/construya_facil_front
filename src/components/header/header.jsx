import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from '@mui/icons-material/Group';
import LanIcon from '@mui/icons-material/Lan';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SummarizeIcon from '@mui/icons-material/Summarize';
import "./header.scss";

function Header() {
  const [value, setValue] = React.useState(0);

  return (
    <Box className="headerContainer">
      <BottomNavigation
        showLabels
        value={value}
        className="buttonNavigationWrap"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Usuarios" icon={<GroupIcon />} />
        <BottomNavigationAction label="Proyectos" icon={<LanIcon />} />
        <BottomNavigationAction label="Presupuesto" icon={<AttachMoneyIcon />} />
        <BottomNavigationAction label="Reportes" icon={<SummarizeIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Header;
