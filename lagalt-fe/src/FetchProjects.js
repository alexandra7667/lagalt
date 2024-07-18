import { urlBackendBasePath } from "./assets/urls";
import PropTypes from 'prop-types';

export default async function fetchProjects(setProjects) {

    const headers = {
        "Content-Type": "application/json",
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

fetchProjects.propTypes = {
    setProjects: PropTypes.func
};