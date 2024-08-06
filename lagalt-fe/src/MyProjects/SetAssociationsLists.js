
export default function setAssociationLists(allUsersAssociations, setOwnedAssociations, setMemberAssociations, setApplications, setDeniedApplications, setPortfolioAssociations, setListsFilled) {
    const owned = [];
    const members = [];
    const apps = [];
    const denied = [];
    const portfolio = [];

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
        else if(association.portfolioProject) {
            portfolio.push(association);
        }
    });

    setOwnedAssociations(owned);
    setMemberAssociations(members);
    setApplications(apps);
    setDeniedApplications(denied);
    setPortfolioAssociations(portfolio);

    setListsFilled(true);
}