import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { UserContext } from "../App";
import { useContext } from 'react'


function BottomNav() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleNavigation = (event, value) => {
    switch (value) {
      case 0:
        navigate('/aboutus');
        break;
      case 1:
        navigate('/');
        break;
      case 2:
        //third option
        break;
      default:
        break;
    }
  };

  return (
    <Paper sx={{ position: 'relative', bottom: 0, left: 0, right: 0, height: '60px' }} elevation={3}>
      <BottomNavigation
        showLabels
        onChange={handleNavigation}
      >
        <BottomNavigationAction label="About us" icon={<BubbleChartIcon />} />
        <BottomNavigationAction label="Browse Projects" icon={<AccountTreeIcon />} />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav;
