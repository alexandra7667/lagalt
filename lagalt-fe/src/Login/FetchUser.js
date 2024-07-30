import { urlBackendBasePath } from "../assets/urls";

export default async function fetchUser(data, setUser) {

    const headers = {
        "Content-Type": "application/json",
    };

    const fetchResponse = await fetch(`${urlBackendBasePath}/auth/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    if (!fetchResponse.ok) {
        throw new Error("Failed to get user from the database");
    }

    const response = await fetchResponse.json();

    console.log("logged in: " + response.token);

    localStorage.setItem('token', response.token);

    setUser(response);
}