import PropTypes from 'prop-types';
import AssociateList from '../AssociateList/AssociateList';

function ProjectCard({ project }) {

    //<p>Needed skills: {project.neededSkills}</p>
    //<p>Tags: {project.tags}</p>

    return (
        <>
            <h2>Title: {project.title}</h2>
            <p>ID: {project.id}</p>
            <p>Category: {project.category}</p>
            <p>Status: {project.status}</p>
            <p>Description: {project.description}</p>
            <p>Website: {project.websiteUrl}</p>
            {project.associates &&
                <AssociateList associates={project.associates} />
            }
        </>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired
};


export default ProjectCard;