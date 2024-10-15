import { Button } from "@mui/material";
import JoinModal from "../JoinModal/JoinModal";
import { useState } from "react";


export default function UnaffiliatedView({ userId, projectId, setRole }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={openModal} variant="outlined" sx={{ mb: 1 }}>Join</Button>
            <JoinModal isOpen={isModalOpen} onClose={closeModal} userId={userId} projectId={projectId} setRole={setRole} />
        </>
    )
}