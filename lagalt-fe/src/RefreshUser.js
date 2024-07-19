import { urlBackendBasePath } from "./assets/urls";

export default function (setUser) {
  const token = localStorage.getItem("token");
  if (token) {
    getUserByToken(token, setUser);
  }
}

async function getUserByToken(token, setUser) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchresponse = await fetch(`${urlBackendBasePath}/users`, {
    method: "GET",
    headers: headers,
  });

  if (!fetchresponse.ok) {
    throw new Error("Failed to get user from the database");
  }

  const response = await fetchresponse.json();

  setUser(response.data);
}
