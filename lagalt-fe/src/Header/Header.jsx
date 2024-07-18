import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";


function Header({ user, setUser }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        console.log("User set, header updated")
    }, [user]);

    const toggleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
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
                    <MenuItem onClick={() => {navigate("/"); closeMenu();}}>Browse projects</MenuItem>
                    {user && (<>
                        <MenuItem onClick={() => {navigate("/newproject"); closeMenu();}}>Create new project</MenuItem>
                        <MenuItem onClick={() => {navigate("/myprojects"); closeMenu();}}>My projects</MenuItem>
                        <MenuItem onClick={() => {navigate("/profile"); closeMenu();}}>Account</MenuItem>
                        <MenuItem onClick={logout}>Log out</MenuItem>
                    </>)}
                </Menu>
            </AppBar>
        </Box>
    )
}

export default Header;