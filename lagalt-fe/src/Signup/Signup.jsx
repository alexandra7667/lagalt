import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import createUser from './CreateUser.js'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from '../SnackbarContext.jsx';


function Signup() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({});
    const { openSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();

        createUser(signUpData, openSnackbar, navigate);
    }

    const handleChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        required
                        id="username"
                        label="username (4-20 characters)"
                        name="username"
                        autoFocus
                        autoComplete="username"
                        inputProps={{ minLength: 4, maxLength: 20 }}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="current-email"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        name="password"
                        label="password (min. 8 characters)"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputProps={{ minLength: 8 }}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Sign up
                    </Button>
                </Box>
                <Typography>
                    Already a user?
                    <Button onClick={() => navigate("/login")}>Log in</Button>
                </Typography>
            </Box>
        </>
    );
}

export default Signup;