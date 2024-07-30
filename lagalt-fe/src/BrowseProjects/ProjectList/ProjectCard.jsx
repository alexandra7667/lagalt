import PropTypes from 'prop-types';
import { Typography, CardContent, Card, CardActionArea, CardMedia } from '@mui/material';
import hamster from '../../assets/img/hamster.jpg';
import flowers from '../../assets/img/flowers.jpg';
import tree from '../../assets/img/tree.jpg';
import beach from '../../assets/img/beach.jpg';
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
    const navigate = useNavigate();
    
    let image;
    switch (project.category) {
        case 'Films':
            image = beach;
            break;
        case 'Music':
            image = hamster;
            break;
        case 'Web Development':
            image = flowers;
            break;
        default:
            image = tree;
            break;
    }

    return (
        <Card variant="outlined" sx={{ borderColor: project.matchingSkill ? 'lightgreen' : 'lightgrey', m: '10px' }}>
            <CardActionArea onClick={() => navigate(`/projectview/${project.id}`)}>
                
                {project.matchingSkill ? (
                    <Typography sx={{ color: 'green', textAlign: 'right', mr: '5px', mt: '5px' }}>
                        - Skill match -
                    </Typography>
                ) : (
                    <br style={{marginTop: '10px'}}/>
                )}

                <Typography sx={{ textAlign: 'center', my: '5px' }} color="text.secondary" gutterBottom>
                    {project.category}
                </Typography>

                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={project.title}
                />

                <CardContent>
                    <Typography variant="h5" sx={{ color: project.visited ? 'grey' : 'black'}}>
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