import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, Chip, useTheme, useMediaQuery } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { useExamMode } from '../context/ExamModeContext';
import { useThemeMode } from '../theme/ThemeContext';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import AIBuddy from './AIBuddy';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { stats, user } = useGamification();
    const { examMode, toggleExamMode } = useExamMode();
    const { mode, toggleTheme } = useThemeMode();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        { label: 'Quests', path: '/quests', icon: <ExploreIcon /> },
        { label: 'Squads', path: '/dashboard', icon: <GroupsIcon />, hash: '#squads' }, // Temporary link back to dashboard section
        { label: 'Progress', path: '/journal', icon: <TimelineIcon /> },
        { label: 'Exam Mode', action: toggleExamMode, icon: <SchoolIcon />, active: examMode }
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation Bar */}
            <AppBar position="sticky" elevation={0} sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                backdropFilter: 'blur(20px)',
                background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'
            }}>
                <Toolbar sx={{ justifyContent: 'space-between', height: 70 }}>
                    {/* Logo Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                        }}>
                            <Typography variant="h5" fontWeight="900" sx={{ color: 'white' }}>C</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="800" sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.primary' }}>
                            CoLearn Arena
                        </Typography>
                    </Box>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                            {navItems.map((item, index) => (
                                item.action ? (
                                    <Button
                                        key={index}
                                        startIcon={item.icon}
                                        onClick={item.action}
                                        sx={{
                                            color: item.active ? 'error.main' : 'text.secondary',
                                            bgcolor: item.active ? 'error.light' : 'transparent',
                                            fontWeight: 700,
                                            px: 2,
                                            borderRadius: 3,
                                            '&:hover': { bgcolor: item.active ? 'error.main' : 'action.hover', color: item.active ? 'white' : 'primary.main' }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ) : (
                                    <Button
                                        key={index}
                                        startIcon={item.icon}
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                                            fontWeight: 700,
                                            px: 2,
                                            borderRadius: 3,
                                            bgcolor: location.pathname === item.path ? 'primary.light' : 'transparent',
                                            '&:hover': { bgcolor: 'action.hover', color: 'primary.main' }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                )
                            ))}
                        </Box>
                    )}

                    {/* User Profile & Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                        {/* Gamification Stats (Desktop) */}
                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 2, bgcolor: 'background.default', p: 0.5, px: 2, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                            {/* Coins */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="body2" fontWeight="bold" sx={{ color: '#fbbf24' }}>{stats.coins}</Typography>
                                <Box component="span" sx={{ color: '#fbbf24', fontSize: '1.2rem' }}>🪙</Box>
                            </Box>

                            <Box sx={{ width: 1, height: 20, bgcolor: 'divider' }} />

                            {/* Energy */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="body2" fontWeight="bold" sx={{ color: '#10b981' }}>{stats.energy}%</Typography>
                                <Box component="span" sx={{ color: '#10b981', fontSize: '1.2rem' }}>⚡</Box>
                            </Box>

                            <Box sx={{ width: 1, height: 20, bgcolor: 'divider' }} />

                            {/* Streak */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="body2" fontWeight="bold" sx={{ color: '#f97316' }}>{stats.streak}</Typography>
                                <Box component="span" sx={{ color: '#f97316', fontSize: '1.2rem' }}>🔥</Box>
                            </Box>
                        </Box>

                        {/* XP Chip */}
                        <Chip
                            icon={<EmojiEventsIcon sx={{ color: '#fbbf24 !important' }} />}
                            label={`${stats.xp} XP`}
                            sx={{
                                fontWeight: 900,
                                display: { xs: 'none', sm: 'flex' },
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        />

                        {/* Theme Toggle */}
                        <IconButton onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
                            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>

                        {/* Profile Avatar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                                <Avatar
                                    src={user?.photoURL}
                                    sx={{
                                        bgcolor: 'secondary.main',
                                        fontWeight: 'bold',
                                        border: '2px solid',
                                        borderColor: 'primary.main'
                                    }}
                                >
                                    {stats.level}
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => { handleClose(); navigate('/journal'); }}>
                                    <Typography fontWeight="bold">My Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => { handleClose(); toggleExamMode(); }}>
                                    <Typography fontWeight="bold" color={examMode ? 'error' : 'inherit'}>
                                        {examMode ? 'Exit Exam Mode' : 'Enter Exam Mode'}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                    <Typography fontWeight="bold">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, maxWidth: '1600px', mx: 'auto', width: '100%' }}>
                <Outlet />
            </Box>

            {/* Global AI Assistant */}
            <AIBuddy level={stats.level} />
        </Box>
    );
};

export default Layout;
