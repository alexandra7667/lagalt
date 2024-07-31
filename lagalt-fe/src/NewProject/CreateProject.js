import { urlBackendBasePath } from "../assets/urls";

export default async function createProject({ newProject, openSnackbar }) {
    console.log("new project: " + newProject);

        const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const postProjectsResponse = await fetch(`${urlBackendBasePath}/projects`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newProject),
        });

        if (postProjectsResponse.status !== 201) {
            console.log("Failed to post project to the database");
            openSnackbar("Could not create project", 'error');
        }

        openSnackbar("Project created", 'success');

        console.log("created project: " + postProjectsResponse);
}