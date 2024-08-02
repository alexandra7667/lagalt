export default function setUserRole(associates, userId, setRole, setApplicants) {
  let roleSet = false;
  let applicants = [];

  for (const associate of associates) {
    //Get all applicants
    if (associate.applicant) applicants.push(associate);

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

  setApplicants(applicants);
}
