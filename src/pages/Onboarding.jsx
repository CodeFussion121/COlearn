
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Avatar, Slider, Chip, Paper, Container, TextField, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGamification } from '../context/GamificationContext';

// --- Data ---
const avatars = [
    { type: 'Minimal', src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { type: 'Anime', src: 'https://api.dicebear.com/7.x/notionists/svg?seed=Aneka' },
    { type: 'Bot', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=Techie' },
    { type: 'Pixel', src: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Retro' },
];

const interestsList = ['DSA', 'Web Dev', 'AI/ML', 'Cybersecurity', 'App Dev', 'Game Dev', 'Blockchain'];

// --- Components ---

const StepWizard = ({ step, children }) => (
    <motion.div
        key={step}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
        style={{ width: '100%', height: '100%' }}
    >
        {children}
    </motion.div>
);

const Onboarding = () => {
    const navigate = useNavigate();
    const { awardXP, playSound } = useGamification();
    const [step, setStep] = useState(0);
    const [rerollsLeft, setRerollsLeft] = useState(1);
    const [showConfetti, setShowConfetti] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        avatar: '',
        branch: 'CSE',
        year: 2,
        skillLevel: 50, // 0-100
        interests: [],
        studyTime: 'Night', // Morning, Night
        soloOrSquad: 50, // 0 = Solo, 100 = Squad
        difficulty: 'Competitive', // Chill, Competitive
    });

    const [currentSquad, setCurrentSquad] = useState({
        name: "The Brainy Bunch",
        genre: "Web Dev & DSA",
        members: [1, 2, 3]
    });

    const totalSteps = 4;

    // --- Handlers ---

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(prev => prev + 1);
            playSound && playSound('click'); // Placeholder
        } else {
            completeOnboarding();
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    const toggleInterest = (interest) => {
        const current = userData.interests;
        if (current.includes(interest)) {
            setUserData({ ...userData, interests: current.filter(i => i !== interest) });
        } else {
            if (current.length < 5) {
                setUserData({ ...userData, interests: [...current, interest] });
            }
        }
    };

    const handleReroll = () => {
        if (rerollsLeft > 0) {
            setRerollsLeft(prev => prev - 1);
            // Mock random squad generation
            setCurrentSquad({
                name: "Code Crusaders",
                genre: "AI/ML & Cyber",
                members: [4, 5, 6] // Mock IDs
            });
            playSound && playSound('reroll');
        }
    };

    const completeOnboarding = () => {
        setShowConfetti(true);
        awardXP(100, "Onboarding Complete!");

        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...userData, squad: currentSquad };
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist user data
        localStorage.setItem('currentSquad', JSON.stringify(currentSquad)); // Persist squad for context

        setTimeout(() => {
            navigate('/dashboard');
        }, 3500);
    };

    return (
        <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {showConfetti && <Confetti recycle={false} numberOfPieces={600} gravity={0.15} />}

            <Box sx={{ width: '100%', maxWidth: 700 }}>
                {/* Progress UI */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                    <IconButton onClick={handleBack} disabled={step === 0}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx={{ width: '60%', height: 8, bgcolor: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            style={{ height: '100%', backgroundColor: '#4285F4' }}
                        />
                    </Box>
                    <Typography fontWeight="bold" color="primary">Step {step + 1}/{totalSteps}</Typography>
                </Box>

                <Paper elevation={6} sx={{
                    p: 5,
                    borderRadius: 6,
                    minHeight: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative'
                    // background: 'linear-gradient(145deg, #ffffff, #f0f7ff)' 
                }}>
                    <AnimatePresence mode='wait'>

                        {/* STEP 1: AVATAR & IDENTITY */}
                        {step === 0 && (
                            <StepWizard step={0}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom>Choose Your Hero</Typography>
                                <Typography color="text.secondary" sx={{ mb: 4 }}>Pick an avatar and name to start your legend.</Typography>

                                <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                                    {avatars.map((ava, index) => (
                                        <Grid item key={index}>
                                            <Paper
                                                elevation={userData.avatar === ava.src ? 4 : 1}
                                                onClick={() => setUserData({ ...userData, avatar: ava.src })}
                                                sx={{
                                                    p: 1,
                                                    cursor: 'pointer',
                                                    border: userData.avatar === ava.src ? '2px solid #4285F4' : '2px solid transparent',
                                                    borderRadius: '50%',
                                                    transition: 'transform 0.2s',
                                                    '&:hover': { transform: 'scale(1.1)' }
                                                }}
                                            >
                                                <Avatar src={ava.src} sx={{ width: 80, height: 80 }} />
                                            </Paper>
                                            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>{ava.type}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>

                                <TextField
                                    label="Your Hero Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ maxWidth: 300 }}
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            </StepWizard>
                        )}

                        {/* STEP 2: PATH & SKILLS */}
                        {step === 1 && (
                            <StepWizard step={1}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom>Defime Your Path</Typography>
                                <Typography color="text.secondary" sx={{ mb: 4 }}>Select your class and known spells (skills).</Typography>

                                <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Chip label="2nd Year" onClick={() => setUserData({ ...userData, year: 2 })} color={userData.year === 2 ? "primary" : "default"} clickable />
                                    <Chip label="3rd Year" onClick={() => setUserData({ ...userData, year: 3 })} color={userData.year === 3 ? "primary" : "default"} clickable />
                                    <Chip label="4th Year" onClick={() => setUserData({ ...userData, year: 4 })} color={userData.year === 4 ? "primary" : "default"} clickable />
                                </Box>

                                <Box sx={{ width: '80%', mx: 'auto', mb: 4, textAlign: 'left' }}>
                                    <Typography gutterBottom variant="body2" color="text.secondary">Skill Level: {userData.skillLevel}%</Typography>
                                    <Slider
                                        value={userData.skillLevel}
                                        onChange={(_, v) => setUserData({ ...userData, skillLevel: v })}
                                        aria-label="Skill Level"
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.7 }}>
                                        <span>Novice</span>
                                        <span>Wizard</span>
                                    </Box>
                                </Box>

                                <Typography variant="h6" gutterBottom>Interests</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                    {interestsList.map(item => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            onClick={() => toggleInterest(item)}
                                            variant={userData.interests.includes(item) ? "filled" : "outlined"}
                                            color={userData.interests.includes(item) ? "secondary" : "default"}
                                        />
                                    ))}
                                </Box>
                            </StepWizard>
                        )}

                        {/* STEP 3: VIBE CHECK */}
                        {step === 2 && (
                            <StepWizard step={2}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom>Set Your Vibe</Typography>
                                <Typography color="text.secondary" sx={{ mb: 5 }}>Customize your adventure settings.</Typography>

                                <Grid container spacing={4} sx={{ textAlign: 'left', maxWidth: 500, mx: 'auto' }}>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom fontWeight="bold">Active Hours</Typography>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button
                                                variant={userData.studyTime === 'Morning' ? "contained" : "outlined"}
                                                onClick={() => setUserData({ ...userData, studyTime: 'Morning' })}
                                                startIcon={<span>☀️</span>}
                                                fullWidth
                                            >
                                                Morning
                                            </Button>
                                            <Button
                                                variant={userData.studyTime === 'Night' ? "contained" : "outlined"}
                                                onClick={() => setUserData({ ...userData, studyTime: 'Night' })}
                                                startIcon={<span>🌙</span>}
                                                fullWidth
                                                sx={{ bgcolor: userData.studyTime === 'Night' ? '#3f51b5' : '' }}
                                            >
                                                Night Owl
                                            </Button>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography gutterBottom fontWeight="bold">Playstyle</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="caption">Solo</Typography>
                                            <Slider
                                                value={userData.soloOrSquad}
                                                onChange={(_, v) => setUserData({ ...userData, soloOrSquad: v })}
                                                sx={{ color: '#00C853' }}
                                            />
                                            <Typography variant="caption">Squad</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </StepWizard>
                        )}

                        {/* STEP 4: SQUAD REVEAL */}
                        {step === 3 && (
                            <StepWizard step={3}>
                                <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>Squad Found!</Typography>
                                <Typography variant="h6" sx={{ mb: 4 }}>Your companions await.</Typography>

                                <Paper sx={{
                                    p: 3,
                                    border: '2px dashed #4285F4',
                                    bgcolor: 'rgba(66, 133, 244, 0.05)',
                                    mb: 3,
                                    width: '100%',
                                    position: 'relative'
                                }}>
                                    {rerollsLeft < 1 && <Chip label="Rerolled!" color="warning" size="small" sx={{ position: 'absolute', top: 10, right: 10 }} />}

                                    <Typography variant="h4" fontWeight="bold" gutterBottom>{currentSquad.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>Focus: {currentSquad.genre}</Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 3 }}>
                                        {currentSquad.members.map(m => (
                                            <Avatar key={m} sx={{ width: 50, height: 50, bgcolor: `hsl(${m * 60}, 70%, 50%)` }}>P{m}</Avatar>
                                        ))}
                                        <Avatar src={userData.avatar} sx={{ width: 50, height: 50, border: '3px solid #F4B400' }} />
                                    </Box>
                                </Paper>

                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<AutorenewIcon />}
                                        onClick={handleReroll}
                                        disabled={rerollsLeft === 0}
                                    >
                                        Reroll ({rerollsLeft})
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="large"
                                        startIcon={<CheckCircleIcon />}
                                        onClick={handleNext}
                                        sx={{ px: 4, borderRadius: 8 }}
                                    >
                                        Accept Quest
                                    </Button>
                                </Box>
                            </StepWizard>
                        )}

                    </AnimatePresence>

                    {/* Footer Nav (Only for Steps 0-2) */}
                    {step < 3 && (
                        <Box sx={{ mt: 'auto', width: '100%', pt: 4 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleNext}
                                disabled={step === 0 && !userData.name}
                                sx={{ borderRadius: 8, height: 50, fontSize: '1.1rem', background: 'linear-gradient(45deg, #4285F4, #00C853)' }}
                            >
                                Continue
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Onboarding;
