import { Typography } from "@mui/material";

function PageTitle({ title }) {

    return (
        <Typography variant="h4" sx={{ mb: '30px', textAlign: 'center' }}>{title}</Typography>
    )
}

export default PageTitle;