import { urlBackendBasePath } from "../assets/urls";

export default async function fetchProjects(setProjects) {

    const headers = {
        "Content-Type": "application/json",
    };

    const fetchResponse = await fetch(`${urlBackendBasePath}/projects`, {
        method: "GET",
        headers: headers
    });

    if (!fetchResponse.ok) {
        throw new Error("Failed to get projects from the database");
    }

    const response = await fetchResponse.json();

    setProjects(response.data);

    console.log("Fetched projects")
}
