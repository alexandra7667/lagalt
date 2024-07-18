
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import BadgeIcon from '@mui/icons-material/Badge';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { useEffect, useState } from 'react';
import { urlBackendBasePath } from '../assets/urls';
import { Typography } from '@mui/material';


function MyProjects() {
    const [openOwner, setOpenOwner] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [openApplications, setOpenApplications] = useState(false);
    const [ownedProjects, setOwnedProjects] = useState([]);
    const [memberProjects, setMemberProjects] = useState([]);
    const [applications, setApplications] = useState([]);
    const [visitedProjects, setVisitedProjects] = useState([]);
    const [listsFilled, setListsFilled] = useState(false);

    useEffect(() => {
        fetchMyProjects();
    }, [])

    async function fetchMyProjects() {
        //const token = localStorage.getItem('token');

        const userId = 1;

        const headers = {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}`
        };

        const fetchProjectsResponse = await fetch(`${urlBackendBasePath}/associates/${userId}`, {
            method: "GET",
            headers: headers
        });

        if (!fetchProjectsResponse.ok) {
            throw new Error("Failed to get projects from the database");
        }

        const projectsResponse = await fetchProjectsResponse.json();

        setProjectLists(projectsResponse.data);
    }

    const setProjectLists = (projects) => {
        const visited = [];
        const owned = [];
        const members = [];
        const apps = [];

        projects.forEach((project) => {
            if (project.visitor) {
                visited.push(project); //Ha vid hämtning av alla projekt. Jmf projekt id med de projekt id som renderas till Browse Projects och sätt title till annan färg
            }

            if (project.owner) {
                owned.push(project);
            }
            else if (project.collaborator) {
                members.push(project);
            }
            else if (project.applicant) {
                apps.push(project);
            }
        });

        setVisitedProjects(visited);
        setOwnedProjects(owned);
        setMemberProjects(members);
        setApplications(apps);

        setListsFilled(true);
    }

    const toggleOpen = (setter) => {
        setter(open => !open);
    };

    const goToProject = (projectId) => {
        console.log(`Go to project ${projectId}`);
    }

    return (
        <>
            <Typography variant="h4" sx={{ mb: '40px', textAlign: 'center' }}>My Projects</Typography>

            <List>
                <ListItemButton onClick={() => toggleOpen(setOpenOwner)}>
                    <ListItemIcon>
                        <LocalPoliceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Owner" />
                    {openOwner ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openOwner} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {listsFilled && ownedProjects.map(project => (
                            <ListItemButton onClick={() => goToProject(project.id)} key={project.id} sx={{ pl: 4 }}>
                                <ListItemText primary={project.projectTitle} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>

                <ListItemButton onClick={() => toggleOpen(setOpenMember)}>
                    <ListItemIcon>
                        <BadgeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Member" />
                    {openMember ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openMember} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {listsFilled && memberProjects.map(project => (
                            <ListItemButton onClick={() => goToProject(project.id)} key={project.id} sx={{ pl: 4 }}>
                                <ListItemText primary={project.projectTitle} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>

                <ListItemButton onClick={() => toggleOpen(setOpenApplications)}>
                    <ListItemIcon>
                        <ForwardToInboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Applications" />
                    {openApplications ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openApplications} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {listsFilled && applications.map(project => (
                            <ListItemButton onClick={() => goToProject(project.id)} key={project.id} sx={{ pl: 4 }}>
                                <ListItemText primary={project.projectTitle} />
                                <ListItemText secondary={project.motivationalLetter} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>
        </>
    );
}

export default MyProjects;