import { urlBackendBasePath } from "../assets/urls";

export default async function fetchUser(data, setUser) {

    const headers = {
        "Content-Type": "application/json",
    };

    const fetchUserResponse = await fetch(`${urlBackendBasePath}/auth/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    if (!fetchUserResponse.ok) {
        throw new Error("Failed to get projects from the database");
    }

    const userResponse = await fetchUserResponse.json();

    console.log("logged in: " + userResponse.token);

    localStorage.setItem('token', userResponse.token);

    setUser(userResponse);
}