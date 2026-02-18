'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Typography, Paper, Box, Button, Divider, CircularProgress, Grid } from '@mui/material';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function DoctorDashboardPage() {
    const { user, isLoaded } = useUser();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded) return;

        Promise.all([
            fetch('/api/patients').then(r => r.json()),
            fetch('/api/consultations').then(r => r.json()),
            fetch('/api/support').then(r => r.json()),
            fetch('/api/medications').then(r => r.json()),
        ]).then(([patRes, consRes, supRes, medRes]) => {
            const now = new Date();
            const upcoming = (consRes.consultations || []).filter(
                (c: any) => c.status === 'scheduled' && new Date(c.scheduled_at) >= now
            );
            const openTickets = (supRes.tickets || []).filter(
                (t: any) => t.status === 'open' || t.status === 'in_progress'
            );
            const pendingDeliveries = (medRes.medications || []).filter(
                (m: any) => m.is_active && m.delivery_status !== 'delivered'
            );

            setStats({
                totalPatients: (patRes.patients || []).length,
                upcomingConsultations: upcoming.length,
                openTickets: openTickets.length,
                pendingDeliveries: pendingDeliveries.length,
                recentPatients: (patRes.patients || []).slice(0, 5),
                nextConsultations: upcoming.slice(0, 3),
            });
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [isLoaded]);

    if (!isLoaded || loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Welcome, Dr. {user?.firstName || 'Doctor'}
            </Typography>

            {/* Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <PeopleIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">{stats?.totalPatients || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Total Patients</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <VideoCameraFrontIcon color="warning" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">{stats?.upcomingConsultations || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Upcoming Consults</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <LocalShippingIcon color="info" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">{stats?.pendingDeliveries || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Pending Deliveries</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <SupportAgentIcon color="error" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">{stats?.openTickets || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Open Tickets</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Upcoming Consultations */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Upcoming Consultations</Typography>
                        <Divider sx={{ mb: 2 }} />
                        {(stats?.nextConsultations || []).length === 0 ? (
                            <Typography variant="body2" color="text.secondary">No upcoming consultations.</Typography>
                        ) : (
                            stats.nextConsultations.map((c: any) => (
                                <Box key={c.id} sx={{ mb: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
                                    <Typography variant="body1" fontWeight="bold">{c.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(c.scheduled_at).toLocaleString()} · {c.consultation_type} · {c.duration_minutes}min
                                    </Typography>
                                </Box>
                            ))
                        )}
                    </Paper>
                </Grid>

                {/* Quick Actions */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Button component={Link} href="/doctor/patients" variant="outlined" startIcon={<PeopleIcon />} fullWidth>
                                View All Patients
                            </Button>
                            <Button component={Link} href="/doctor/support" variant="outlined" startIcon={<SupportAgentIcon />} fullWidth>
                                Support Tickets
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
