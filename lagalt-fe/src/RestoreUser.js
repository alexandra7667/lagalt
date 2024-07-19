import { urlBackendBasePath } from "./assets/urls";


export const restoreUser = async (token, setUser) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const fetchresponse = await fetch(`${urlBackendBasePath}/users`, {
    method: "GET",
    headers: headers,
  });

  if (!fetchresponse.ok) {
    throw new Error("Failed to get user from the database");
  }

  const response = await fetchresponse.json();

  console.dir(response, { depth: null });

  setUser(response.data);
}