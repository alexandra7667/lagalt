import { urlBackendBasePath } from "../assets/urls";

export default async function handleApplication(application) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const postResponse = await fetch(`${urlBackendBasePath}/associations/handleApplication`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(application)
  });

  if (!postResponse.ok) {
    console.log("Failed to handle application");
  }

  console.log("Handled application: ", postResponse);
}
