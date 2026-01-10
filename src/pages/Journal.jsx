import React from 'react';
import { Box, Typography, Paper, Container, List, ListItem, ListItemText, Chip, Divider, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
    const navigate = useNavigate();
    const history = JSON.parse(localStorage.getItem('questHistory') || '[]');
    const totalXP = history.reduce((acc, curr) => acc + (curr.xp || 0), 0);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')}>
                Back to Dashboard
            </Button>

            <Box sx={{ mt: 3, mb: 5, textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold" color="primary">Learning Journal</Typography>
                <Typography variant="subtitle1" color="text.secondary">Your path to mastery</Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 4, mb: 4, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                <Typography variant="h6">Total XP Earned</Typography>
                <Typography variant="h2" fontWeight="bold" color="primary.dark">{totalXP}</Typography>
            </Paper>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Quest History</Typography>
            <Paper sx={{ borderRadius: 4 }}>
                <List>
                    {history.length === 0 ? (
                        <ListItem sx={{ py: 3, textAlign: 'center' }}>
                            <ListItemText primary="No quests completed yet." secondary="Join your squad and start a quest!" />
                        </ListItem>
                    ) : (
                        history.map((quest, index) => (
                            <React.Fragment key={index}>
                                <ListItem sx={{ py: 2 }}>
                                    <ListItemText
                                        primary={quest.title}
                                        secondary={new Date(quest.completedAt).toLocaleDateString()}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Chip label={`+${quest.xp} XP`} color="success" size="small" variant="outlined" />
                                        <Typography variant="h5">{quest.vibe}</Typography>
                                    </Box>
                                </ListItem>
                                {index < history.length - 1 && <Divider />}
                            </React.Fragment>
                        ))
                    )}
                </List>
            </Paper>
        </Container>
    );
};

export default Journal;
