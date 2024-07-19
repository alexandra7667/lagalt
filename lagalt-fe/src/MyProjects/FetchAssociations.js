import { urlBackendBasePath } from "../assets/urls";

export default async function fetchAssociations(userId) {
    //const token = localStorage.getItem('token');

    const headers = {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`
    };

    const fetchResponse = await fetch(`${urlBackendBasePath}/associates/${userId}`, {
        method: "GET",
        headers: headers
    });

    if (!fetchResponse.ok) {
        throw new Error("Failed to get associations from the database");
    }

    const response = await fetchResponse.json();

    return response.data;
}
