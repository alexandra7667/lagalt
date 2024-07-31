import { urlBackendBasePath } from "../assets/urls";


export default async function createUser(data, openSnackbar, navigate) {
  const headers = {
    "Content-Type": "application/json",
  };

  const fetchResponse = await fetch(`${urlBackendBasePath}/auth/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (fetchResponse.status === 400) {
    //username already taken
    console.log(`Error ${fetchResponse.status}: ${await fetchResponse.text()}`);

    openSnackbar("Username already taken", 'error');
  } 
  else {
    console.log(`Success ${fetchResponse.status}: ${await fetchResponse.text()}`);

    openSnackbar("Account created", 'success');
    
    navigate("/login");
  }
}
