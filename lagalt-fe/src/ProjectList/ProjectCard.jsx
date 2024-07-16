import PropTypes from 'prop-types';
import { Box, Typography, CardContent, Card, CardActionArea } from '@mui/material';

function ProjectCard({ project }) {

    //Set border color to green if skills match
    //Set border color to light grey if skills do not match

    const goToProject = () => {
        console.log(`Clicked on project: ${project.id}`)
    }

    return (
        <Box sx={{ }}>
            <Card variant="outlined" sx={{ borderColor: 'lightgrey' }}>
                <CardActionArea onClick={goToProject}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {project.category}
                        </Typography>
                        <Typography variant="h5">
                            {project.title}
                        </Typography>
                        <Typography color="text.secondary">
                            tags:
                        </Typography>
                        <Typography variant="body2">
                            {project.tags.join(', ')}
                        </Typography>
                        <Typography color="text.secondary">
                            needed skills:
                        </Typography>
                        <Typography variant="body2">
                            {project.neededSkills.join(', ')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired
};


export default ProjectCard;