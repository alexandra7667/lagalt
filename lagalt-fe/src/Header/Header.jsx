import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";


function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const closeMenu = () => {
        setAnchorEl(null);
      };

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
                    <Button color="inherit">Login</Button>
                </Toolbar>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >
                    <MenuItem onClick={closeMenu}>Browse projects</MenuItem>
                    <MenuItem onClick={closeMenu}>Create new project</MenuItem>
                    <MenuItem onClick={closeMenu}>My projects</MenuItem>
                    <MenuItem onClick={closeMenu}>Account</MenuItem>
                    <MenuItem onClick={closeMenu}>Log out</MenuItem>
                </Menu>
            </AppBar>
        </Box>
    )
}

export default Header;