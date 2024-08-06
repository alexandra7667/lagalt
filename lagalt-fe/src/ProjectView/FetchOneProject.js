import { urlBackendBasePath } from "../assets/urls";

export default async function fetchOneProject(projectId, setProject) {

    const headers = {
        "Content-Type": "application/json",
    };

    const fetchResponse = await fetch(`${urlBackendBasePath}/projects/getOneProject/${projectId}`, {
        method: "GET",
        headers: headers,
    });

    if (!fetchResponse.ok) {
        throw new Error("Failed to get project from the database");
    }

    const response = await fetchResponse.json();

    setProject(response.data);

    console.log("Fetched project", response)
}
