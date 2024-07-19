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

  const fetchUserResponse = await fetch(`${urlBackendBasePath}/users`, {
    method: "GET",
    headers: headers,
  });

  if (!fetchUserResponse.ok) {
    throw new Error("Failed to get user from the database");
  }

  const userResponse = await fetchUserResponse.json();

  console.log("REFRESH USER: ", userResponse.data);

  setUser(userResponse.data);
}
