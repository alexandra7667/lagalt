
export default function setProjectApplicants(allAssociates, setApplicants) {
    const applicants = [];

    allAssociates.forEach((association) => {
        if (association.applicant) {
            applicants.push(association);
        }
    });

    setApplicants(applicants);
}