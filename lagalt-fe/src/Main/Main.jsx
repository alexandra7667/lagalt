import { useEffect, useState } from "react";
import { urlBackendBasePath } from "../assets/urls";
import ProjectsView from "../ProjectsView/ProjectsView";
import { Typography } from "@mui/material";


function Main() {
    const [projects, setProjects] = useState([]);
    const [pageTitle, setPageTitle] = useState('Browse Projects');


    useEffect(() => {
        fetchOrders();
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
        <>
            <Typography variant="h4" sx={{ mb: '20px', textAlign: 'center' }}>{pageTitle}</Typography>

            {projects && <ProjectsView projects={projects} />}
        </>
    )
}

export default Main;