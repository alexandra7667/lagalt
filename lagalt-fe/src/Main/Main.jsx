import { useEffect, useState } from "react";
import { urlBackendBasePath } from "../assets/urls";
import ProjectList from "../ProjectList/ProjectList";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Main() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

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
        setFilteredProjects(projectsResponse.data);
    }

    const filterByCategory = (e) => {
        setSelectedCategory(e.target.value);
        if(e.target.value === "All") setFilteredProjects(projects);
        else setFilteredProjects(projects.filter(project => project.category === e.target.value));
    };

    return (
        <>
            <FormControl sx={{ mb: '20px',  width: { xs: '300px', sm: '400px'}}} >
                <InputLabel id="label-category">Category</InputLabel>
                <Select
                    labelId="label-category"
                    id="select-category"
                    value={selectedCategory}
                    label="Category"
                    onChange={filterByCategory}
                >
                    <MenuItem value={"All"}>All projects</MenuItem>
                    <MenuItem value={"Films"}>Films</MenuItem>
                    <MenuItem value={"Music"}>Music</MenuItem>
                    <MenuItem value={"Web Development"}>Web Development</MenuItem>
                    <MenuItem value={"Game Development"}>Game Development</MenuItem>
                </Select>
            </FormControl>

            {filteredProjects && <ProjectList projects={filteredProjects} />}
        </>

    )
}

export default Main;