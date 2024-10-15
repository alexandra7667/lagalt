import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { UserContext } from "../../App";
import { useContext } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import fetchData from '../../functions/fetchData.js';


function Login() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({});

    //Access the environment variable (with Vite)
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchUser(loginData, setUser, navigate);
    };

    async function fetchUser() {
        const response = await fetchData(
            `auth/login`,
            "POST",
            loginData,
            "Could not log in user."
        );
        if (response.status === "error") {
            console.error(response.message);
        } else {
            localStorage.setItem("token", response.data.token);
            console.log("setting user as ", response.data)
            setUser(response.data);
            navigate("/");
        }
    }

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

            <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', mt: 1
            }}>
                <TextField
                    sx={{ mb: 1 }}
                    required
                    id="email"
                    label="email"
                    name="email"
                    autoFocus
                    autoComplete="email"
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
                {/*Implemented code on server side but client id has not been generated in Google Cloud.*/}
            </GoogleOAuthProvider>

            <Typography sx={{ mt: 2 }}>
                Not yet a user?
                <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </Typography>
        </Box>
    );
}

export default Login;