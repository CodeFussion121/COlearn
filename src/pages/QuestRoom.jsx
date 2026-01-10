import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container, Stepper, Step, StepLabel, TextField, Chip } from '@mui/material';
import { QUESTS } from '../data/quests';
import Confetti from 'react-confetti'; // Optional: might need install or just simulate

const steps = ['Icebreaker', 'The Quest', 'Reflection', 'Complete'];

const QuestRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const quest = QUESTS.find(q => q.id === id);
    const [activeStep, setActiveStep] = useState(0);
    const [complete, setComplete] = useState(false);
    // Window size for confetti
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    const detectSize = () => {
        setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    }

    React.useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => window.removeEventListener('resize', detectSize);
    }, []);

    if (!quest) return <Typography>Quest not found</Typography>;

    const handleNext = () => {
        if (activeStep === steps.length - 2) {
            setComplete(true);
            // Save to history
            const history = JSON.parse(localStorage.getItem('questHistory') || '[]');
            if (!history.find(h => h.id === quest.id)) {
                history.push({
                    ...quest,
                    completedAt: new Date().toISOString(),
                    vibe: '🤩' // Mocking vibe for now
                });
                localStorage.setItem('questHistory', JSON.stringify(history));
            }
        }
        setActiveStep((prev) => prev + 1);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {complete && (
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
                    <Confetti width={windowDimension.width} height={windowDimension.height} />
                </Box>
            )}

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Paper sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 4 }}>

                {/* Stage 1: Icebreaker */}
                {activeStep === 0 && (
                    <>
                        <Typography variant="h4" gutterBottom>🧊 Icebreaker Time!</Typography>
                        <Typography variant="h6" color="text.secondary" paragraph>
                            "If you could have any superpower specifically for coding, what would it be?"
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Type your answer here..."
                            sx={{ maxWidth: 500, my: 3 }}
                        />
                    </>
                )}

                {/* Stage 2: The Quest */}
                {activeStep === 1 && (
                    <Box sx={{ width: '100%', textAlign: 'left' }}>
                        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>{quest.title}</Typography>
                        <Chip label={quest.type} color="primary" sx={{ mb: 3, display: 'block', mx: 'auto', width: 'fit-content' }} />

                        <Typography variant="h6" gutterBottom>Objective:</Typography>
                        <Typography paragraph>{quest.description}</Typography>

                        {quest.questions && (
                            <Box sx={{ mt: 3, bgcolor: '#f1f3f4', p: 3, borderRadius: 2 }}>
                                <Typography variant="h6">Questions:</Typography>
                                {quest.questions.map(q => (
                                    <Typography key={q.id} sx={{ mt: 1 }}>• {q.text}</Typography>
                                ))}
                            </Box>
                        )}

                        <Box sx={{ mt: 4, p: 3, border: '1px dashed #ccc', borderRadius: 2, textAlign: 'center' }}>
                            <Typography color="text.secondary">Collaboration Area (Simulated)</Typography>
                            <Typography variant="caption">Start a Google Meet or use the Whiteboard</Typography>
                        </Box>
                    </Box>
                )}

                {/* Stage 3: Reflection */}
                {activeStep === 2 && (
                    <>
                        <Typography variant="h4" gutterBottom>🤔 Reflection</Typography>
                        <Typography variant="h6" color="text.secondary" paragraph>
                            "What was the most confusing part of this quest?"
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="I struggled with..."
                            sx={{ maxWidth: 500, my: 3 }}
                        />
                        <Box>
                            <Typography gutterBottom>Rate the Vibe:</Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                {['😤', '😕', '😐', '🙂', '🤩'].map(emoji => (
                                    <Button key={emoji} variant="outlined" sx={{ fontSize: '1.5rem', minWidth: 60 }}>{emoji}</Button>
                                ))}
                            </Box>
                        </Box>
                    </>
                )}

                {/* Stage 4: Complete */}
                {activeStep === 3 && (
                    <>
                        <Typography variant="h2" gutterBottom>🎉 Quest Complete!</Typography>
                        <Typography variant="h5" color="primary" paragraph>
                            + {quest.xp} XP Earned
                        </Typography>
                        <Typography color="text.secondary">
                            Your squad streak is now: 🔥 1
                        </Typography>
                        <Button variant="contained" size="large" onClick={() => navigate('/dashboard')} sx={{ mt: 4 }}>
                            Back to HQ
                        </Button>
                    </>
                )}

                {activeStep < 3 && (
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleNext}
                        sx={{ mt: 4, px: 5 }}
                    >
                        {activeStep === 2 ? 'Finish Quest' : 'Next Step'}
                    </Button>
                )}
            </Paper>
        </Container>
    );
};

export default QuestRoom;
