import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import PropTypes from 'prop-types';


function ProjectList({ projects }) {

    return (
        <>
            <Grid container spacing={2}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

ProjectList.propTypes = {
    projects: PropTypes.array.isRequired
};

export default ProjectList;