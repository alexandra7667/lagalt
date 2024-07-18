import { useEffect, useState } from "react";
import ProjectsView from "../ProjectsView/ProjectsView";
import { Box } from "@mui/material";
import NewProject from "../NewProject/NewProject";
import MyProjects from "../MyProjects/MyProjects";
import Profile from "../Profile/Profile";
import { Route, Routes } from "react-router-dom";
import FetchProjects from "../FetchProjects.js"
import Login from "../Login/Login";

import PropTypes from 'prop-types';


function Main({ user, setUser }) {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        FetchProjects(setProjects);
    }, [])


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px', }}>
        <Routes>
          
          {projects && (
            <Route path="/" element={<ProjectsView projects={projects} user={user} />} />
          )}

          {!user ? (
            <Route path="/login" element={<Login setUser={setUser} />} />
          ) : (
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

Main.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
};

export default Main;