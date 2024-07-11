import ProjectCard from "./ProjectCard";
import PropTypes from 'prop-types';


function ProjectList({ projects }) {

    return (
        <>
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </>
    )
}

ProjectList.propTypes = {
    projects: PropTypes.array.isRequired
};

export default ProjectList;