import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import fetchUser from './FetchUser.js'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login({ setUser }) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchUser(loginData, setUser);

        navigate("/");
    };

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    required
                    id="username"
                    label="username"
                    name="username"
                    autoFocus
                    autoComplete="username"
                    onChange={handleChange}
                />
                <TextField
                    required
                    name="password"
                    label="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Log In
                </Button>
            </Box>
        </Box>
    );
}

Login.propTypes = {
    setUser: PropTypes.func
};

export default Login;