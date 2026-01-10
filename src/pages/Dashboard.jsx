import React from 'react';
import { Box, Typography, Button, Paper, Grid, Avatar, Chip, CircularProgress, LinearProgress, Divider, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSquad } from '../context/SquadContext';
import { useGamification } from '../context/GamificationContext';

import LiveEnergyWidget from '../components/LiveEnergyWidget';
import JourneyMap from '../components/JourneyMap';
import AIBuddy from '../components/AIBuddy';
import DailyWinCard from '../components/DailyWinCard';

import { useExamMode } from '../context/ExamModeContext';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const { squad, findSquad, leaveSquad, loading } = useSquad();
    const { stats } = useGamification();
    const { examMode, toggleExamMode } = useExamMode();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto', bgcolor: examMode ? '#fff3e0' : 'transparent', minHeight: '100vh', transition: 'background-color 0.5s' }}>
            {/* Live Campus Energy Widget */}
            <LiveEnergyWidget />

            {examMode && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: '#d32f2f', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.5s' }}>
                    <Typography variant="h6" fontWeight="bold">🔥 EXAM MODE ACTIVE: Prioritizing High-Weight Topics & Quick Revision</Typography>
                </Paper>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">Hello, {user.name}!</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Year: {user.year} • Branch: {user.branch}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControlLabel
                        control={<Switch checked={examMode} onChange={toggleExamMode} color="error" />}
                        label={<Typography fontWeight="bold" color={examMode ? 'error' : 'text.secondary'}>Exam Mode</Typography>}
                    />
                    <Button variant="text" size="small" onClick={() => navigate('/admin')}>
                        Mentor Mode
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleLogout}>
                        Sign Out
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Squad Section */}
                <Grid item xs={12} md={8}>
                    {/* Daily Win Card */}
                    <DailyWinCard />

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            minHeight: 300,
                            position: 'relative',
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
                            border: '1px solid rgba(66, 133, 244, 0.2)',
                            boxShadow: '0 8px 32px rgba(66, 133, 244, 0.1)'
                        }}
                    >
                        {/* Decorative Background Elements */}
                        <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: 'rgba(66, 133, 244, 0.05)', zIndex: 0 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <GroupsIcon sx={{ color: '#4285F4', fontSize: 32 }} />
                                <Typography variant="h5" fontWeight="800" sx={{ background: 'linear-gradient(45deg, #4285F4, #00C853)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    My Squad
                                </Typography>
                            </Box>
                            {squad && <Chip label="ACTIVE" size="small" sx={{ bgcolor: '#00C853', color: 'white', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,200,83,0.4)' }} />}
                        </Box>

                        {!squad ? (
                            <Box sx={{ textAlign: 'center', py: 5, position: 'relative', zIndex: 1 }}>
                                <Typography variant="h6" gutterBottom color="text.secondary">
                                    No Alliance Formed Yet
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                                    Find your party to unlock Quests, earn XP, and dominate the leaderboard.
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => findSquad(user)}
                                    disabled={loading}
                                    sx={{ borderRadius: 8, background: 'linear-gradient(45deg, #4285F4, #2962FF)' }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Find My Squad'}
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 3, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" fontWeight="bold" color="#1a237e">{squad.name}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="caption" fontWeight="bold" color="text.secondary">VIBE MATCH</Typography>
                                            <LinearProgress variant="determinate" value={90} sx={{ width: 60, height: 8, borderRadius: 4, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#F4B400' } }} />
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Typography variant="body2" color="text.secondary">Mission: {squad.genre || "Dominate the Semester"}</Typography>
                                </Paper>

                                <Grid container spacing={2}>
                                    {squad.members.map((member, idx) => (
                                        <Grid item xs={6} sm={4} key={member.id || idx}>
                                            <Paper variant="elevation" elevation={2} sx={{
                                                p: 2,
                                                textAlign: 'center',
                                                borderRadius: 3,
                                                transition: 'transform 0.2s',
                                                cursor: 'pointer',
                                                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }
                                            }}>
                                                <Avatar src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} sx={{ width: 50, height: 50, mx: 'auto', mb: 1, border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                                                <Typography variant="subtitle2" fontWeight="bold" noWrap>{member.name}</Typography>
                                                <Typography variant="caption" display="block" color="text.secondary" noWrap>Lvl {Math.floor(Math.random() * 5) + 1}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                    <Button variant="contained" fullWidth onClick={() => navigate('/quests')} sx={{ borderRadius: 3, fontWeight: 'bold', background: 'linear-gradient(45deg, #FF6F00, #FFCA28)' }}>
                                        View Active Quests ⚔️
                                    </Button>
                                    {/* Anonymous Help Button */}
                                    <Button variant="outlined" sx={{ borderRadius: 3, textTransform: 'none' }} onClick={() => alert("Anonymous Help Mode: Coming Soon! Your squad can help without revealing your identity.")}>
                                        Ask Anonymously 🕵️
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Quest/Stats Sidebar */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', bgcolor: '#e8f0fe' }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">Your Journey</Typography>

                        {/* Interactive Journey Map */}
                        <JourneyMap level={stats.level} />

                        <Box sx={{ my: 3, textAlign: 'center' }}>
                            <Typography variant="h3" fontWeight="bold">
                                {stats.xp || 0}
                            </Typography>
                            <Typography variant="caption" fontWeight="bold">TOTAL XP</Typography>
                        </Box>

                        {/* Badges Section */}
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>Badges & Achievements</Typography>
                        <Grid container spacing={1}>
                            {stats.badges?.map((badge) => (
                                <Grid item xs={4} key={badge.id}>
                                    <Tooltip title={`${badge.name}: ${badge.requirement}`} arrow>
                                        <Paper sx={{
                                            p: 1,
                                            textAlign: 'center',
                                            filter: badge.unlocked ? 'none' : 'grayscale(100%)',
                                            opacity: badge.unlocked ? 1 : 0.6,
                                            bgcolor: badge.unlocked ? '#fff8e1' : '#f5f5f5'
                                        }}>
                                            <Typography variant="h5">{badge.icon}</Typography>
                                            <Typography variant="caption" display="block" sx={{ fontSize: '0.6rem', lineHeight: 1 }}>{badge.name}</Typography>
                                        </Paper>
                                    </Tooltip>
                                </Grid>
                            ))}
                        </Grid>

                        <Button variant="outlined" fullWidth onClick={() => navigate('/journal')} sx={{ mt: 4 }}>
                            View Learning Journal
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Floating AI Buddy */}
            <AIBuddy level={stats.level} />
        </Box>
    );
};

export default Dashboard;
