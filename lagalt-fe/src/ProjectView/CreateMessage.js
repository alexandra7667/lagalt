import { urlBackendBasePath } from "../assets/urls";

export default async function createMessage(message, openSnackbar, setMessages) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const postResponse = await fetch(`${urlBackendBasePath}/messages`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(message)
  });

  if (!postResponse.status === 201) {
    console.log("Failed to post message");
    openSnackbar("Could not post message", "error");
  }

  console.log("Created message: ", postResponse);

  openSnackbar("Message posted", "success");

  //Add to state variable MessageBoard/ProjectUpdates
  setMessages(prevItems => [...prevItems, message]);
}
