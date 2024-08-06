import { useState, createContext } from "react";
import BrowseProjects from "../BrowseProjects/BrowseProjects.jsx";
import { Box } from "@mui/material";
import NewProject from "../NewProject/NewProject";
import MyProjects from "../MyProjects/MyProjects";
import Profile from "../Profile/Profile";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import { UserContext } from "../App";
import { useContext } from 'react'
import ProjectView from "../ProjectView/ProjectView.jsx";
import UserView from "../UserView/UserView.jsx";
import Signup from "../Signup/Signup.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";

const ProjectContext = createContext();

function Main() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState(null);


  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px', }}>
        <Routes>

          {projects && (
            <Route path="/projectview/:projectId" element={<ProjectView />} />
          )}

          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/newproject" element={<NewProject />} />
              <Route path="/myprojects" element={<MyProjects />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userview/:userId" element={<UserView />} />
            </>
          )}

          <Route path="/" element={<BrowseProjects />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Box>
    </ProjectContext.Provider>
  )
}


export { Main, ProjectContext };