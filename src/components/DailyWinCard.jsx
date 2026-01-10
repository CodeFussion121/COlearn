import React from 'react';
import { Paper, Box, Typography, Button, Checkbox } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useGamification } from '../context/GamificationContext';

const DailyWinCard = () => {
    const { dailyChallenge, completeDailyChallenge } = useGamification();

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                mb: 3,
                borderRadius: 4,
                background: dailyChallenge.completed
                    ? 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                border: dailyChallenge.completed ? '1px solid #81c784' : '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: dailyChallenge.completed ? '#4caf50' : '#fff9c4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                    <EmojiEventsIcon sx={{ color: dailyChallenge.completed ? 'white' : '#fbc02d' }} />
                </Box>
                <Box>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ letterSpacing: 1 }}>
                        DAILY SMALL WIN
                    </Typography>
                    <Typography variant="body1" fontWeight="600" sx={{ textDecoration: dailyChallenge.completed ? 'line-through' : 'none', color: dailyChallenge.completed ? 'text.secondary' : 'text.primary' }}>
                        {dailyChallenge.text}
                    </Typography>
                </Box>
            </Box>

            <Button
                variant={dailyChallenge.completed ? "contained" : "outlined"}
                color={dailyChallenge.completed ? "success" : "primary"}
                onClick={completeDailyChallenge}
                disabled={dailyChallenge.completed}
                startIcon={dailyChallenge.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                sx={{ borderRadius: 8, textTransform: 'none', px: 3 }}
            >
                {dailyChallenge.completed ? "Done!" : "Mark Done (+50 XP)"}
            </Button>
        </Paper>
    );
};

export default DailyWinCard;
