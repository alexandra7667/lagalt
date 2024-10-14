import { urlBackendBasePath } from "../assets/urls.js";

export default async function fetchData(url, method, body, errorMessage) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const fetchResponse = await fetch(
      `${urlBackendBasePath}/${url}`,
      {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    }
    );

    if (fetchResponse.status !== 200 && fetchResponse.status !== 201) {
      throw new Error(
        `${errorMessage} Status: ${fetchResponse.status}`
      );
    }

    const response = await fetchResponse.json();
    console.log("REPONSE=", response);

    return {
      status: "success",
      data: response,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    } else {
      return {
        status: "error",
        message: "An unknown error occurred",
      };
    }
  }
}

//Cookie version:
// const fetchResponse = await fetch(`${backendUrl}/request/${requestId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: 'include' // Send JWT cookie
//   });