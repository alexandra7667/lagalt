import { urlBackendBasePath } from "../assets/urls";

export default async function updateUser(user, openSnackbar) {
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

  if (putResponse.status !== 200) {
    console.log("Failed to update user");
    console.log("Response: ", putResponse);
    openSnackbar("Could not update profile", "error");
    console.log("User: ", user)
  } else {
    console.log("Updated user: ", putResponse);
    openSnackbar("User updated", "success");
  }
}
