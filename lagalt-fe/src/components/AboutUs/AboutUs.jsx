import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import PageTitle from '../PageTitle/PageTitle';

function AboutUs() {
    const [aboutus, setAboutus] = useState('');

    useEffect(() => {
        fetch('src/assets/aboutus.txt')
            .then(response => response.text())
            .then(text => setAboutus(text))
            .catch(error => console.error('Error fetching aboutus.txt:', error));
    }, []);

    return (
        <Box sx={{ padding: 3, lineHeight: 1.6, maxWidth: '800px', }}>
            <PageTitle title={"About us"} />

            {aboutus.split('\n').map((line, index) => (
                <div key={index} style={{ marginBottom: '1em' }}>
                    <Typography variant="body2">
                        {line}
                    </Typography>
                </div>
            ))}
        </Box>
    );
}

export default AboutUs;
