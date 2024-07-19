import { urlBackendBasePath } from "../assets/urls";

export default async function fetchAssociations(userId) {
    //const token = localStorage.getItem('token');

    //const userId = 1;

    const headers = {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`
    };

    const fetchAssociationsResponse = await fetch(`${urlBackendBasePath}/associates/${userId}`, {
        method: "GET",
        headers: headers
    });

    if (!fetchAssociationsResponse.ok) {
        throw new Error("Failed to get associations from the database");
    }

    const associationsResponse = await fetchAssociationsResponse.json();

    return associationsResponse.data;
}
