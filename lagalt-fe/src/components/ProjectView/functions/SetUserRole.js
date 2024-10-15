
export default function setUserRole(associates, userId, setRole) {
  let roleSet = false;

  for (const associate of associates) {
    //If associate is this user
    if (associate.userId === userId) {
      if (associate.owner) {
        setRole("Owner");
        roleSet = true;
        break;
      } else if (associate.collaborator) {
        setRole("Member");
        roleSet = true;
        break;
      } else if (associate.applicant) {
        setRole("Applicant");
        roleSet = true;
        break;
      }
    }
  }

  if (!roleSet) {
    setRole("Unaffiliated");
  }
}
