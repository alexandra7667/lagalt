import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControlLabel, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useSnackbar } from '../../../SnackbarContext.jsx';
import fetchData from '../../../functions/fetchData.js';

const style = {
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    maxWidth: '800px',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const overlayStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

function JoinModal({ isOpen, onClose, userId, projectId, setRole }) {
    const { openSnackbar } = useSnackbar();
    const [application, setApplication] = useState({});
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (userId && projectId) {
            setApplication({
                userId: userId,
                projectId: projectId,
                applicationAccepted: false,
                motivationalLetter: '',
            });
        }
    }, [userId, projectId]);

    const handleChange = (event) => {
        setApplication(prevApplication => ({
            ...prevApplication,
            motivationalLetter: event.target.value
        }));
    };

    const apply = () => {
        if (checked && application.motivationalLetter != '') {
            createApplication();
        } else {
            return;
        }
    }

    async function createApplication() {
        const response = await fetchData(
            `associations/makeApplicant`,
            "POST",
            application,
            "Could not create new application."
        );
        if (response.status === "error") {
            console.error(response.message);
            openSnackbar("Could not send application", "error");
        } else {
            openSnackbar("Application sent", "success");
            //Close pop up modal
            onClose();
            //Change user's role to applicant
            setRole('Applicant');
        }
    }

    return (
        <div>
            <Modal
                open={isOpen} onClose={onClose}
                aria-labelledby="new-application"
                aria-describedby="terms-of-application"
                sx={overlayStyle}
            >
                <Box sx={style}>
                    <Typography id="new-application" variant="h6" component="h2">
                        Application
                    </Typography>

                    <Typography id="terms-of-application" sx={{ mt: 2 }}>
                        When you apply to a project, the project owner will have access to view your complete profile, including your skills.
                        <br />
                        To apply, please check the box to verify these terms and write a short motivational letter.
                    </Typography>

                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{ alignSelf: 'flex-start' }}
                                checked={application.checked}
                                onChange={() => setChecked(!checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label="I Agree to the Terms"
                    />

                    <br />

                    <TextField
                        sx={{ mb: '15px', width: '100%', maxWidth: '800px' }}
                        multiline
                        rows={10}
                        required
                        id="motivationalLetter"
                        name="motivationalLetter"
                        label="Motivational letter (4-750 characters)"
                        value={application.motivationalLetter}
                        onChange={handleChange}>
                    </TextField>

                    <Button
                        variant="contained"
                        sx={{ alignSelf: 'flex-end', }}
                        onClick={apply}>Apply
                    </Button>

                    <Button
                        sx={{ alignSelf: 'flex-end', mt: 2 }}
                        onClick={onClose}>Cancel
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default JoinModal;