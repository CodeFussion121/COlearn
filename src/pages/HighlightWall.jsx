import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Card, CardContent } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

const MOCK_HIGHLIGHTS = [
    { name: "Rahul Sharma", title: "Student of the Week", desc: "Completed 15 Explain Quests!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { name: "Squad Alpha", title: "Best Squad", desc: "Collaborated on 50+ bugs.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha" },
    { name: "Anjali Gupta", title: "Bug Slayer", desc: "Fixed a critical React error.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" }
];

const HighlightWall = () => {
    return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmojiEventsIcon color="primary" fontSize="large" /> Hall of Fame
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Celebrating the top achievers and most helpful students this week.
            </Typography>

            <Grid container spacing={3}>
                {MOCK_HIGHLIGHTS.map((item, idx) => (
                    <Grid item xs={12} md={4} key={idx}>
                        <Card sx={{
                            borderRadius: 4,
                            textAlign: 'center',
                            p: 2,
                            background: idx === 0 ? 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)' : 'white',
                            border: idx === 0 ? '2px solid #FFD54F' : 'none',
                            transform: idx === 0 ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}>
                            <CardContent>
                                {idx === 0 && <StarIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />}
                                <Avatar src={item.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2, border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                                <Chip label={item.title} color={idx === 0 ? "warning" : "primary"} size="small" sx={{ my: 1, fontWeight: 'bold' }} />
                                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

import { Chip } from '@mui/material'; // Forgot import
export default HighlightWall;
