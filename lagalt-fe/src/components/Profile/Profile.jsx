import { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { blueGrey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../../App";
import { useContext } from 'react'
import { useSnackbar } from '../../SnackbarContext.jsx';
import PageTitle from "../PageTitle/PageTitle.jsx";
import fetchData from "../../functions/fetchData.js";


function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [skill, setSkill] = useState('');
    const { openSnackbar } = useSnackbar();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    //Lägg till att kunna lägga till/byta password

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    }

    async function updateUser() {
        const response = await fetchData(
            `users`,
            "PUT",
            user,
            "Could not update user."
        );
        if (response.status === "error") {
            console.error(response.message);
            openSnackbar("Could not update user profile", "error");
        } else {
            openSnackbar("User updated", "success");
            setUser(response.data.data); //.data?
        }
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

    return (
        <>
            <PageTitle title={"Account Settings"} />

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
                            sx={{ mb: 4, width: '80vw', maxWidth: '400px' }}
                            id="username"
                            label="Display name (4-20 characters)"
                            name="username"
                            autoFocus
                            autoComplete="username"
                            inputProps={{ minLength: 4, maxLength: 20 }}
                            value={user.username}
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{ width: '80vw', maxWidth: '400px' }}
                            multiline
                            rows={10}
                            id="description"
                            name="description"
                            label="About you (max 750 characters)"
                            inputProps={{ maxLength: 750 }}
                            value={user.description}
                            onChange={handleChange}>
                        </TextField>

                        <TextField
                            sx={{ width: '80vw', maxWidth: '400px' }}
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
                                        <DeleteIcon  />
                                    </IconButton>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 1 }}>
                    Update profile
                </Button>
            </Box>
        </>
    )
}

export default Profile;