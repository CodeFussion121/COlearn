import React from 'react';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import { QUESTS } from '../data/quests';
import QuestCard from '../components/QuestCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const QuestFeed = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
                Back to Dashboard
            </Button>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Available Quests
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                Pick a quest to start with your squad!
            </Typography>

            <Grid container spacing={3}>
                {QUESTS.map(quest => (
                    <Grid item xs={12} md={4} key={quest.id}>
                        <QuestCard quest={quest} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default QuestFeed;
