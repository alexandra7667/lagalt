import { useParams } from "react-router-dom";
import { ProjectContext } from "../Main/Main.jsx";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import fetchMessages from "./FetchMessages.js";
import JoinModal from "./JoinModal/JoinModal.jsx";
import PageTitle from "../PageTitle/PageTitle.jsx";
import InfoIcon from '@mui/icons-material/Info';
import ProjectUpdates from "./ProjectUpdates/ProjectUpdates.jsx";
import MessageBoard from "./MessageBoard/MessageBoard.jsx";
import MemberList from "./MemberList/MemberList.jsx";
import setUserRole from "./SetUserRole.js";
import { useSnackbar } from '../SnackbarContext.jsx';
import ApplicantList from "./ApplicantList/ApplicantList.jsx";


function ProjectView() {
    const { projectId } = useParams();
    const { projects } = useContext(ProjectContext);
    const { user } = useContext(UserContext);
    const { openSnackbar } = useSnackbar();
    const [project, setProject] = useState(null);
    const [role, setRole] = useState(null);
    const [messageBoard, setMessageBoard] = useState(null);
    const [projectUpdates, setProjectUpdates] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicants, setApplicants] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const setProjectData = async () => {
            const foundProject = await projects.find(p => p.id === Number(projectId));

            if (foundProject) {
                setProject(foundProject);

                //Set message board and updates
                fetchMessages(foundProject.id, setMessageBoard, setProjectUpdates);

                //Set user's role in project
                setUserRole(foundProject.associates, user.userId, setRole, setApplicants);
            }
        }
        setProjectData();
    }, [])


    return (
        <>
            {project && (
                <>
                    <PageTitle title={project.title} />

                    {user && role && (
                        <>
                            {role === 'Owner' && (
                                <>
                                <Typography color='blue'>
                                    Owner
                                    <LocalPoliceIcon />
                                </Typography>

                                <Typography> Applicants: </Typography>
                                <ApplicantList applicants={applicants} />
                                </>
                            )}

                            {role === 'Member' && (
                                <Typography color='green'>
                                    Member
                                    <BadgeIcon />
                                </Typography>
                            )}

                            {role === 'Applicant' && (
                                <Typography color='yellow'>
                                    <InfoIcon />
                                    Application not yet reviewed
                                </Typography>

                            )}

                            {role === 'Unaffiliated' && (
                                <>
                                    <Button onClick={openModal} variant="outlined" sx={{ mb: 1 }}>Join</Button>
                                    <JoinModal isOpen={isModalOpen} onClose={closeModal} userId={user.userId} projectId={project.id} />
                                </>
                            )}

                            {(role === 'Owner' || role === 'Member') && (
                                <>
                                    <ProjectUpdates role={role} projectUpdates={projectUpdates} projectId={project.id} userId={user.userId} openSnackbar={openSnackbar} />

                                    <MessageBoard messageBoard={messageBoard} projectId={project.id} userId={user.userId} openSnackbar={openSnackbar} />

                                    <MemberList members={project.associates} />
                                </>
                            )}
                        </>
                    )}

                    {/* Users who are not logged in can still see basic information about the project*/}
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
                </>
            )}
        </>
    )
}

export default ProjectView;