import { Box, Button, TextField, Typography } from "@mui/material"
import createMessage from "../CreateMessage";
import { useState } from "react";

function ProjectUpdates({ role, projectUpdates, projectId, userId, openSnackbar }) {
    const [newUpdate, setNewUpdate] = useState({
        projectId: projectId,
        userId: userId,
        message: '',
        type: 'update',
    });

    const handleChange = (e) => {
        setNewUpdate({
            ...newUpdate,
            message: e.target.value
        })
    }

    const sendUpdate = () => {
        //post request
        console.log("Sending update: ", newUpdate);
        createMessage(newUpdate, openSnackbar);
        //Add newUpdate to state variable projectUpdates

        setNewUpdate({
            ...newUpdate,
            message: ''
        })
    }

    return (
        <Box sx={{
            border: '1px solid',
            borderColor: 'grey.500',
            borderRadius: 2,
            padding: 2,
            margin: 2
        }}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Project Updates
            </Typography>
            {projectUpdates && projectUpdates.map((message, index) => (
                <Typography key={index}>
                    Date : {message.message}
                </Typography>
            ))}

            {role === 'Owner' && (
                <>
                    <TextField
                        required
                        sx={{ mb: 4, width: '80vw', maxWidth: '400px' }}
                        id="update"
                        name="update"
                        autoFocus
                        inputProps={{ minLength: 4, maxLength: 100 }}
                        value={newUpdate.message}
                        onChange={handleChange}
                    />

                    <Button onClick={sendUpdate}>OK</Button>
                </>
            )}
        </Box>
    )
}

export default ProjectUpdates