import { useEffect, useState } from "react";
import { urlBackendBasePath } from "../assets/urls";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { blueGrey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Profile() {
    const [user, setUser] = useState(null);
    const [skill, setSkill] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        //const token = localStorage.getItem('token');

        const userId = 1;

        const headers = {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}`
        };

        const fetchUserResponse = await fetch(`${urlBackendBasePath}/users/${userId}`, {
            method: "GET",
            headers: headers
        });

        if (!fetchUserResponse.ok) {
            throw new Error("Failed to get projects from the database");
        }

        const userResponse = await fetchUserResponse.json();

        console.log(userResponse.data);

        setUser(userResponse.data);
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            description: e.target.value
        })
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

    const updateProfile = async (e) => {
        e.preventDefault();

        //const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}`
        };

        const putUserResponse = await fetch(`${urlBackendBasePath}/users`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(user),
        });

        // if (!putUserResponse.status !== 201) {
        //     throw new Error("Failed to update user");
        // }

        const userResponse = await putUserResponse.json();
    }

    return (
        <form style={{ display: 'flex', flexDirection: 'column' }}>
            <Stack direction="column" spacing={2}>
                {user && (
                    <>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Avatar sx={{ bgcolor: blueGrey, textAlign: 'center' }}>{user.username[0]}</Avatar>

                            <Typography variant="h5">
                                {user.username}
                            </Typography>

                            <Typography>
                                {user.email}
                            </Typography>
                        </Box>

                        <TextField
                            required
                            multiline
                            rows={10}
                            id="description"
                            name="description"
                            label="Description"
                            onChange={handleChange}>
                        </TextField>

                        <TextField
                            variant="standard"
                            id="skill"
                            value={skill}
                            label="Enter a new skill"
                            onChange={addSkill}>
                        </TextField>
                        <Button variant="outlined" onClick={addToSkills} startIcon={<AddIcon />} size="small">
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
                <Button variant="contained" onClick={updateProfile}>Update Profile</Button>
            </Stack>
        </form>

    )
}

export default Profile;