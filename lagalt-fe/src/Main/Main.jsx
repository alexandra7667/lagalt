import { useEffect, useState, createContext } from "react";
import BrowseProjects from "../BrowseProjects/BrowseProjects.jsx";
import { Box } from "@mui/material";
import NewProject from "../NewProject/NewProject";
import MyProjects from "../MyProjects/MyProjects";
import Profile from "../Profile/Profile";
import { Route, Routes } from "react-router-dom";
import FetchProjects from "./FetchProjects.js"
import Login from "../Login/Login";
import { UserContext } from "../App";
import { useContext } from 'react'
import ProjectView from "../ProjectView/ProjectView.jsx";

const ProjectContext = createContext();

function Main() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState(null);
  const [visitedProjects, setVisitedProjects] = useState(null);

  useEffect(() => {
    FetchProjects(setProjects);
  }, [])

  return (
    <ProjectContext.Provider value={{ projects, setProjects, visitedProjects, setVisitedProjects }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px', }}>
        <Routes>

          {projects && (
            <>
              <Route path="/" element={<BrowseProjects />} />
              <Route path="/projectview/:projectId" element={<ProjectView />} />
            </>
          )}

          {!user ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <>
              <Route path="/newproject" element={<NewProject />} />

              <Route path="/myprojects" element={<MyProjects />} />

              <Route path="/profile" element={<Profile />} />
            </>
          )}

        </Routes>
      </Box>
    </ProjectContext.Provider>
  )
}


export { Main, ProjectContext };