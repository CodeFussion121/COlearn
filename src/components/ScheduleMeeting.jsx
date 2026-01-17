import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import GlassCard from './GlassCard';
import { createMeeting } from '../services/calendarService';

const ScheduleMeeting = () => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSchedule = async () => {
        if (!title || !start) {
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }

        setLoading(true);
        try {
            const startDate = new Date(start);
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

            const event = await createMeeting(
                title,
                "Study session scheduled via CoLearn",
                startDate.toISOString(),
                endDate.toISOString()
            );

            setMessage({ type: 'success', text: `Meeting scheduled! Link: ${event.hangoutLink}` });
            setTitle('');
            setStart('');
            if (event.hangoutLink) {
                window.open(event.hangoutLink, '_blank');
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to schedule meeting. Try signing in again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassCard sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <VideoCallIcon color="primary" fontSize="large" />
                <Typography variant="h6" fontWeight="bold">Squad Meet</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Session Topic"
                    variant="outlined"
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    InputProps={{ sx: { color: 'white' } }}
                    InputLabelProps={{ sx: { color: 'gray' } }}
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}
                />
                <TextField
                    type="datetime-local"
                    variant="outlined"
                    size="small"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    InputProps={{ sx: { color: 'white' } }}
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}
                />
                <Button
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VideoCallIcon />}
                    onClick={handleSchedule}
                    disabled={loading}
                    sx={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        fontWeight: 'bold',
                        color: 'white'
                    }}
                >
                    {loading ? 'Scheduling...' : 'Launch Meet'}
                </Button>
            </Box>

            <Snackbar open={!!message.text} autoHideDuration={6000} onClose={() => setMessage({ type: '', text: '' })}>
                <Alert severity={message.type} sx={{ width: '100%' }}>
                    {message.text}
                </Alert>
            </Snackbar>
        </GlassCard>
    );
};

export default ScheduleMeeting;
