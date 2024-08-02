import { List } from "@mui/material";
import ApplicantCard from "./ApplicantCard";

function ApplicantList({ applicants, setApplicants, projectId, userId }) {

    return (
        <>
            <List>
                {applicants && applicants.map(applicant => (
                    <ApplicantCard key={applicant.id} applicant={applicant} applicants={applicants} setApplicants={setApplicants} projectId={projectId} userId={userId} />
        ))}
            </List>
        </>
    )
}

export default ApplicantList;
