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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


function Signup() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({});
    const { openSnackbar } = useSnackbar();

    //Access the environment variable (with Vite)
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
                    Sign up
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', mt: 1
                }}>
                    <TextField
                        sx={{ mb: 1 }}
                        required
                        autoFocus
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

                <GoogleOAuthProvider clientId={googleClientId}>
                    <div>
                        <GoogleLogin
                            onSuccess={(response) => {
                                console.log("google success", response);
                            }}
                            onError={(error) => {
                                console.error("google error", error);
                            }}
                        />
                    </div>
                    {/*Functional code on client and server side but client id has not been generated in Google Cloud.*/}
                </GoogleOAuthProvider>

                <Typography>
                    Already a user?
                    <Button onClick={() => navigate("/login")}>Log in</Button>
                </Typography>
            </Box>
        </>
    );
}

export default Signup;