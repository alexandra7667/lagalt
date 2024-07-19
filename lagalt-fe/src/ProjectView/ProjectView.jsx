import { useParams } from "react-router-dom";
import { ProjectContext } from "../Main/Main.jsx";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from 'react'
import { Box, Button, Collapse, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import fetchMessages from "./FetchMessages.js";

function ProjectView() {
    const { projectId } = useParams();
    const { projects } = useContext(ProjectContext);
    const { user } = useContext(UserContext);
    const [project, setProject] = useState(null);
    const [openMembers, setOpenMembers] = useState(false);
    const [role, setRole] = useState(null);
    const [messageBoard, setMessageBoard] = useState(null);
    const [projectUpdates, setProjectUpdates] = useState(null);

    //role
    //check project owner, add editable, add applications (also add info about new applications in header)
    //check member - can add messages to board (visible: message board and project updates)
    //check user (logged in) - can apply, add join/applied/member button with icon

    //add project updates
    //add message board


    useEffect(() => {
        const setProjectData = async () => {
            const foundProject = await projects.find(p => p.id === Number(projectId));

            if (foundProject) {
                setProject(foundProject);

                //set message board and updates
                fetchMessages(foundProject.id, setMessageBoard, setProjectUpdates);

                let roleSet = false;
                for (const associate of foundProject.associates) {
                    if (associate.userId === user.id) {
                        if (associate.owner) {
                            setRole('Owner');
                            break;
                        }
                        else if (associate.collaborator) {
                            setRole('Member');
                            break;
                        }
                        else if (associate.applicant) {
                            setRole('Applicant');
                            break;
                        }
                    }
                }
                if (!roleSet) {
                    setRole('Unaffiliated');
                }
            }
        }
        setProjectData();
    }, [])


    const toggleOpen = (setter) => {
        setter(open => !open);
    };

    const goToProfile = (userId) => {
        console.log(`Go to user ${userId}`);
    }

    return (
        <>
            <Typography variant="h4" sx={{ mb: '40px', textAlign: 'center' }}>{project ? project.title : 'Project not found'}</Typography>

            {project && (
                <>
                    {user &&
                        (role === 'Unaffiliated' ? (
                            <Button variant="outlined" startIcon={<AddIcon />}>
                                Apply for membership
                            </Button>
                        ) : (
                            role && (
                                <Typography>
                                    {role === 'Owner' && (<AddIcon />)}
                                    {role === 'Member' && (<AddIcon />)}
                                    {role === 'Applicant' && (<AddIcon />)}
                                    {role}
                                </Typography>
                            )
                        )
                        )
                    }

                    <Typography variant="h6" color="text.secondary">
                        {project.category}
                    </Typography>
                    <Typography variant="body1">
                        {project.description}
                    </Typography>
                    <Typography variant="body1">
                        Needed skills: {project.tags.join(', ')}
                    </Typography>
                    <Typography variant="body1">
                        Tags: {project.tags.join(', ')}
                    </Typography>

                    {user && (
                        <>
                            <Box sx={{
                                border: '2px solid',  // Specify border width and style
                                borderColor: 'grey.500',  // Use a theme color or custom color
                                borderRadius: 2,  // Optional: add border radius for rounded corners
                                padding: 2,  // Optional: add padding inside the box
                                margin: 2  // Optional: add margin outside the box
                            }}>
                                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                    Project Updates
                                </Typography>
                                {projectUpdates && projectUpdates.map((message, index) => (
                                    <Typography key={index}>
                                        datetime : {message.message}
                                    </Typography>
                                ))}
                                {role === 'Owner' && (
                                    <TextField>
                                        Enter new update (for owner)
                                    </TextField>
                                )}
                            </Box>

                            <Box sx={{
                                border: '2px solid',
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
                                <TextField>
                                    Enter new message
                                </TextField>
                            </Box>
                        </>
                    )}

                    <List>
                        <ListItemButton onClick={() => toggleOpen(setOpenMembers)}>
                            <ListItemText primary="Members" />
                            {openMembers ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openMembers} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                {project.associates.map(associate => (
                                    <ListItemButton onClick={() => goToProfile(associate.userId)} key={associate.id} sx={{ pl: 4 }}>
                                        <ListItemText primary={associate.username} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </>
            )}
        </>
    )
}

export default ProjectView;