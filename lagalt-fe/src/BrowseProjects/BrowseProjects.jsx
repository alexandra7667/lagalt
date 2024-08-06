import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ProjectList from './ProjectList/ProjectList.jsx'
import { UserContext } from "../App.jsx";
import { useContext } from 'react'
import { ProjectContext } from "../Main/Main.jsx";
import PageTitle from "../PageTitle/PageTitle.jsx"
import fetchProjects from "./FetchProjects.js";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const pageSize = 2;

function ProjectsView() {
    const { user } = useContext(UserContext);
    const { projects, setProjects } = useContext(ProjectContext);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [keywords, setKeywords] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchProjects(setProjects, pageSize, currentPage, setCurrentPage, setTotalPages);
    }, [])

    useEffect(() => {
        if (projects) {
            setFilteredProjects(projects);
            addTagsToKeywords();
        }
    }, [projects]);

    useEffect(() => {
        if (user) {
            matchSkillsAndVisitedProjects();
        }
    }, [user]);


    const matchSkillsAndVisitedProjects = () => {
        projects.forEach(project => {
            //Check for matching skills
            if (project.neededSkills && user.skills) {
                if (project.neededSkills.some(neededSkill => user.skills.includes(neededSkill))) {
                    project.matchingSkill = true;
                    console.log("Matching skills: " + project.title);
                }
            }

            //Check if project is visited
            if (user.associations) {
                const association = user.associations.find(assoc => assoc.projectId === project.id && assoc.visitor);
                if (association) {
                    project.visited = true;
                    console.log("visited: " + association.projectTitle);
                }
            }
        });
    };

    const addTagsToKeywords = () => {
        //Add all tags and needed skills from all projects to keywords
        const keywordSet = new Set();

        projects.forEach(project => {

            if (project.tags) {
                project.tags.forEach(tag => {
                    keywordSet.add(tag);
                });
            }

            if (project.neededSkills) {
                project.neededSkills.forEach(skill => {
                    keywordSet.add(skill);
                })
            }
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
            <PageTitle title={"Browse Projects"} />

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
                                label="Search by tag or skill"
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

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: '20px' }}>
                {currentPage > 0 && (
                    <Button onClick={() => fetchProjects(setProjects, pageSize, currentPage - 1, setCurrentPage)} startIcon={<ArrowLeftIcon />}>Previous</Button>
                )}

                {projects && (
                    <>
                    <Typography>{currentPage + 1}</Typography>
                    <Typography>/</Typography>
                    <Typography>{totalPages}</Typography>
                    </>
                )}

                {currentPage < totalPages - 1 && (
                    <Button onClick={() => fetchProjects(setProjects, pageSize, currentPage + 1, setCurrentPage)} endIcon={<ArrowRightIcon />}>Next</Button>
                )}
            </Box>
        </>
    )
}

export default ProjectsView;