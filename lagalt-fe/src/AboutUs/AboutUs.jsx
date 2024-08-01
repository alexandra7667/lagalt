import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

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
            <Typography variant="h4" sx={{ mb: '40px', textAlign: 'center' }}>About us</Typography>

            <Typography variant="body2">
                {aboutus.split('\n').map((line, index) => (
                    <div key={index} style={{ marginBottom: '1em' }}>
                        {line}
                    </div>
                ))}
            </Typography>
        </Box>
    );
}

export default AboutUs;
