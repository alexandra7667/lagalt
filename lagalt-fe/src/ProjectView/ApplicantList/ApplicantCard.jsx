import { Button, Typography } from "@mui/material";
import { useState } from "react";
import handleApplication from "./HandleApplication";

function ApplicantCard({ applicant, applicants, setApplicants, projectId, userId }) {
    const [applicationAdmittance, setApplicationAdmittance] = useState({
        projectId: projectId,
        userId: userId,
        applicantId: applicant.userId,
        applicationAccepted: false
    });

    const accept = () => {
        setApplicationAdmittance(true)
        handleSubmit();
    }

    const handleSubmit = () => {
        //Post to backend
        console.log("Handling application: ", applicationAdmittance);
        handleApplication(applicationAdmittance);

        //Remove applicant from state list
        setApplicants(applicants.filter(a => a.id !== applicant.userId));
    }

    return (
        <>
            <Typography variant="h6">
                {applicant.username}
            </Typography>
            <Typography variant="body2">
                Skills: {applicant.skills}
            </Typography>
            <Typography variant="body2">
                Motivational letter: {applicant.motivationalLetter}
            </Typography>

            <Button onClick={accept}>Accept</Button>
            <Button onClick={handleSubmit}>Deny</Button>
        </>
    )
}

export default ApplicantCard;