import React from 'react';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(motion(Paper))(({ theme, hover, intensity = 1 }) => ({
    background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, rgba(255,255,255,${0.05 * intensity}) 0%, rgba(255,255,255,${0.02 * intensity}) 100%)`
        : `linear-gradient(135deg, rgba(255,255,255,${0.8 * intensity}) 0%, rgba(255,255,255,${0.4 * intensity}) 100%)`,
    backdropFilter: `blur(${20 * intensity}px)`,
    WebkitBackdropFilter: `blur(${20 * intensity}px)`,
    border: theme.palette.mode === 'dark'
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid rgba(255,255,255,0.3)',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    transition: 'border 0.3s ease',
    ...(hover && {
        '&:hover': {
            border: `1px solid ${theme.palette.primary.main}44`,
        }
    })
}));

const GlassCard = ({ children, sx, hover = true, intensity = 1, delay = 0, ...props }) => {
    return (
        <StyledPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            intensity={intensity}
            hover={hover}
            sx={sx}
            {...props}
        >
            {/* Subtle Inner Glow */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                pointerEvents: 'none'
            }} />
            {children}
        </StyledPaper>
    );
};

export default GlassCard;
