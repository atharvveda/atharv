'use client';
import { useState, useEffect } from 'react';
import { Typography, Paper, Box, alpha, Avatar, CircularProgress, TextField, InputAdornment, Button, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

export default function DoctorDocumentVault() {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('/api/patients')
            .then(r => r.json())
            .then(data => {
                setPatients(data.patients || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredPatients = patients.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress color="success" />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="800" sx={{ color: '#1B5E20', mb: 1 }}>
                    Patient Clinical Records
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Access and manage documents uploaded by patients across the platform.
                </Typography>
            </Box>

            <Box sx={{ mb: 4, maxWidth: 500 }}>
                <TextField
                    fullWidth
                    placeholder="Search patients by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 3, bgcolor: 'white' }
                    }}
                />
            </Box>

            {/* "ALTERNATE GRID" - Using Flexbox for the card layout */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
                {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                        <Paper
                            key={patient.id}
                            sx={{
                                width: { xs: '100%', sm: 300 },
                                p: 3,
                                borderRadius: 4,
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(0,0,0,0.05)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                                    borderColor: alpha('#1B5E20', 0.2),
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: alpha('#1B5E20', 0.1),
                                        color: '#1B5E20',
                                        width: 50,
                                        height: 50
                                    }}
                                >
                                    <AccountCircleIcon />
                                </Avatar>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="subtitle1" fontWeight="700" noWrap>
                                        {patient.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                                        {patient.email || 'No email provided'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 2, opacity: 0.6 }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <FolderSharedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                                <Typography variant="body2" color="text.secondary" fontWeight="500">
                                    Patient ID: {patient.clerk_id.slice(-8)}
                                </Typography>
                            </Box>

                            <Button
                                component={Link}
                                href={`/doctor/patient/${patient.clerk_id}`}
                                fullWidth
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: alpha('#1B5E20', 0.05),
                                    color: '#1B5E20',
                                    borderRadius: 2.5,
                                    fontWeight: '700',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#1B5E20',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(27, 94, 32, 0.2)'
                                    }
                                }}
                            >
                                View Documents
                            </Button>

                            {/* Decorative Background Icon */}
                            <DescriptionIcon
                                sx={{
                                    position: 'absolute',
                                    bottom: -15,
                                    right: -15,
                                    fontSize: 80,
                                    opacity: 0.03,
                                    transform: 'rotate(-15deg)'
                                }}
                            />
                        </Paper>
                    ))
                ) : (
                    <Box sx={{ py: 8, textAlign: 'center', width: '100%' }}>
                        <Typography color="text.secondary">No patients found matching "{search}"</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
