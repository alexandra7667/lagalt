import { useEffect, useState } from "react";
import MemberList from "../MemberList/MemberList";
import MessageBoard from "../MessageBoard/MessageBoard";
import ProjectUpdates from "../ProjectUpdates/ProjectUpdates";
import fetchData from "../../../functions/fetchData";
import setProjectMembers from "../functions/setProjectMembers";


export default function MemberOrOwnerView({ role, project }) {
    const [messageBoard, setMessageBoard] = useState(null);
    const [projectUpdates, setProjectUpdates] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMessages();
        setProjectMembers(project.associates, setMembers);
    }, [project]);

    async function fetchMessages() {
        const response = await fetchData(
            `messages/${project.id}`,
            "GET",
            null,
            "Could not fetch messages for project."
        );
        if (response.status === "error") {
            console.error(response.message);
        } else {
            const messages = response.data.data;

            const messageBoard = messages.filter(m => m.type === 'message')
            setMessageBoard(messageBoard);

            const updates = messages.filter(m => m.type === 'update')
            setProjectUpdates(updates);
        }
    }

    return (
        <>
            {projectUpdates && (
                <ProjectUpdates role={role} projectUpdates={projectUpdates} setProjectUpdates={setProjectUpdates} projectId={project.id} />
            )}

            {messageBoard && (
                <MessageBoard messageBoard={messageBoard} setMessageBoard={setMessageBoard} projectId={project.id} />
            )}

            {members && (
                <MemberList members={members} />
            )}
        </>
    )
}