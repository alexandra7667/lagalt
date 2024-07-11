import { useEffect, useState } from "react";
import { urlBackendBasePath } from "../assets/urls";
import ProjectList from "../ProjectList/ProjectList";

function Main() {

    //Get all projects
    const [projects, setProjects] = useState([]);

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
            {projects && <ProjectList projects={projects} />}
        </>

    )
}

export default Main;