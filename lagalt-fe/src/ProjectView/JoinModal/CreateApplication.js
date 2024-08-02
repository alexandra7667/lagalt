import { urlBackendBasePath } from "../../assets/urls";

export default async function createApplication(application, openSnackbar, onClose ) {
  console.log("new application to post: ", application);

  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const postResponse = await fetch(`${urlBackendBasePath}/associations/makeApplicant`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(application),
  });

  if (postResponse.status !== 200) {
    console.log("Failed to post application to the database ", postResponse);
    openSnackbar("Could not send application", "error");
  } 
  else {
    openSnackbar("Application sent", "success");
    console.log("new association: ", postResponse);
    onClose();

    //Add to state variable list in MyProjects called 'applications'
  }
}
