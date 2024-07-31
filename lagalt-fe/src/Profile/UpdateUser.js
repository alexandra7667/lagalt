import { urlBackendBasePath } from "../assets/urls";

export default async function updateUser( user, openSnackbar ) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const putResponse = await fetch(`${urlBackendBasePath}/users`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(user),
  });

  if (putResponse.status !== 201) {
    console.log("Failed to update user");
    openSnackbar("Could not update profile", "error");
  }

  const response = await putResponse.json();

  console.log("Updated user: " + response.data);

  openSnackbar("User updated", "success");
}
