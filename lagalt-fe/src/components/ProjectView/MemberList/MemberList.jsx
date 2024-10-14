import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MemberList({ members }) {
    const [openMembers, setOpenMembers] = useState(false);
    const navigate = useNavigate();

    const toggleOpen = (setter) => {
        setter(open => !open);
    };

    return (
        <List>
            <ListItemButton onClick={() => toggleOpen(setOpenMembers)}>
                <ListItemText primary="Members" />
                {openMembers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMembers} timeout="auto" unmountOnExit>
                <List>
                    {members.map(member => (
                        <ListItemButton onClick={() => navigate(`/userview/${member.id}`)} key={member.id} sx={{ pl: 4 }}>
                            <ListItemText primary={member.username} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </List>
    )
}

export default MemberList