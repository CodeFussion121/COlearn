import React from 'react';
import { Box, Typography, LinearProgress, Paper, Chip, Avatar, Tooltip, IconButton } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { motion } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';

const GamificationBar = () => {
    const { stats, soundEnabled, toggleSound } = useGamification();

    const nextLevelXP = stats.level * 1000;
    const currentLevelBaseXP = (stats.level - 1) * 1000;
    const progress = ((stats.xp - currentLevelBaseXP) / 1000) * 100;

    return (
        <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1200 }}>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 1,
                        pl: 2,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}
                >
                    {/* Level Badge */}
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: '#4285F4', width: 32, height: 32, fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {stats.level}
                        </Avatar>
                    </Box>

                    {/* XP Bar */}
                    <Box sx={{ width: 100 }}>
                        <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Lvl {stats.level}</span>
                            <span>{stats.xp} XP</span>
                        </Typography>
                        <Tooltip title={`${progress.toFixed(0)}% to Level ${stats.level + 1}`} arrow>
                            <LinearProgress
                                variant="determinate"
                                value={progress > 100 ? 100 : progress}
                                sx={{ height: 6, borderRadius: 3, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#F4B400' } }}
                            />
                        </Tooltip>
                    </Box>

                    {/* Streak */}
                    <Chip
                        icon={<LocalFireDepartmentIcon sx={{ color: '#ff7043 !important' }} />}
                        label={stats.streak}
                        sx={{ bgcolor: '#fbe9e7', color: '#d84315', fontWeight: 'bold', borderRadius: 4 }}
                    />

                    {/* Sound Toggle */}
                    <IconButton size="small" onClick={toggleSound}>
                        {soundEnabled ? <VolumeUpIcon fontSize="small" /> : <VolumeOffIcon fontSize="small" />}
                    </IconButton>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default GamificationBar;
