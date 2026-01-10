import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ConstructionIcon from '@mui/icons-material/Construction'; // For Fix-a-Friend/Tools
import SportsMmaIcon from '@mui/icons-material/SportsMma'; // For Battle/Swords alternative, or use an SVG
// Note: standard MUI icons might not have perfect Swords, using SportsMma (Gloves) or similar as proxy or fallback to relevant standard icons.
// actually let's use:
// Sprint -> FlashOn
// Explain -> Psychology (Brain)
// Fix -> Build (Construction/Tools)
// Battle -> SportsKabaddi or star? Let's use Hardware for Swords? No, let's use Gavel for battle? Or FlashOff.
// Let's stick to closest:
// Battle -> Security or PrivacyTip (Shield)? Or just leave as BugReport if it was about bugs. 
// User asked for "Battle -> ⚔️". MUI doesn't have Swords. Let's use 'Security' or 'Warning' for now or 'SportsEsports'.
// Actually, let's use "Gavel" (Authority/Battle) or just stick to a generic "Star". 
// Wait, I can import specific paths if needed, but sticking to MUI icons:
// Psychology = Brain
// Build = Tools
// FlashOn = Sprint
// SportsMma = Battle? Or maybe 'Fort' (Castle)? 
// Let's use 'SportsEsports' for Battle if it's code battle.
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuestCard = ({ quest }) => {
    const navigate = useNavigate();

    const getTypeConfig = (type) => {
        switch (type) {
            case 'Sprint Quest': return { icon: <FlashOnIcon />, color: '#4285F4', gradient: 'linear-gradient(135deg, #4285F4 0%, #2962FF 100%)' };
            case 'Explain Quest': return { icon: <PsychologyIcon />, color: '#0F9D58', gradient: 'linear-gradient(135deg, #0F9D58 0%, #00C853 100%)' };
            case 'Battle Quest': return { icon: <SportsEsportsIcon />, color: '#DB4437', gradient: 'linear-gradient(135deg, #DB4437 0%, #D50000 100%)' };
            case 'Fix-a-Friend': return { icon: <ConstructionIcon />, color: '#F4B400', gradient: 'linear-gradient(135deg, #F4B400 0%, #FFD600 100%)' };
            default: return { icon: <FlashOnIcon />, color: '#5F6368', gradient: 'linear-gradient(135deg, #5F6368 0%, #202124 100%)' };
        }
    };

    const config = getTypeConfig(quest.type);

    return (
        <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                position: 'relative'
            }}>
                {/* Header Strip */}
                <Box sx={{ height: 6, background: config.gradient }} />

                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Chip
                            icon={config.icon}
                            label={quest.type.toUpperCase()}
                            size="small"
                            sx={{
                                fontWeight: 'bold',
                                bgcolor: `${config.color}15`,
                                color: config.color,
                                border: `1px solid ${config.color}30`
                            }}
                        />
                        <Chip label={`${quest.xp} XP`} size="small" sx={{ fontWeight: 'bold', bgcolor: '#FFF8E1', color: '#F57F17' }} />
                    </Box>

                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        {quest.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: 40 }}>
                        {quest.description}
                    </Typography>

                    <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {quest.tags.map(tag => (
                            <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.7rem', bgcolor: '#F1F3F4' }} />
                        ))}
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: 3,
                            background: config.gradient,
                            boxShadow: `0 4px 12px ${config.color}40`,
                            py: 1.2,
                            fontWeight: 'bold',
                            '&:hover': {
                                background: config.gradient,
                                filter: 'brightness(1.1)',
                                boxShadow: `0 6px 16px ${config.color}50`,
                            }
                        }}
                        onClick={() => navigate(`/quest/${quest.id}`)}
                    >
                        Start Quest
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default QuestCard;
