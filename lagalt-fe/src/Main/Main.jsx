import { useEffect, useState } from "react";
import ProjectsView from "../ProjectsView/ProjectsView";
import { Box } from "@mui/material";
import NewProject from "../NewProject/NewProject";
import MyProjects from "../MyProjects/MyProjects";
import Profile from "../Profile/Profile";
import { Route, Routes } from "react-router-dom";
import FetchProjects from "./FetchProjects.js"


function Main({ user }) {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        FetchProjects(setProjects);
    }, [])


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px', }}>
            <Routes>
                {projects && (
                    <Route path="/dashboard" element={<ProjectsView projects={projects} user={user} />} />
                )}

                {user && (
                    <>
                        <Route path="/newproject" element={<NewProject token={user.token} />} />

                        <Route path="/myprojects" element={<MyProjects token={user.token} />} />

                        <Route path="/profile" element={<Profile user={user} />} />
                    </>
                )}
            </Routes>
        </Box>
    )
}

export default Main;