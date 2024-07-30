import { urlBackendBasePath } from "../assets/urls";

export default async function createProject({ newProject, setOpen }) {
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
            throw new Error("Failed to post project to the database");
        }

        setOpen(true);

        console.log("created project: " + postProjectsResponse);
}