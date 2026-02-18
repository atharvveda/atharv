'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2E7D32', // Soft green (Ayurveda inspired)
            light: '#60AD5E',
            dark: '#005005',
            contrastText: '#fff',
        },
        secondary: {
            main: '#0288D1', // Soft blue
            light: '#5EB8FF',
            dark: '#005B9F',
            contrastText: '#fff',
        },
        background: {
            default: '#F5F5F5', // Light grey background
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2rem', fontWeight: 600 },
        h2: { fontSize: '1.75rem', fontWeight: 600 },
        h3: { fontSize: '1.5rem', fontWeight: 600 },
        h4: { fontSize: '1.25rem', fontWeight: 600 },
        h5: { fontSize: '1rem', fontWeight: 600 },
        h6: { fontSize: '0.875rem', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;
