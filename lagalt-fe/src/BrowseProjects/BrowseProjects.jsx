import { useEffect, useState } from "react";
import { Autocomplete, Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ProjectList from './ProjectList/ProjectList.jsx'
import { UserContext } from "../App.jsx";
import { useContext } from 'react'
import { ProjectContext } from "../Main/Main.jsx";

function ProjectsView() {
    const { user } = useContext(UserContext);
    const { projects, visitedProjects } = useContext(ProjectContext);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [keywords, setKeywords] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState("");

    useEffect(() => {
        addTagsToKeywords();

        const setProjectsData = async () => {
            const setted = await test(projects); //Sätt som i my projects (egen metod med const return)
            console.log("first: " + setted);
            //visitedProjects = null
            if (visitedProjects) matchSkillsAndVisited(setted);
        }

        setProjectsData();
    }, [projects, visitedProjects]);

    async function test(ps) {
        setFilteredProjects(ps);
        return true;
    }

    const matchSkillsAndVisited = (setted) => {
        console.log("second: " + setted)
        filteredProjects.forEach(project => {
            //Checks if any neededSkill in the project matches with user.skills
            if (project.neededSkills.some(neededSkill => user.skills.includes(neededSkill))) {
                //Add a new property to the project object
                project.matchingSkill = true;
            }
            console.log("VISITED: " + visitedProjects.projectTitle)
            //check if project.id === any visited.projectId
            // visitedProjects.forEach(visited => {
            //     console.log("VISITED: " + visited);
            //     if (project.id === visited.projectId) {
            //         project.visited = true;
            //         console.log("IN visited");
            //     }
            // })
        });
    };

    const addTagsToKeywords = () => {
        //Add all tags and needed skills from all projects to keywords
        const keywordSet = new Set();

        projects.forEach(project => {

            project.tags.forEach(tag => {
                keywordSet.add(tag);
            });

            project.neededSkills.forEach(skill => {
                keywordSet.add(skill);
            })
        });

        setKeywords(Array.from(keywordSet));
    }

    const filterByCategory = (e) => {
        setSelectedCategory(e.target.value);

        if (e.target.value === "All") setFilteredProjects(projects);
        else setFilteredProjects(projects.filter(project => project.category === e.target.value));
    };

    const filterByKeyword = (e, value) => {
        setSelectedKeyword(value);

        if (value === null) {
            setFilteredProjects(projects);
            return;
        }

        let match = false;
        let projectSet = new Set();

        projects.forEach(project => {
            if (project.tags.length > 0) {
                project.tags.forEach(tag => {
                    if (tag.toLowerCase() === value.toLowerCase()) { //Ignore casing
                        projectSet.add(project);
                        match = true;
                        return; //Exit tags loop
                    }
                })
            }

            if (match) {
                match = false;
                return; //Exit project loop (Continue to next project)
            }

            if (project.neededSkills.length > 0) {
                project.neededSkills.forEach(skill => {
                    if (skill.toLowerCase() === value.toLowerCase()) {
                        projectSet.add(project);
                        match = true;
                        return; //Exit neededSkills loop
                    }
                })
            }

            match = false;
        });

        setFilteredProjects(Array.from(projectSet));
    }

    return (
        <>
            <Typography variant="h4" sx={{ mb: '40px', textAlign: 'center' }}>Browse Projects</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px' }}>
                {keywords && (
                    <Autocomplete
                        freeSolo
                        disablePortal
                        id="keyword-autocomplete"
                        options={keywords}
                        value={selectedKeyword}
                        onChange={filterByKeyword}
                        sx={{ width: { xs: '300px', sm: '400px' }, marginBottom: '20px' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search by keyword"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />)}

                <FormControl sx={{ width: { xs: '300px', sm: '400px' } }} >
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
            </Box>

            {filteredProjects && <ProjectList projects={filteredProjects} />}
        </>
    )
}

export default ProjectsView;