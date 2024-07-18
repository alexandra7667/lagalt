import { urlBackendBasePath } from "../assets/urls";

export default async function fetchUser({ setUser }) {
    //const token = localStorage.getItem('token');

    const userId = 1;

    const headers = {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`
    };

    const fetchUserResponse = await fetch(`${urlBackendBasePath}/users/${userId}`, {
        method: "GET",
        headers: headers
    });

    if (!fetchUserResponse.ok) {
        throw new Error("Failed to get projects from the database");
    }

    const userResponse = await fetchUserResponse.json();

    console.log(userResponse.data);

    setUser(userResponse.data);
}