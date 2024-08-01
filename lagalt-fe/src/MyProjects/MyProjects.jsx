
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
import setProjectLists from './SetProjectLists.js';
import { UserContext } from "../App";
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import PageTitle from '../PageTitle/PageTitle.jsx';

function MyProjects() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [openOwner, setOpenOwner] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [openApplications, setOpenApplications] = useState(false);
    const [ownedAssociations, setOwnedAssociations] = useState([]);
    const [memberAssociations, setMemberAssociations] = useState([]);
    const [applications, setApplications] = useState([]);
    const [listsFilled, setListsFilled] = useState(false);

    useEffect(() => {
        if (user) {
            const setProjectsData = async () => {
                setProjectLists(user.associations, setOwnedAssociations, setMemberAssociations, setApplications, setListsFilled);
            };

            setProjectsData();
        }
    }, []);

    const toggleOpen = (setter) => {
        setter(open => !open);
    };

    return (
        <>
            <PageTitle title={"My Projects"} />

            <List>
                <ListItemButton onClick={() => toggleOpen(setOpenOwner)}>
                    <ListItemIcon>
                        <LocalPoliceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Owner" />
                    {openOwner ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openOwner} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {listsFilled && ownedAssociations.map(project => (
                            <ListItemButton onClick={() => navigate(`/projectview/${project.projectId}`)} key={project.projectId} sx={{ pl: 4 }}>
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
                    <List disablePadding>
                        {listsFilled && memberAssociations.map(project => (
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