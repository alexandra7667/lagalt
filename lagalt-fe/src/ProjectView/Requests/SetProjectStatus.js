import { urlBackendBasePath } from "../../assets/urls";

export default async function setProjectStatus(projectId, status) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const putResponse = await fetch(`${urlBackendBasePath}/projects`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({ status, projectId })
  });

  if (!putResponse.status === 200) console.log("Failed to update status");
  else console.log("Successful update. New status: ", putResponse);
}
