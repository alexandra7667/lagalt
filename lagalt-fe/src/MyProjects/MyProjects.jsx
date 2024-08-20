
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
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import { useEffect, useState } from 'react';
import setAssociationsLists from './SetAssociationsLists.js';
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
    const [openDeniedApplications, setOpenDeniedApplications] = useState(false);
    const [openPortfolio, setOpenPortfolio] = useState(false);
    const [ownedAssociations, setOwnedAssociations] = useState([]);
    const [memberAssociations, setMemberAssociations] = useState([]);
    const [applications, setApplications] = useState([]);
    const [deniedApplications, setDeniedApplications] = useState([]);
    const [portfolioAssociations, setPortfolioAssociations] = useState([]);
    const [listsFilled, setListsFilled] = useState(false);

    useEffect(() => {
        if (user.associations) {
            const setAssociations = async () => {
                setAssociationsLists(user.associations, setOwnedAssociations, setMemberAssociations, setApplications, setDeniedApplications, setPortfolioAssociations, setListsFilled);
            };

            setAssociations();
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
                        {listsFilled && ownedAssociations.map(ownerProject => (
                            <ListItemButton onClick={() => navigate(`/projectview/${ownerProject.projectId}`)} key={ownerProject.projectId} sx={{ pl: 4 }}>
                                <ListItemText primary={ownerProject.projectTitle} sx={{ color: ownerProject.portfolioProject ? 'rosybrown' : 'black' }}/>
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
                        {listsFilled && memberAssociations.map(memberProject => (
                            <ListItemButton onClick={() => navigate(`/projectview/${memberProject.projectId}`)} key={memberProject.id} sx={{ pl: 4 }}>
                                <ListItemText primary={memberProject.projectTitle} sx={{ color: memberProject.portfolioProject ? 'rosybrown' : 'black' }} />
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
                        {listsFilled && applications.map(application => (
                            <ListItemButton onClick={() => navigate(`/projectview/${application.projectId}`)} key={application.id} sx={{ pl: 4 }}>
                                <ListItemText primary={application.projectTitle} />
                                <ListItemText secondary={application.motivationalLetter} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>

                <ListItemButton onClick={() => toggleOpen(setOpenDeniedApplications)}>
                    <ListItemIcon>
                        <SdCardAlertIcon />
                    </ListItemIcon>
                    <ListItemText primary="Denied applications" />
                    {openDeniedApplications ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openDeniedApplications} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {listsFilled && deniedApplications.map(deniedApplication => (
                            <ListItemButton onClick={() => navigate(`/projectview/${deniedApplication.projectId}`)} key={deniedApplication.id} sx={{ pl: 4 }}>
                                <ListItemText primary={deniedApplication.projectTitle} />
                                <ListItemText secondary={"Application was denied by project owner. It's possible to re-apply."} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>

                <ListItemButton onClick={() => toggleOpen(setOpenPortfolio)}>
                    <ListItemIcon>
                        <BadgeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Portfolio" />
                    {openPortfolio ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openPortfolio} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {listsFilled && portfolioAssociations.map(portfolioProject => (
                            <ListItemButton onClick={() => navigate(`/projectview/${portfolioProject.projectId}`)} key={portfolioProject.id} sx={{ pl: 4 }}>
                                <ListItemText primary={portfolioProject.projectTitle} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>
        </>
    );
}

export default MyProjects;