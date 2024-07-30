
export default function setAssociationLists(allUsersAssociations, setOwnedAssociations, setMemberAssociations, setApplications, setListsFilled) {
    const owned = [];
    const members = [];
    const apps = [];

    allUsersAssociations.forEach((association) => {
        if (association.owner) {
            owned.push(association);
        }
        else if (association.collaborator) {
            members.push(association);
        }
        else if (association.applicant) {
            apps.push(association);
        }
    });

    setOwnedAssociations(owned);
    setMemberAssociations(members);
    setApplications(apps);

    setListsFilled(true);
}