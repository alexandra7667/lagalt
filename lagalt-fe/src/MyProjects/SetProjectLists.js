
export default function setAssociationLists(allUsersAssociations, setOwnedAssociations, setMemberAssociations, setApplications, setDeniedApplications, setListsFilled) {
    const owned = [];
    const members = [];
    const apps = [];
    const denied = [];

    console.log("users assos " + allUsersAssociations)

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
        else if (association.applicationDenied) {
            denied.push(association);
        }
    });

    setOwnedAssociations(owned);
    setMemberAssociations(members);
    setApplications(apps);
    setDeniedApplications(denied);

    setListsFilled(true);
}