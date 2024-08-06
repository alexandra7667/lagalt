import { urlBackendBasePath } from "../assets/urls";

export default async function makeVisitor(projectId, userId) {
  console.log("making visitor projectid: ", projectId, " and user id: ", userId);

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const postResponse = await fetch(`${urlBackendBasePath}/associations/makeVisitor`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ projectId, userId }),
  });

  if (postResponse.status !== 200) {
    console.log("Failed to post application to the database ", postResponse);
  } 
  else {
    console.log("new association: ", postResponse);
  }
}
