import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import fetchData from "../../../functions/fetchData";

function MessageBoard({ messageBoard, setMessageBoard, projectId, userId, openSnackbar }) {
    const [newMessage, setNewMessage] = useState({
        projectId: projectId,
        userId: userId,
        message: '',
        type: 'message',
    });

    const handleChange = (e) => {
        setNewMessage({
            ...newMessage,
            message: e.target.value
        })
    }

    const sendMessage = () => {
        console.log("Sending message: ", newMessage);
        createMessage();

        setNewMessage({
            ...newMessage,
            message: ''
        })
    }

    async function createMessage() {
        const response = await fetchData(
            `messages`,
            "POST",
            newMessage,
            "Could not create new message."
        );
        if (response.status === "error") {
            console.error(response.message);
            openSnackbar("Could not post message", "error");
        } else {
            openSnackbar("Message posted", "success");
            setMessageBoard(prevMessages => [...prevMessages, response.data.data]);
        }
    }


    return (
        <Box sx={{
            border: '1px solid',
            borderColor: 'grey.500',
            borderRadius: 2,
            padding: 2,
        }}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Message Board
            </Typography>
            {messageBoard && messageBoard.map((message, index) => (
                <Typography key={index}>
                    {message.username} : {message.message}
                </Typography>
            ))}

            <TextField
                required
                sx={{ mb: 4, width: '80vw', maxWidth: '400px' }}
                id="message"
                name="message"
                autoFocus
                inputProps={{ minLength: 4, maxLength: 100 }}
                value={newMessage.message}
                onChange={handleChange}
            />

            <Button onClick={sendMessage}>OK</Button>
        </Box>
    )
}

export default MessageBoard;