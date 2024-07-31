import { urlBackendBasePath } from "../assets/urls";

export default async function fetchUser(data, setUser, navigate) {
  const headers = {
    "Content-Type": "application/json",
  };

  const fetchResponse = await fetch(`${urlBackendBasePath}/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!fetchResponse.ok) {
    console.log("Failed to get user from the database");
    //Add snackbar
  } 
  else {
    const response = await fetchResponse.json();

    localStorage.setItem("token", response.token);

    setUser(response);

    navigate("/");

    console.log("set user:", JSON.stringify(response));
  }
}
