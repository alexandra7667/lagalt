import { urlBackendBasePath } from "../../assets/urls";

export default async function fetchMessages(projectId, setMessageBoard, setProjectUpdates) {
    const token = localStorage.getItem('token');

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const fetchResponse = await fetch(`${urlBackendBasePath}/messages/${projectId}`, {
        method: "GET",
        headers: headers
    });

    if (!fetchResponse.ok) {
        throw new Error("Failed to get messages from the database");
    }

    const response = await fetchResponse.json();

    const messages = response.data;

    const messageBoard = messages.filter(m => m.type === 'message')
    setMessageBoard(messageBoard);

    const updates = messages.filter(m => m.type === 'update')
    setProjectUpdates(updates);
}