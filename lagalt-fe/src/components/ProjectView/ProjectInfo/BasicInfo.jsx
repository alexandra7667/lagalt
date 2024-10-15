import { Typography } from "@mui/material";

export default function BasicInfo({project, selectedStatus}) {

    return (
        <>
            <Typography variant="h6">
                Project status: {selectedStatus}
            </Typography>
            <Typography variant="h6" color="text.secondary">
                {project.category}
            </Typography>
            <Typography variant="body1">
                {project.description}
            </Typography>
            <Typography variant="body1">
                Needed skills: {project.neededSkills.join(', ')}
            </Typography>
            <Typography variant="body1">
                Tags: {project.tags.join(', ')}
            </Typography>
        </>
    )
}