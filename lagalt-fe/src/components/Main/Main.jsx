import { useState, createContext } from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../App.jsx";
import { useContext } from 'react'
import Login from "../Login/Login.jsx";
import SignUp from "../Signup/Signup.jsx"
import NewProject from "../NewProject/NewProject.jsx"
import MyProjects from "../MyProjects/MyProjects.jsx"
import Profile from "../Profile/Profile.jsx"
import UserView from "../UserView/UserView.jsx"
import BrowseProjects from "../BrowseProjects/BrowseProjects.jsx"
import ProjectView from "../ProjectView/ProjectView.jsx"
import AboutUs from "../AboutUs/AboutUs.jsx"
import NotFound from "../NotFound/NotFound.jsx"


const ProjectContext = createContext();

function Main() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState(null);


  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px', }}>
        <Routes>
          
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
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
          <Route path="/projectview/:projectId" element={<ProjectView />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Box>
    </ProjectContext.Provider>
  )
}


export { Main, ProjectContext };