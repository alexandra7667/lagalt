import { urlBackendBasePath } from "../assets/urls";

export default async function createProject(
  newProject,
  openSnackbar, projects, setProjects
) {
  console.log("new project to post: ", newProject);

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const postResponse = await fetch(`${urlBackendBasePath}/projects`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newProject),
  });

  if (postResponse.status !== 201) {
    console.log("Failed to post project to the database");
    openSnackbar("Could not create project", "error");
  } 
  else {
    openSnackbar("Project created", "success");
    console.log("created project: ", postResponse);
    //Add project to state list
    setProjects(prevProjects => [...prevProjects, newProject]);
  }
}
