import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App.jsx";
import { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ContrastIcon from '@mui/icons-material/Contrast';


function Header({ theme, setTheme, darkTheme, lightTheme }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        closeMenu();
        navigate("/login");
    }

    const changeTheme = () => {
        if(theme === darkTheme) setTheme(lightTheme) 
        else setTheme(darkTheme)
    }

    return (
        <Box sx={{ flexGrow: 1, mb: '80px' }}>
            <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'lightblue' }} >
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }} >
                        Lagalt
                    </Typography>

                    <IconButton onClick={changeTheme}>
                        <ContrastIcon />
                    </IconButton>

                    {user ? (
                        <>
                            <Avatar onClick={() => navigate("/profile")} sx={{ bgcolor: blueGrey[500], cursor: 'pointer' }}>{user.username[0]}</Avatar>
                            <Button onClick={logout}>
                                <LogoutIcon sx={{ color: 'white' }}/>
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => navigate("/login")}>
                            <LoginIcon sx={{ color: 'white' }} />
                        </Button>
                    )}

                </Toolbar>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >
                    {[
                        <MenuItem key="browse" onClick={() => { navigate("/"); closeMenu(); }}>Browse projects</MenuItem>,
                        <MenuItem key="aboutus" onClick={() => { navigate("/aboutus"); closeMenu(); }}>About us</MenuItem>,
                        user && [
                            <MenuItem key="create" onClick={() => { navigate("/newproject"); closeMenu(); }}>Create new project</MenuItem>,
                            <MenuItem key="myprojects" onClick={() => { navigate("/myprojects"); closeMenu(); }}>My projects</MenuItem>,
                            <MenuItem key="profile" onClick={() => { navigate("/profile"); closeMenu(); }}>Account</MenuItem>,
                            <MenuItem key="logout" onClick={logout}>Log out</MenuItem>
                        ]
                    ]}
                </Menu>
            </AppBar>
        </Box>
    )
}

export default Header;