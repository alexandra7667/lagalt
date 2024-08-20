import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import fetchMessages from "./Requests/FetchMessages.js";
import JoinModal from "./JoinModal/JoinModal.jsx";
import PageTitle from "../PageTitle/PageTitle.jsx";
import InfoIcon from '@mui/icons-material/Info';
import ProjectUpdates from "./ProjectUpdates/ProjectUpdates.jsx";
import MessageBoard from "./MessageBoard/MessageBoard.jsx";
import MemberList from "./MemberList/MemberList.jsx";
import setUserRole from "./SetUserRole.js";
import { useSnackbar } from '../SnackbarContext.jsx';
import ApplicantList from "./ApplicantList/ApplicantList.jsx";
import setMembersAndApplicants from "./SetMembersAndApplicants.js";
import fetchOneProject from "./Requests/FetchOneProject.js";
import setProjectStatus from "./Requests/SetProjectStatus.js";


function ProjectView() {
    const { projectId } = useParams();
    const { user } = useContext(UserContext);
    const { openSnackbar } = useSnackbar();
    const [project, setProject] = useState(null);
    const [role, setRole] = useState(null);
    const [messageBoard, setMessageBoard] = useState(null);
    const [projectUpdates, setProjectUpdates] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [listsFilled, setListsFilled] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('In Progress')

    useEffect(() => {
        const setProjectData = async () => {
            await fetchOneProject(projectId, setProject);
        }
        setProjectData();

    }, [projectId])

    useEffect(() => {
        if (project) {
            if (user) {
                //Set message board and updates
                fetchMessages(project.id, setMessageBoard, setProjectUpdates);
                //Set user's role in project
                setUserRole(project.associates, user.id, setRole);

                //Set members and applicants
                setMembersAndApplicants(project.associates, setMembers, setApplicants, setListsFilled);
            }

            //Set project status
            setSelectedStatus(project.status);
        }
    }, [project, user])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const changeStatus = (e) => {
        setSelectedStatus(e.target.value);
        //Change project status in db
        setProjectStatus(projectId, e.target.value);
    }


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
                                        <LocalPoliceIcon />
                                        Owner
                                    </Typography>

                                    <FormControl sx={{ width: { xs: '300px', sm: '400px' }, marginBottom: '20px' }} >
                                        <InputLabel id="label-project-status">Project status</InputLabel>
                                        <Select
                                            labelId="label-project-status"
                                            id="select-project-status"
                                            value={selectedStatus}
                                            label="ProjectStatus"
                                            onChange={changeStatus}
                                        >
                                            <MenuItem value={"In Progess"}>In Progess</MenuItem>
                                            <MenuItem value={"Paused"}>Paused</MenuItem>
                                            <MenuItem value={"Completed"}>Completed</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Typography> Applicants: </Typography>
                                    {listsFilled && (
                                        <ApplicantList applicants={applicants} setApplicants={setApplicants} projectId={project.id} userId={user.id} />
                                    )}
                                </>
                            )}

                            {role === 'Member' && (
                                <Typography color='green'>
                                    <BadgeIcon />
                                    Member
                                </Typography>
                            )}

                            {role === 'Applicant' && (
                                <Typography color='grey'>
                                    <InfoIcon />
                                    Application not yet reviewed
                                </Typography>

                            )}

                            {(role === 'Unaffiliated' && selectedStatus === 'In Progess') && (
                                <>
                                    <Button onClick={openModal} variant="outlined" sx={{ mb: 1 }}>Join</Button>
                                    <JoinModal isOpen={isModalOpen} onClose={closeModal} userId={user.id} projectId={project.id} setRole={setRole} />
                                </>
                            )}

                            {(role === 'Owner' || role === 'Member') && (
                                <>
                                    <ProjectUpdates role={role} projectUpdates={projectUpdates} setProjectUpdates={setProjectUpdates} projectId={project.id} userId={user.id} openSnackbar={openSnackbar} />

                                    <MessageBoard messageBoard={messageBoard} setMessageBoard={setMessageBoard} projectId={project.id} userId={user.id} openSnackbar={openSnackbar} />

                                    {members && (
                                        <MemberList members={members} />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Users who are not logged in can still see basic information about the project*/}
                    <Typography variant="h6">
                        Project status: {selectedStatus}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {project.category}
                    </Typography>
                    <Typography variant="body1">
                        {project.description}
                    </Typography>
                    <Typography variant="body1">
                        Needed skills: {project.neededSkills.join(', ')}
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