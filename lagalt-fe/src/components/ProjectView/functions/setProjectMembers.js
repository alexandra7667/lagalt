
export default function setProjectMembers(allAssociates, setMembers) {
    const members = [];

    allAssociates.forEach((association) => {
        if (association.collaborator) {
            members.push(association);
        }
    });

    setMembers(members);
}