import { urlBackendBasePath } from "../assets/urls";

export default async function updateUser({ user, setOpen }) {
    const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const putResponse = await fetch(`${urlBackendBasePath}/users`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(user),
        });

        if (putResponse.status !== 201) {
            throw new Error("Failed to update user");
        }

        const response = await putResponse.json();

        console.log("Updated user: " + response.data)

        //Open snackbar
        setOpen(true);
}