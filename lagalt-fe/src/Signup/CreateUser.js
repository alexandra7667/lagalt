import { urlBackendBasePath } from "../assets/urls";

export default async function fetchUser(data) {

    const headers = {
        "Content-Type": "application/json",
    };

    const fetchResponse = await fetch(`${urlBackendBasePath}/auth/signup`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    if (!fetchResponse.ok) {
        throw new Error("Failed to create user in the database");
    }

    const response = await fetchResponse.json();

    console.log("signed up: " + response);

    //Create snackbar
}