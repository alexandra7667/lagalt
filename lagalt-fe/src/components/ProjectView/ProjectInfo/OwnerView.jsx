import { Typography } from "@mui/material";
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { useEffect, useState } from "react";
import setProjectApplicants from "../functions/setProjectAssociates.js";
import ApplicantList from "../ApplicantList/ApplicantList.jsx";

export default function OwnerView({ project }) {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        setProjectApplicants(project.associates, setApplicants);
    }, []);

    return (
        <>
            <Typography color='blue'>
                <LocalPoliceIcon />
                Owner
            </Typography>

            <Typography> Applicants: </Typography>
            <ApplicantList applicants={applicants} setApplicants={setApplicants} projectId={project.id} />
        </>
    )
}