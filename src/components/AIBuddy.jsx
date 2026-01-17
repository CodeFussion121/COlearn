import React, { useState, useRef, useEffect } from 'react';
import useGemini from '../hooks/useGemini';
import { Box, Fab, Paper, Typography, Fade, IconButton, TextField, Avatar, CircularProgress, Chip, Drawer } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import BoltIcon from '@mui/icons-material/Bolt';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

const AIBuddy = ({ level }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hey! I'm your Grid Guide. I'm here to help you crush your study goals and squads missions. Stuck on a concept or need a quest idea?" }
    ]);
    const { askGemini, loading } = useGemini();
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            // System Prompt Context
            const systemContext = "You are a calm study commander (Omnis AI) for a gamified learning platform. You guide, nudge, and recommend. You never overwhelm. You focus on one improvement at a time. Keep responses concise (under 50 words).";

            const prompt = `${systemContext}\n\nUser: ${input}\nOmnis AI:`;

            const result = await askGemini(prompt);

            if (result) {
                const botMsg = { role: 'assistant', content: result };
                setMessages(prev => [...prev, botMsg]);
            }
        } catch (error) {
            console.error("Bot Error:", error);
        }
    };

    return (
        <>
            {/* Docked Trigger Button */}
            <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Fab
                        color="primary"
                        aria-label="ai-buddy"
                        onClick={() => setOpen(true)}
                        sx={{
                            width: 56,
                            height: 56,
                            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        }}
                    >
                        <SmartToyIcon />
                    </Fab>
                </motion.div>
            </Box>

            {/* Side Panel Drawer */}
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 400 },
                        bgcolor: 'background.default',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        backgroundImage: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.98))',
                        backdropFilter: 'blur(20px)'
                    }
                }}
            >
                {/* Header */}
                <Box sx={{
                    p: 3,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' }}>
                            <SmartToyIcon />
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="900">OMNIS AI</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }} />
                                <Typography variant="caption" color="text.secondary" fontWeight="700">SYSTEM ONLINE</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Chat Content */}
                <Box ref={scrollRef} sx={{
                    flexGrow: 1,
                    p: 3,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    {messages.map((msg, i) => (
                        <Box key={i} sx={{ alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
                            <Paper elevation={0} sx={{
                                p: 2,
                                borderRadius: 3,
                                borderTopLeftRadius: msg.role === 'assistant' ? 0 : 12,
                                borderTopRightRadius: msg.role === 'user' ? 0 : 12,
                                bgcolor: msg.role === 'assistant' ? 'rgba(255,255,255,0.05)' : 'primary.main',
                                color: msg.role === 'assistant' ? 'text.primary' : 'white',
                                border: '1px solid',
                                borderColor: msg.role === 'assistant' ? 'rgba(255,255,255,0.05)' : 'primary.main'
                            }}>
                                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{msg.content}</Typography>
                            </Paper>
                        </Box>
                    ))}
                    {loading && (
                        <Box sx={{ alignSelf: 'flex-start', ml: 1 }}>
                            <Typography variant="caption" color="text.secondary">Omnis is typing...</Typography>
                        </Box>
                    )}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <TextField
                        fullWidth
                        placeholder="Ask for guidance..."
                        variant="outlined"
                        size="small"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        InputProps={{
                            sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' },
                            endAdornment: (
                                <IconButton onClick={handleSend} disabled={!input.trim()} color="primary" size="small">
                                    <SendIcon />
                                </IconButton>
                            )
                        }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, '::-webkit-scrollbar': { display: 'none' } }}>
                        {['Where do I start?', 'Find me a quest', 'Explain this concept'].map((label) => (
                            <Chip
                                key={label}
                                label={label}
                                onClick={() => setInput(label)}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default AIBuddy;
