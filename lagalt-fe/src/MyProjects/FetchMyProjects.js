import { urlBackendBasePath } from "../assets/urls";
import PropTypes from 'prop-types';

export default async function fetchMyProjects() {
    //const token = localStorage.getItem('token');

    const userId = 1;

    const headers = {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`
    };

    const fetchProjectsResponse = await fetch(`${urlBackendBasePath}/associates/${userId}`, {
        method: "GET",
        headers: headers
    });

    if (!fetchProjectsResponse.ok) {
        throw new Error("Failed to get projects from the database");
    }

    const projectsResponse = await fetchProjectsResponse.json();

    return projectsResponse.data;
}

fetchMyProjects.propTypes = {
    setProjectLists: PropTypes.func
};