import React from 'react';
import { Box, Typography, Grid, Avatar, Button, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import BoltIcon from '@mui/icons-material/Bolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarIcon from '@mui/icons-material/Star';

import { useSquad } from '../context/SquadContext';
import { useGamification } from '../context/GamificationContext';
import useSEO from '../hooks/useSEO';

import GlassCard from '../components/GlassCard';
import FocusZone from '../components/FocusZone';
import DailyWinCard from '../components/DailyWinCard';
import LiveTicker from '../components/LiveTicker';
import JourneyMap from '../components/JourneyMap';
import WorldMap from '../components/WorldMap';
import Leaderboard from '../components/Leaderboard';
import SmartNudge from '../components/SmartNudge';
import AchievementShowcase from '../components/AchievementShowcase';
import RecentActivity from '../components/RecentActivity';
import ScheduleMeeting from '../components/ScheduleMeeting';

const Dashboard = () => {
    const navigate = useNavigate();
    useSEO('HQ Command', 'Central command dashboard for your mission progress.');
    const { squad } = useSquad();
    const { user } = useGamification();

    return (
        <Box sx={{ minHeight: '100vh', pt: { xs: 2, md: 4 }, pb: 8, px: { xs: 2, md: 4 }, maxWidth: '1600px', mx: 'auto' }}>

            {/* Welcome Header Section */}
            <Box sx={{ mb: 5 }}>
                <Typography
                    variant="h3"
                    fontWeight="900"
                    sx={{
                        mb: 1,
                        background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: -1
                    }}
                >
                    Welcome back, {user?.name || "Cadet"}! 🚀
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Your command center is ready. Track your progress, complete missions, and dominate the leaderboard.
                </Typography>

                {/* Quick Stats Overview */}
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                <StarIcon sx={{ color: '#fbbf24', fontSize: 20 }} />
                                <Typography variant="h5" fontWeight="900">{user?.xp || 0}</Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight="600">Total XP</Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                <TrendingUpIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                                <Typography variant="h5" fontWeight="900">{user?.level || 1}</Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight="600">Level</Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                <LocalFireDepartmentIcon sx={{ color: '#f97316', fontSize: 20 }} />
                                <Typography variant="h5" fontWeight="900">{user?.streak || 0}</Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight="600">Day Streak</Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                <EmojiEventsIcon sx={{ color: '#10b981', fontSize: 20 }} />
                                <Typography variant="h5" fontWeight="900">{user?.achievements?.length || 0}</Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" fontWeight="600">Achievements</Typography>
                        </GlassCard>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                {/* --- LEFT PANEL: IDENTITY & PROGRESS (3 Cols) --- */}
                <Grid item xs={12} lg={3}>
                    <Box sx={{ position: { lg: 'sticky' }, top: 100, display: 'flex', flexDirection: 'column', gap: 3 }}>

                        {/* Enhanced Identity Card */}
                        <GlassCard sx={{ p: 0, overflow: 'hidden' }}>
                            {/* Header Gradient */}
                            <Box sx={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
                                p: 3,
                                textAlign: 'center'
                            }}>
                                <Avatar
                                    src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        border: '4px solid rgba(255,255,255,0.3)',
                                        mx: 'auto',
                                        mb: 1.5,
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                    }}
                                />
                                <Typography variant="h6" fontWeight="900" sx={{ color: 'white', mb: 0.5 }}>
                                    {user?.name || "Cadet"}
                                </Typography>
                                <Chip
                                    label={`Level ${user?.level || 1} Warrior`}
                                    size="small"
                                    sx={{
                                        fontWeight: 800,
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                />
                            </Box>

                            {/* Stats Section */}
                            <Box sx={{ p: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="600">Progress to Next Level</Typography>
                                    <Typography variant="body2" fontWeight="800" color="primary.main">
                                        {Math.round(((user?.xp || 0) % 1000) / 10)}%
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    height: 10,
                                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    <Box sx={{
                                        width: `${((user?.xp || 0) % 1000) / 10}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #6366f1, #10b981)',
                                        transition: 'width 0.5s ease',
                                        boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '50%',
                                            background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent)',
                                            borderRadius: 5
                                        }
                                    }} />
                                </Box>
                            </Box>
                        </GlassCard>

                        {/* Journey Progress */}
                        <GlassCard sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    bgcolor: 'primary.main',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)'
                                }} />
                                <Typography variant="overline" color="text.secondary" fontWeight="800" sx={{ letterSpacing: 1.5 }}>
                                    CURRENT OPERATION
                                </Typography>
                            </Box>
                            <JourneyMap level={user?.level || 1} />
                        </GlassCard>

                        {/* Squad Quick Access */}
                        <GlassCard sx={{ p: 0, overflow: 'hidden' }}>
                            <Box sx={{
                                p: 2.5,
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <GroupsIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                                <Typography variant="overline" color="text.secondary" fontWeight="800" sx={{ letterSpacing: 1.5 }}>
                                    ACTIVE SQUAD
                                </Typography>
                            </Box>
                            {squad ? (
                                <Box sx={{ p: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">{squad.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {squad.members?.length || 4} members active
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            width: 10,
                                            height: 10,
                                            bgcolor: '#10b981',
                                            borderRadius: '50%',
                                            boxShadow: '0 0 12px #10b981',
                                            animation: 'pulse 2s infinite'
                                        }} />
                                    </Box>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={<GroupsIcon />}
                                        onClick={() => navigate('/squad')}
                                        sx={{
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            fontWeight: 800
                                        }}
                                    >
                                        Enter Huddle
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Join a squad to collaborate and compete together.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="small"
                                        onClick={() => navigate('/squad')}
                                        sx={{ fontWeight: 700 }}
                                    >
                                        Find Squad
                                    </Button>
                                </Box>
                            )}
                        </GlassCard>

                    </Box>
                </Grid>

                {/* --- CENTER PANEL: MISSION COMMAND (6 Cols) --- */}
                <Grid item xs={12} lg={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                        {/* Section Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1 }}>
                            <BoltIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
                            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -0.5 }}>
                                Mission Command Center
                            </Typography>
                        </Box>

                        {/* 1. Daily Mission (Primary Hero) */}
                        <DailyWinCard />

                        {/* 2. Live Activity Strip */}
                        <LiveTicker />

                        {/* 3. Focus Zone (Productivity Tool) */}
                        <FocusZone />

                        {/* 4. World Map (Secondary Zone) */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, px: 1 }}>
                                <BoltIcon sx={{ color: '#f97316', fontSize: 20 }} />
                                <Typography variant="overline" color="text.secondary" fontWeight="800" sx={{ letterSpacing: 2 }}>
                                    GLOBAL OPERATIONS
                                </Typography>
                            </Box>
                            <WorldMap />
                        </Box>

                    </Box>
                </Grid>

                {/* --- RIGHT PANEL: SOCIAL INTEL (3 Cols) --- */}
                <Grid item xs={12} lg={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                        {/* Section Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1 }}>
                            <EmojiEventsIcon sx={{ color: '#fbbf24', fontSize: 24 }} />
                            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -0.5 }}>
                                Social Hub
                            </Typography>
                        </Box>

                        {/* Squad Meeting Scheduler */}
                        <ScheduleMeeting />

                        {/* Leaderboard (Social Proof) */}
                        <Leaderboard />

                        {/* Achievement Showcase */}
                        <AchievementShowcase />

                        {/* Recent Activity */}
                        <RecentActivity />

                        {/* Smart Nudge (Context) */}
                        <SmartNudge />

                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default Dashboard;
