
export default function setMembersAndApplicants(allAssociates, setMembers, setApplicants, setListsFilled) {
    const members = [];
    const apps = [];

    allAssociates.forEach((association) => {
        if (association.collaborator) {
            members.push(association);
        }
        else if (association.applicant) {
            apps.push(association);
        }
    });

    setMembers(members);
    setApplicants(apps);

    setListsFilled(true);
}