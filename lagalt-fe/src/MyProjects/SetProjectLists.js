
export default function setProjectLists(myProjects, setVisitedProjects, setOwnedProjects, setMemberProjects, setApplications, setListsFilled) {
    const visited = [];
    const owned = [];
    const members = [];
    const apps = [];

    myProjects.forEach((project) => {
        if (project.visitor) {
            visited.push(project);
        }

        if (project.owner) {
            owned.push(project);
        }
        else if (project.collaborator) {
            members.push(project);
        }
        else if (project.applicant) {
            apps.push(project);
        }
    });

    console.log("visited: " + visited)

    setVisitedProjects(visited);
    setOwnedProjects(owned);
    setMemberProjects(members);
    setApplications(apps);

    setListsFilled(true);
}