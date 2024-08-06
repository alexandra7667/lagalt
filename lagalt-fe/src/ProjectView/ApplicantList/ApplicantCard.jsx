import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import handleApplication from "./HandleApplication";

function ApplicantCard({ applicant, applicants, setApplicants, projectId, userId }) {
    const [applicationAdmittance, setApplicationAdmittance] = useState({
        projectId: projectId,
        userId: userId,
        applicantId: applicant.userId,
    });
    const [permitHandle, setPermitHandle] = useState(false);
    const isInitialRender = useRef(true);

    const accept = () => {
        setApplicationAdmittance(prevState => ({
            ...prevState,
            applicationAccepted: true
        }));

        setPermitHandle(true)
    }

    const deny = () => {
        setApplicationAdmittance(prevState => ({
            ...prevState,
            applicationAccepted: false
        }));

        setPermitHandle(true)
    }

    //Does not run on render, only when permitHandle is set
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else if (permitHandle) {
            handleSubmit();
            setPermitHandle(false);
        }
    }, [permitHandle]);

    const handleSubmit = () => {
        //Post to backend
        console.log("Handling application: ", applicationAdmittance);
        handleApplication(applicationAdmittance);

        //Remove applicant from state list
        const updatedApplicants = applicants.filter(a => a.userId !== applicant.userId);
        setApplicants(updatedApplicants);
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
            <Button onClick={deny}>Deny</Button>
            <Button onClick={() => console.log(applicants)}>Applicants show</Button>
        </>
    )
}

export default ApplicantCard;