import React, { useState, useEffect } from 'react';
import { Dialog, Typography, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

const MoodCheck = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Show 2 seconds after mount (simulate "Login Check-in")
        const timer = setTimeout(() => {
            // Only show if haven't checked in today (mock check)
            if (!sessionStorage.getItem('moodChecked')) {
                setOpen(true);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleMood = (mood) => {
        console.log("Mood logged:", mood);
        sessionStorage.setItem('moodChecked', 'true');
        setOpen(false);
        // Could enable a nice toast notification here
    };

    const emojis = [
        { label: 'Energized', icon: '⚡' },
        { label: 'Chill', icon: '🎧' },
        { label: 'Stressed', icon: '😤' },
        { label: 'Confused', icon: '😵' },
    ];

    return (
        <Dialog
            open={open}
            PaperProps={{
                sx: {
                    borderRadius: 5,
                    p: 3,
                    textAlign: 'center',
                    minWidth: 300,
                    overflow: 'visible'
                }
            }}
        >
            <IconButton
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            >
                <CloseIcon />
            </IconButton>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
                State Check! 🧠
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                How are you feeling right now?
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {emojis.map((item) => (
                    <motion.div key={item.label} whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.9 }}>
                        <Box
                            onClick={() => handleMood(item.label)}
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            <Typography sx={{ fontSize: '2.5rem' }}>{item.icon}</Typography>
                            <Typography variant="caption" fontWeight="bold">{item.label}</Typography>
                        </Box>
                    </motion.div>
                ))}
            </Box>
        </Dialog>
    );
};

export default MoodCheck;
