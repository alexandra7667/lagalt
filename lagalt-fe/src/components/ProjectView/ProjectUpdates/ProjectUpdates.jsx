import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import fetchData from "../../../functions/fetchData";
import { useSnackbar } from '../../../SnackbarContext.jsx';
import { UserContext } from "../../../App.jsx";


function ProjectUpdates({ role, projectUpdates, setProjectUpdates, projectId }) {
    const { openSnackbar } = useSnackbar();
    const { user } = useContext(UserContext);
    const [newUpdate, setNewUpdate] = useState({
        projectId: projectId,
        userId: user.id,
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
        console.log("Sending update: ", newUpdate);
        createMessage();

        setNewUpdate({
            ...newUpdate,
            message: ''
        })
    }

    async function createMessage() {
        const response = await fetchData(
            `messages`,
            "POST",
            newUpdate,
            "Could not create new update."
        );
        if (response.status === "error") {
            console.error(response.message);
            openSnackbar("Could not post update", "error");
        } else {
            openSnackbar("Update posted", "success");
            setProjectUpdates(prevUpdates => [...prevUpdates, response.data.data]);
        }
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

                    <Button onClick={sendUpdate}>Send</Button>
                </>
            )}
        </Box>
    )
}

export default ProjectUpdates