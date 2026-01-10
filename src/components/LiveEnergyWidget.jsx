import React, { useState, useEffect } from 'react';
import { Paper, Box, Typography, Chip, Fade } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';

const EVENTS = [
    { text: "42 students solving DSA right now", icon: <LocalFireDepartmentIcon color="error" />, type: 'hot' },
    { text: "Squad 'Alpha' just completed Fix-a-Friend Quest", icon: <GroupsIcon color="primary" />, type: 'social' },
    { text: "Exams coming up! 150 students revising Graphs", icon: <PsychologyIcon color="warning" />, type: 'study' },
    { text: "New Explain Quest: 'React Hooks' is trending", icon: <BoltIcon color="secondary" />, type: 'trend' },
    { text: "Rahul just earned 'Bug Slayer' Badge!", icon: <EmojiEventsIcon color="success" />, type: 'achievement' },
];

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const LiveEnergyWidget = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
                setVisible(true);
            }, 500); // Wait for fade out
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const currentEvent = EVENTS[currentIndex];

    return (
        <Paper
            elevation={3}
            sx={{
                p: 1.5,
                mb: 3,
                borderRadius: 4,
                bgcolor: '#1a1a1a', // Dark background for contrast
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundImage: 'linear-gradient(45deg, #1a1a1a 30%, #2c2c2c 90%)',
                border: '1px solid #333',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: '#ff3d00',
                px: 1,
                py: 0.5,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '0.75rem',
                boxShadow: '0 0 10px #ff3d00'
            }}>
                <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                LIVE
            </Box>

            <Fade in={visible} timeout={500}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                    {currentEvent.icon}
                    <Typography variant="body2" fontWeight="500">
                        {currentEvent.text}
                    </Typography>
                </Box>
            </Fade>

            <style>
                {`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
                `}
            </style>
        </Paper>
    );
};

export default LiveEnergyWidget;
