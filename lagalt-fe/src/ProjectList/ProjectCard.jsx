import PropTypes from 'prop-types';
import { Typography, CardContent, Card, CardActionArea, Box } from '@mui/material';

function ProjectCard({ project }) {

    //Set border color to green if skills match
    //Set border color to light grey if skills do not match

    const goToProject = () => {
        console.log(`Clicked on project: ${project.id}`)
    }

    return (
        <Card variant="outlined" sx={{ borderColor: 'lightgrey', m: '10px' }}>
            <CardActionArea onClick={goToProject}>
                <CardContent>
                    <Typography sx={{ textAlign: 'center' }} color="text.secondary" gutterBottom>
                        {project.category}
                    </Typography>
                    <Typography variant="h5">
                        {project.title}
                    </Typography>
                    <Typography color="text.secondary">
                        Tags:
                    </Typography>
                    <Typography variant="body2">
                        {project.tags.join(', ')}
                    </Typography>
                    <Typography color="text.secondary">
                        Needed skills:
                    </Typography>
                    <Typography variant="body2">
                        {project.neededSkills.join(', ')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired
};


export default ProjectCard;