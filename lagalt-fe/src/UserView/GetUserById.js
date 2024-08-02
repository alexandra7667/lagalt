import { urlBackendBasePath } from "../assets/urls";

export default async function fetchUserById(userId, setProfileUser) {
    const token = localStorage.getItem('token');

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const fetchresponse = await fetch(`${urlBackendBasePath}/users/${userId}`, {
      method: "GET",
      headers: headers,
    });

    if (!fetchresponse.ok) {
      throw new Error("Failed to get user from the database");
    }

    const response = await fetchresponse.json();

    console.log("Fetched user: ", response.data);

    setProfileUser(response.data);
  }