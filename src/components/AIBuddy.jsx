import React, { useState } from 'react';
import { Box, Fab, Paper, Typography, Fade, IconButton, Button, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy'; // Bot icon
import CloseIcon from '@mui/icons-material/Close';

const ADVICE_LIST = [
    "Your squad is struggling with Recursion. Want to try a 'Fix-a-Friend' quest to help them?",
    "You're 200 XP away from Level 5! A 'Sprint Quest' could get you there in 10 mins.",
    "Did you know? Explain Quests give 2x XP because teaching is the best way to learn.",
    "Feeling stuck? Break the problem down. Write the base case first.",
    "Great streak! 🔥 Keep it up to unlock the 'Consistency King' badge."
];

const AIBuddy = ({ level }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(ADVICE_LIST[0]);

    const handleToggle = () => {
        if (!open) {
            // Pick random advice on open
            const randomMsg = ADVICE_LIST[Math.floor(Math.random() * ADVICE_LIST.length)];
            setMessage(randomMsg);
        }
        setOpen(!open);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

            <Fade in={open}>
                <Paper sx={{
                    mb: 2,
                    p: 2,
                    maxWidth: 250,
                    borderRadius: 4,
                    borderBottomRightRadius: 4,
                    bgcolor: 'white',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    position: 'relative'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" fontWeight="bold" color="primary">AI COACH</Typography>
                        <IconButton size="small" onClick={() => setOpen(false)}><CloseIcon fontSize="small" /></IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                        {message}
                    </Typography>
                    <Button size="small" variant="text" sx={{ mt: 1, textTransform: 'none' }}>
                        Show me more
                    </Button>
                </Paper>
            </Fade>

            <Fab
                color="primary"
                aria-label="ai-buddy"
                onClick={handleToggle}
                sx={{
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                    boxShadow: '0 0 20px rgba(33, 150, 243, 0.5)',
                    width: 64,
                    height: 64
                }}
            >
                <SmartToyIcon fontSize="large" />
            </Fab>
        </Box>
    );
};

export default AIBuddy;
