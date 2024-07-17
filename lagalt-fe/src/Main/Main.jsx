import { useEffect, useState } from "react";
import { urlBackendBasePath } from "../assets/urls";
import ProjectsView from "../ProjectsView/ProjectsView";
import { Box, Typography } from "@mui/material";
import NewProject from "../NewProject/NewProject";


function Main({ navPage }) {
    const [projects, setProjects] = useState([]);
    const [pageTitle, setPageTitle] = useState('Create New Project');
    const [page, setPage] = useState('newproject');

    useEffect(() => {
        fetchOrders();
        //setPage(navPage);
        //setPageTitle(navPage);
    }, [])

    async function fetchOrders() {
        //const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}`
        };

        const fetchProjectsResponse = await fetch(`${urlBackendBasePath}/projects`, {
            method: "GET",
            headers: headers
        });

        if (!fetchProjectsResponse.ok) {
            throw new Error("Failed to get projects from the database");
        }

        const projectsResponse = await fetchProjectsResponse.json();

        setProjects(projectsResponse.data);
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px', }}>
            <Typography variant="h4" sx={{ mb: '40px', textAlign: 'center' }}>{pageTitle}</Typography>

            {projects && page === 'projectsview' && <ProjectsView projects={projects} />}

            {page === 'newproject' && <NewProject />}
        </Box>
    )
}

export default Main;