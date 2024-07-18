
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
import { Typography } from '@mui/material';
import fetchMyProjects from './FetchMyProjects.js'
import setProjectLists from './SetProjectLists.js';
import { ProjectContext } from "../Main/Main.jsx";
import { useContext } from 'react'

function MyProjects() {
    const { visitedProjects, setVisitedProjects } = useContext(ProjectContext);
    const [openOwner, setOpenOwner] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [openApplications, setOpenApplications] = useState(false);
    const [ownedProjects, setOwnedProjects] = useState([]);
    const [memberProjects, setMemberProjects] = useState([]);
    const [applications, setApplications] = useState([]);
    const [listsFilled, setListsFilled] = useState(false);

    useEffect(() => {
        const setProjectsData = async () => {
            const fetchedProjects = await fetchMyProjects();
            setProjectLists(fetchedProjects, setVisitedProjects, setOwnedProjects, setMemberProjects, setApplications, setListsFilled);
            console.log("fetched: " + fetchedProjects + " visited new: " + visitedProjects)
        };
    
        setProjectsData();
    }, []);
    
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