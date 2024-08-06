import { urlBackendBasePath } from "../../assets/urls";

export default async function setProjectStatus(projectId, status) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const putResponse = await fetch(`${urlBackendBasePath}/projects/${projectId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({ status })
  });

  if (!putResponse.status === 201) console.log("Failed to update status");
  else console.log("Changed status: ", putResponse);
}
