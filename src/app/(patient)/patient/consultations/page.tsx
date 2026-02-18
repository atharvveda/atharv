'use client';

import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Chip, CircularProgress, Divider, Grid, Card, CardContent, Button } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const statusColors: Record<string, 'warning' | 'success' | 'error' | 'default'> = {
    scheduled: 'warning',
    completed: 'success',
    cancelled: 'error',
};

export default function ConsultationsPage() {
    const [consultations, setConsultations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/consultations')
            .then(r => r.json())
            .then(data => {
                setConsultations(data.consultations || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    const now = new Date();
    const upcoming = consultations.filter(c => c.status === 'scheduled' && new Date(c.scheduled_at) >= now);
    const past = consultations.filter(c => c.status === 'completed' || (c.status === 'scheduled' && new Date(c.scheduled_at) < now));
    const cancelled = consultations.filter(c => c.status === 'cancelled');

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                My Consultations
            </Typography>

            {consultations.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                        <VideoCameraFrontIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No consultations yet.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your doctor will schedule consultations for you.
                        </Typography>
                    </Box>
                </Paper>
            ) : (
                <>
                    {/* Upcoming */}
                    {upcoming.length > 0 && (
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarTodayIcon color="warning" /> Upcoming Consultations
                            </Typography>
                            <Grid container spacing={2}>
                                {upcoming.map((c: any) => (
                                    <Grid size={{ xs: 12, md: 6 }} key={c.id}>
                                        <Card sx={{ borderLeft: '4px solid #ff9800' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="h6">{c.title}</Typography>
                                                    <Chip label={c.status} color={statusColors[c.status]} size="small" />
                                                </Box>
                                                {c.description && <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{c.description}</Typography>}
                                                <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                                                    <Chip icon={<CalendarTodayIcon />} label={new Date(c.scheduled_at).toLocaleDateString()} size="small" variant="outlined" />
                                                    <Chip icon={<AccessTimeIcon />} label={new Date(c.scheduled_at).toLocaleTimeString()} size="small" variant="outlined" />
                                                    <Chip label={`${c.duration_minutes} min`} size="small" variant="outlined" />
                                                    <Chip label={c.consultation_type} size="small" color="primary" variant="outlined" />
                                                </Box>
                                                {c.meeting_link && (
                                                    <Button href={c.meeting_link} target="_blank" variant="contained" size="small" sx={{ mt: 2 }}>
                                                        Join Meeting
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {/* Past */}
                    {past.length > 0 && (
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleIcon color="success" /> Past Consultations
                            </Typography>
                            <Grid container spacing={2}>
                                {past.map((c: any) => (
                                    <Grid size={{ xs: 12, md: 6 }} key={c.id}>
                                        <Card sx={{ borderLeft: '4px solid #4caf50', opacity: 0.85 }}>
                                            <CardContent>
                                                <Typography variant="h6">{c.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {new Date(c.scheduled_at).toLocaleString()}
                                                </Typography>
                                                {c.doctor_remarks && (
                                                    <Box sx={{ mt: 1, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                        <Typography variant="body2"><strong>Doctor&apos;s Remarks:</strong> {c.doctor_remarks}</Typography>
                                                    </Box>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {/* Cancelled */}
                    {cancelled.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom color="text.secondary">Cancelled</Typography>
                            {cancelled.map((c: any) => (
                                <Paper key={c.id} sx={{ p: 2, mb: 1, opacity: 0.6 }}>
                                    <Typography>{c.title} — {new Date(c.scheduled_at).toLocaleDateString()}</Typography>
                                </Paper>
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
