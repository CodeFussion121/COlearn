import React from 'react';
import { Box, Button, Typography, Paper, Container } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulating Google Login
        // In real app, this would be Firebase Auth signInWithPopup
        localStorage.setItem('isAuthenticated', 'true');
        // Set a mock user
        const mockUser = {
            name: 'Anshul Patidar',
            email: 'anshul@example.com',
            avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gj...', // simulated
            branch: 'CSE',
            year: '3rd Year',
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        // For Gamified Flow: Redirect to Onboarding first
        navigate('/onboarding');
    };

    return (
        <Container maxWidth="sm" sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Paper elevation={3} sx={{
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                borderRadius: 4,
                textAlign: 'center'
            }}>
                <Typography variant="h3" color="primary" fontWeight="bold">
                    Guidex
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Your Collaborative Learning Universe. <br />
                    Join squads, solve quests, and level up together.
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<GoogleIcon />}
                        onClick={handleLogin}
                        sx={{
                            borderColor: '#dadce0',
                            color: '#3c4043',
                            py: 1.5,
                            px: 3,
                            '&:hover': {
                                borderColor: '#d2e3fc',
                                backgroundColor: 'rgba(66, 133, 244, 0.04)',
                            }
                        }}
                    >
                        Sign in with Google
                    </Button>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
                    Protected by reCAPTCHA and the Google Privacy Policy.
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
