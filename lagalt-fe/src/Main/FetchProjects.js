import { urlBackendBasePath } from "../assets/urls";

export default async function fetchProjects(setProjects) {

    const headers = {
        "Content-Type": "application/json",
    };

    const fetchProjectsResponse = await fetch(`${urlBackendBasePath}/projects`, {
        method: "GET",
        headers: headers
    });

    if (!fetchProjectsResponse.ok) {
        throw new Error("Failed to get projects from the database");
    }

    const projectsResponse = await fetchProjectsResponse.json();

    setProjects(projectsResponse.data);
}
