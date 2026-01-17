import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Avatar, Slider, Chip, Paper, Container, TextField, IconButton, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGamification } from '../context/GamificationContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import GlassCard from '../components/GlassCard';

const avatars = [
    { type: 'Explorer', src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { type: 'Visionary', src: 'https://api.dicebear.com/7.x/notionists/svg?seed=Aneka' },
    { type: 'Technoid', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=Techie' },
    { type: 'PixelHero', src: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Retro' },
];

const interestsList = ['DSA', 'Web Dev', 'AI/ML', 'Cybersecurity', 'App Dev', 'Game Dev', 'Blockchain'];

const StepWizard = ({ step, children }) => (
    <motion.div
        key={step}
        initial={{ x: 30, opacity: 0, filter: 'blur(10px)' }}
        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ x: -30, opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        {children}
    </motion.div>
);

const Onboarding = () => {
    const navigate = useNavigate();
    const { awardXP, user } = useGamification();
    const [step, setStep] = useState(0);
    const [rerollsLeft, setRerollsLeft] = useState(1);
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        name: user?.displayName || '',
        avatar: user?.photoURL || avatars[0].src,
        branch: 'CSE',
        year: 2,
        skillLevel: 50,
        interests: [],
        studyTime: 'Night',
        soloOrSquad: 50,
        difficulty: 'Competitive',
    });

    const [currentSquad, setCurrentSquad] = useState({
        name: "Nebula Raiders",
        genre: "Web Dev & DSA",
        members: [1, 2, 3]
    });

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(prev => prev + 1);
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
            setCurrentSquad({
                name: "Quantum Coders",
                genre: "AI/ML & Cyber",
                members: [4, 5, 6]
            });
        }
    };

    const completeOnboarding = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                ...userData,
                squad: currentSquad,
                onboarded: true,
                xp: 100
            });

            setShowConfetti(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            console.error("Onboarding setup failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {showConfetti && <Confetti recycle={false} numberOfPieces={1000} gravity={0.15} colors={['#6366f1', '#10b981', '#f59e0b', '#ef4444']} />}

            {/* Background Decor */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 80%)',
                zIndex: 0
            }} />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton onClick={handleBack} disabled={step === 0} sx={{ color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.03)' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, mx: 6, height: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)' }}
                        />
                    </Box>
                    <Typography fontWeight="900" color="primary.main" sx={{ letterSpacing: 2 }}>PHASE 0{step + 1}</Typography>
                </Box>

                <GlassCard sx={{
                    p: { xs: 4, md: 8 },
                    minHeight: 650,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)'
                }}>
                    <AnimatePresence mode='wait'>
                        {/* STEP 1: IDENTITY */}
                        {step === 0 && (
                            <StepWizard step={0}>
                                <Typography variant="h2" fontWeight="950" sx={{ mb: 1, letterSpacing: '-0.04em' }}>Digital Identity</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Choose your representation in the neural network.</Typography>

                                <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
                                    {avatars.map((ava, index) => (
                                        <Grid item key={index}>
                                            <Box
                                                onClick={() => setUserData({ ...userData, avatar: ava.src })}
                                                sx={{
                                                    p: 0.8,
                                                    cursor: 'pointer',
                                                    border: '4px solid',
                                                    borderColor: userData.avatar === ava.src ? 'primary.main' : 'transparent',
                                                    borderRadius: '50%',
                                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                    transform: userData.avatar === ava.src ? 'scale(1.15)' : 'scale(1)',
                                                    boxShadow: userData.avatar === ava.src ? '0 15px 30px rgba(99, 102, 241, 0.4)' : 'none',
                                                    '&:hover': { transform: 'scale(1.1)' }
                                                }}
                                            >
                                                <Avatar src={ava.src} sx={{ width: 100, height: 100, bgcolor: 'background.default' }} />
                                            </Box>
                                            <Typography variant="caption" sx={{ mt: 2, fontWeight: 900, display: 'block', textAlign: 'center', color: userData.avatar === ava.src ? 'primary.main' : 'text.secondary' }}>
                                                {ava.type.toUpperCase()}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>

                                <TextField
                                    label="NEURAL CODENAME"
                                    variant="outlined"
                                    fullWidth
                                    autoFocus
                                    sx={{
                                        maxWidth: 450,
                                        '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)' }
                                    }}
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            </StepWizard>
                        )}

                        {/* STEP 2: SKILLS */}
                        {step === 1 && (
                            <StepWizard step={1}>
                                <Typography variant="h2" fontWeight="950" sx={{ mb: 1, letterSpacing: '-0.04em' }}>Capability Map</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Calibrating your initial power levels and focus domains.</Typography>

                                <Box sx={{ mb: 6, display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    {[2, 3, 4].map(y => (
                                        <Button
                                            key={y}
                                            variant={userData.year === y ? "contained" : "outlined"}
                                            onClick={() => setUserData({ ...userData, year: y })}
                                            sx={{
                                                px: 4, py: 1.5,
                                                borderRadius: 3,
                                                fontWeight: 900,
                                                bgcolor: userData.year === y ? 'primary.main' : 'transparent',
                                                borderColor: userData.year === y ? 'transparent' : 'rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            YEAR {y}
                                        </Button>
                                    ))}
                                </Box>

                                <Box sx={{ width: '90%', mb: 8, p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <Typography variant="subtitle1" fontWeight="900">TECHNICAL PROFICIENCY</Typography>
                                        <Typography color="primary.main" variant="h6" fontWeight="950">{userData.skillLevel}%</Typography>
                                    </Box>
                                    <Slider
                                        value={userData.skillLevel}
                                        onChange={(_, v) => setUserData({ ...userData, skillLevel: v })}
                                        sx={{
                                            height: 10,
                                            '& .MuiSlider-track': { background: 'linear-gradient(90deg, #6366f1, #10b981)' },
                                            '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.1)' }
                                        }}
                                    />
                                </Box>

                                <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 3, opacity: 0.7, letterSpacing: 2 }}>CORE DIRECTIVES (MAX 5)</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
                                    {interestsList.map(item => (
                                        <Chip
                                            key={item}
                                            label={item.toUpperCase()}
                                            onClick={() => toggleInterest(item)}
                                            sx={{
                                                borderRadius: 2,
                                                px: 2, py: 2.5,
                                                fontWeight: 900,
                                                fontSize: '0.7rem',
                                                bgcolor: userData.interests.includes(item) ? 'primary.main' : 'rgba(255,255,255,0.03)',
                                                border: '1px solid',
                                                borderColor: userData.interests.includes(item) ? 'transparent' : 'rgba(255,255,255,0.1)',
                                                color: userData.interests.includes(item) ? 'white' : 'text.secondary',
                                                transition: 'all 0.3s',
                                                '&:hover': { transform: 'translateY(-3px)' }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </StepWizard>
                        )}

                        {/* STEP 3: VIBE */}
                        {step === 2 && (
                            <StepWizard step={2}>
                                <Typography variant="h2" fontWeight="950" sx={{ mb: 1, letterSpacing: '-0.04em' }}>Operational Vibe</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Optimizing your study synchronization.</Typography>

                                <Grid container spacing={6} sx={{ maxWidth: 650 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" fontWeight="900" sx={{ mb: 3, letterSpacing: 1 }}>CIRCADIAN CYCLE</Typography>
                                        <Box sx={{ display: 'flex', gap: 3 }}>
                                            <Button
                                                variant={userData.studyTime === 'Morning' ? "contained" : "outlined"}
                                                onClick={() => setUserData({ ...userData, studyTime: 'Morning' })}
                                                fullWidth
                                                sx={{
                                                    height: 80,
                                                    borderRadius: 4,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 900,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1
                                                }}
                                            >
                                                <Box sx={{ fontSize: '1.5rem' }}>☀️</Box>
                                                DAWN RAIDER
                                            </Button>
                                            <Button
                                                variant={userData.studyTime === 'Night' ? "contained" : "outlined"}
                                                onClick={() => setUserData({ ...userData, studyTime: 'Night' })}
                                                fullWidth
                                                sx={{
                                                    height: 80,
                                                    borderRadius: 4,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 900,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1
                                                }}
                                            >
                                                <Box sx={{ fontSize: '1.5rem' }}>🌙</Box>
                                                NIGHT OWL
                                            </Button>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" fontWeight="900" sx={{ mb: 3, letterSpacing: 1 }}>COLLABORATION RATIO</Typography>
                                        <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <Typography variant="caption" fontWeight="900" sx={{ opacity: 0.6 }}>LONE WOLF</Typography>
                                                <Slider
                                                    value={userData.soloOrSquad}
                                                    onChange={(_, v) => setUserData({ ...userData, soloOrSquad: v })}
                                                    sx={{ flexGrow: 1 }}
                                                />
                                                <Typography variant="caption" fontWeight="900" sx={{ color: 'primary.light' }}>SQUAD ELITE</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </StepWizard>
                        )}

                        {/* STEP 4: SQUAD */}
                        {step === 3 && (
                            <StepWizard step={3}>
                                <Fade in timeout={1000}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h1" fontWeight="950" sx={{
                                            mb: 1,
                                            background: 'linear-gradient(45deg, #10b981, #6366f1)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}>
                                            SQUAD ASSIGNMENT
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Neural matching successful. Prepare for briefing.</Typography>

                                        <Box sx={{
                                            p: 6,
                                            borderRadius: 8,
                                            border: '1px solid rgba(16, 185, 129, 0.3)',
                                            bgcolor: 'rgba(16, 185, 129, 0.03)',
                                            mb: 8,
                                            width: '100%',
                                            maxWidth: 600,
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', borderBottomLeftRadius: 10 }}>
                                                <Typography variant="caption" fontWeight="900" color="#10b981">STABLE CONNECTION</Typography>
                                            </Box>

                                            <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-0.02em' }}>{currentSquad.name}</Typography>
                                            <Typography variant="subtitle2" sx={{ mb: 6, letterSpacing: 4, fontWeight: 900, color: 'text.secondary' }}>PRIMARY SECTOR: {currentSquad.genre.toUpperCase()}</Typography>

                                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                                                {currentSquad.members.map((m, i) => (
                                                    <Avatar
                                                        key={m}
                                                        sx={{
                                                            width: 80, height: 80,
                                                            border: '4px solid',
                                                            borderColor: 'background.paper',
                                                            ml: i === 0 ? 0 : -3,
                                                            bgcolor: `hsl(${m * 100}, 60%, 40%)`,
                                                            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                                                        }}
                                                    />
                                                ))}
                                                <Avatar
                                                    src={userData.avatar}
                                                    sx={{
                                                        width: 90, height: 90,
                                                        border: '4px solid',
                                                        borderColor: 'primary.main',
                                                        ml: -3,
                                                        transform: 'scale(1.1) translateY(-10px)',
                                                        zIndex: 10,
                                                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)'
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                                            <Button
                                                variant="outlined"
                                                color="inherit"
                                                startIcon={<AutorenewIcon />}
                                                onClick={handleReroll}
                                                disabled={rerollsLeft === 0}
                                                sx={{ borderRadius: 4, px: 6, py: 2, fontWeight: 900, border: '1px solid rgba(255,255,255,0.1)' }}
                                            >
                                                REROLL ({rerollsLeft})
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                startIcon={<CheckCircleIcon />}
                                                onClick={handleNext}
                                                disabled={loading}
                                                sx={{
                                                    borderRadius: 4,
                                                    px: 8,
                                                    py: 2,
                                                    fontWeight: 900,
                                                    background: 'linear-gradient(45deg, #10b981, #6366f1)',
                                                    boxShadow: '0 15px 30px rgba(16, 185, 129, 0.4)'
                                                }}
                                            >
                                                {loading ? 'SYNCING...' : 'ACCEPT MISSION'}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Fade>
                            </StepWizard>
                        )}
                    </AnimatePresence>

                    {/* Footer Actions */}
                    {step < 3 && (
                        <Box sx={{ mt: 10, width: '100%', maxWidth: 500 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleNext}
                                disabled={step === 0 && !userData.name}
                                sx={{
                                    height: 72,
                                    borderRadius: 4,
                                    fontSize: '1.25rem',
                                    fontWeight: 950,
                                    background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                                    boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' },
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            >
                                CONTINUE TO PHASE 0{step + 2}
                            </Button>
                        </Box>
                    )}
                </GlassCard>
            </Container>
        </Box>
    );
};

export default Onboarding;
