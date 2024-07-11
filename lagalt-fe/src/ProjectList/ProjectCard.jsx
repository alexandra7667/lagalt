import PropTypes from 'prop-types';
import AssociateList from '../AssociateList/AssociateList';
import { Box, Typography, Stack } from '@mui/material';

function ProjectCard({ project }) {

    //<p>Needed skills: {project.neededSkills}</p>
    //<p>Tags: {project.tags}</p>

    return (
        <>

            <Typography variant="h2" component="h2" sx={{ mb: 4 }}>
                Material UI example
            </Typography>
            <Box sx={{ my: 4 }}>
                <Stack spacing={2}>
                    <Typography variant="h3">
                        Title: {project.title}
                    </Typography>
                    <Typography variant="body1">
                        ID: {project.id}
                    </Typography>
                    <Typography variant="body1">
                        Category: {project.category}
                    </Typography>
                    <Typography variant="body1">
                        Status: {project.status}
                    </Typography>
                    <Typography variant="body1">
                        Description: {project.description}
                    </Typography>
                    <Typography variant="body1">
                        Website: {project.websiteUrl}
                    </Typography>
                    {project.associates &&
                        <AssociateList associates={project.associates} />
                    }
                </Stack>
            </Box>
        </>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired
};


export default ProjectCard;