import PropTypes from 'prop-types';
import { Box, Typography, CardContent, Card } from '@mui/material';

function ProjectCard({ project }) {

    //Set border color to green if skills match
    //Set border color to light grey if skills do not match

    const card = (
        <>
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
                    tag1, tag2, tag3
                </Typography>
                <Typography color="text.secondary">
                    needed skills:
                </Typography>
                <Typography variant="body2">
                    skill1, skill2, skill3
                </Typography>
            </CardContent>
        </>
    );

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{ borderColor: 'lightgrey' }}>{card}</Card>
        </Box>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired
};


export default ProjectCard;