import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, TextField, IconButton, Avatar, CircularProgress, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, limit, serverTimestamp } from 'firebase/firestore';

const SquadChat = ({ squadId, currentUser, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!squadId) return;

        const messagesRef = collection(db, 'squads', squadId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(50));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
            setLoading(false);
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 100);
        });

        return () => unsubscribe();
    }, [squadId]);

    const handleSend = async () => {
        if (!input.trim() || !squadId) return;

        const msgData = {
            text: input,
            senderId: currentUser.uid,
            senderName: currentUser.displayName || 'Hero',
            senderAvatar: currentUser.photoURL,
            createdAt: serverTimestamp()
        };

        setInput('');
        try {
            await addDoc(collection(db, 'squads', squadId, 'messages'), msgData);
        } catch (error) {
            console.error("Scale Chat Error:", error);
        }
    };

    return (
        <Fade in timeout={400}>
            <Paper sx={{
                width: { xs: '100%', sm: 400 },
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 6,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                position: 'relative'
            }}>
                <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="900">Squad Comms</Typography>
                    <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box ref={scrollRef} sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5, bgcolor: 'background.default' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress size={20} /></Box>
                    ) : (
                        messages.map((msg) => (
                            <Box key={msg.id} sx={{
                                alignSelf: msg.senderId === currentUser.uid ? 'flex-end' : 'flex-start',
                                maxWidth: '80%'
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: msg.senderId === currentUser.uid ? 'row-reverse' : 'row', gap: 1, alignItems: 'flex-end' }}>
                                    <Avatar src={msg.senderAvatar} sx={{ width: 24, height: 24 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ ml: msg.senderId === currentUser.uid ? 0 : 0.5, opacity: 0.7, fontWeight: 700, fontSize: '0.65rem' }}>
                                            {msg.senderName}
                                        </Typography>
                                        <Paper sx={{
                                            p: 1.5,
                                            borderRadius: 3,
                                            borderTopLeftRadius: msg.senderId === currentUser.uid ? 3 : 0,
                                            borderTopRightRadius: msg.senderId === currentUser.uid ? 0 : 3,
                                            bgcolor: msg.senderId === currentUser.uid ? 'secondary.main' : 'background.paper',
                                            color: msg.senderId === currentUser.uid ? 'white' : 'text.primary',
                                        }}>
                                            <Typography variant="body2">{msg.text}</Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>

                <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <TextField
                        fullWidth
                        placeholder="Type a message..."
                        size="small"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleSend} disabled={!input.trim()} color="secondary">
                                    <SendIcon />
                                </IconButton>
                            ),
                            sx: { borderRadius: 4, bgcolor: 'background.default' }
                        }}
                    />
                </Box>
            </Paper>
        </Fade>
    );
};

export default SquadChat;
