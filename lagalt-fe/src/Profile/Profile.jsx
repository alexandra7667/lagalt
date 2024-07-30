import { useState } from "react";
import { urlBackendBasePath } from "../assets/urls";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { blueGrey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../App";
import { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [skill, setSkill] = useState('');
    const [open, setOpen] = useState(false);


    const handleChange = (e) => {
        setUser({
            ...user,
            description: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    }

    const addSkill = (e) => {
        setSkill(e.target.value);
    }

    const addToSkills = () => {
        setUser((prevUser) => ({
            ...prevUser,
            skills: [...prevUser.skills, skill]
        }))

        setSkill('');
    }

    const removeSkill = (skillToRemove) => {
        setUser(prevUser => ({
            ...prevUser,
            skills: prevUser.skills.filter(skill => skill !== skillToRemove)
        }));
    }

    const updateProfile = async () => {
        const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const putResponse = await fetch(`${urlBackendBasePath}/users`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(user),
        });

        if (putResponse.status !== 201) {
            throw new Error("Failed to update user");
        }

        const response = await putResponse.json();

        console.log("Updated user: " + response.data)

        //Open snackbar
        setOpen(true);
    }

    //Close snackbar
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Typography variant="h4" sx={{ mb: '40px', textAlign: 'center' }}>Account Settings</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {user && (
                    <>
                        <Avatar sx={{ bgcolor: blueGrey[500], textAlign: 'center' }}>{user.username[0]}</Avatar>

                        <Typography variant="h5">
                            {user.username}
                        </Typography>

                        <Typography>
                            {user.email}
                        </Typography>

                        <br />

                        <TextField
                            required
                            multiline
                            rows={10}
                            id="description"
                            name="description"
                            label="Description"
                            value={user.description}
                            onChange={handleChange}>
                        </TextField>

                        <TextField
                            variant="standard"
                            id="skill"
                            value={skill}
                            label="Enter a new skill"
                            onChange={addSkill}>
                        </TextField>

                        <Button variant="outlined" onClick={addToSkills} startIcon={<AddIcon />} size="small" sx={{ mt: 1 }}>
                            Add skill
                        </Button>

                        <ul>
                            {user.skills.map((skill, index) => (
                                <li key={index}>{skill}
                                    <IconButton onClick={() => removeSkill(skill)}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}>
                    Update profile
                </Button>
            </Box>
            
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                >
                    Profile updated
                </Alert>
            </Snackbar>
        </>
    )
}

export default Profile;