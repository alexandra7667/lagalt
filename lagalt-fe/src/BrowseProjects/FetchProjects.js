import { urlBackendBasePath } from "../assets/urls";

export default async function fetchProjects(setProjects, pageSize, pageNo, setPageNo, setTotalPages) {

    const headers = {
        "Content-Type": "application/json",
    };

    const fetchResponse = await fetch(`${urlBackendBasePath}/projects/getAllProjects?pageSize=${pageSize}&pageNo=${pageNo}`, {
        method: "GET",
        headers: headers,
    });

    if (!fetchResponse.ok) {
        throw new Error("Failed to get projects from the database");
    }

    const response = await fetchResponse.json();

    setProjects(response.data);
    setPageNo(pageNo);
    setTotalPages(response.totalPages);

    console.log("Fetched projects", response)
}
