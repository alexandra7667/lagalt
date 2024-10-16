import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import PropTypes from 'prop-types';


function ProjectList({ filteredProjects }) {

    console.log("Projects in ProjectList= ", filteredProjects)

    return (
        <Grid container sx={{ px: '20px', maxWidth: '2000px', width: '100%', margin: 'auto' }}>
            {filteredProjects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                    <ProjectCard project={project} />
                </Grid>
            ))}
        </Grid>
    )
}

ProjectList.propTypes = {
    filteredProjects: PropTypes.array
};

export default ProjectList;