import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from 'react'

function Header() {
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
        navigate("/");
    }

    return (
        <Box sx={{ flexGrow: 1, mb: '50px' }}>
            <AppBar position="static" elevation={0} sx={{ backgroundColor: 'lightblue' }} >
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
                    <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                        Lagalt
                    </Typography>
                    <Button color="inherit" onClick={user ? () => navigate("/profile") : () => navigate("/login")}>
                        {user ? (
                            <Avatar sx={{ bgcolor: blueGrey[500], textAlign: 'center', }}>{user.username[0]}</Avatar>
                        ) : (
                            <span>Login</span>
                        )}
                    </Button>
                </Toolbar>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >
                    {[
                        <MenuItem key="browse" onClick={() => { navigate("/"); closeMenu(); }}>Browse projects</MenuItem>,
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