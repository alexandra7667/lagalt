import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ProjectList from './ProjectList/ProjectList.jsx'
import { UserContext } from "../../App.jsx";
import { useContext } from 'react'
import { ProjectContext } from "../Main/Main.jsx";
import PageTitle from "../PageTitle/PageTitle.jsx"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import fetchData from "../../functions/fetchData.js";
import Search from "./Search.jsx";
import matchSkillsAndVisitedProjects from "./functions/matchSkillsAndVisited.js";
import addTagsToKeywords from "./functions/addTagsToKeywords.js";

const pageSize = 2;

function ProjectsView() {
    const { user } = useContext(UserContext);
    const { projects, setProjects } = useContext(ProjectContext);
    const [filteredProjects, setFilteredProjects] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getProjects();
    }, [currentPage])

    useEffect(() => {
        if (projects) {
            addTagsToKeywords(projects, setKeywords);
            setFilteredProjects(projects);
            if(user) matchSkillsAndVisitedProjects();
        }
    }, [projects, user]);

    async function getProjects() {
        const response = await fetchData(
            `projects/getAllProjects?pageSize=${pageSize}&pageNo=${currentPage}`,
            "GET",
            null,
            "Could not fetch projects from backend."
        );
        if (response.status === "error") {
            console.error(response.message);
        } else {
            setProjects(response.data.data);
            setCurrentPage(currentPage);
            setTotalPages(response.data.totalPages);
        }
    }

    const getPrevious = () => {
        setCurrentPage(currentPage - 1);
    }

    const getNext = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <>
            <PageTitle title={"Browse Projects"} />

            <Search projects={projects} setFilteredProjects={setFilteredProjects} keywords={keywords} />

            {filteredProjects && (
                <ProjectList filteredProjects={filteredProjects} />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: '20px' }}>
                {currentPage > 0 && (
                    <Button onClick={() => getPrevious()} startIcon={<ArrowLeftIcon />}>Previous</Button>
                )}

                {projects && totalPages && (
                    <>
                        <Typography>{currentPage + 1}</Typography>
                        <Typography>/</Typography>
                        <Typography>{totalPages}</Typography>
                    </>
                )}

                {currentPage < totalPages - 1 && (
                    <Button onClick={() => getNext()} endIcon={<ArrowRightIcon />}>Next</Button>
                )}
            </Box>
        </>
    )
}

export default ProjectsView;