'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Typography, Paper, Box, Button, Divider, Chip, CircularProgress, Grid, Avatar } from '@mui/material';
import Link from 'next/link';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MedicationIcon from '@mui/icons-material/Medication';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface DashboardStats {
    upcomingConsultations: number;
    activeMedications: number;
    pendingDeliveries: number;
    openTickets: number;
    nextConsultation: any;
    profile: any;
}

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded || !user) return;

        // Fetch all stats + profile in parallel
        Promise.all([
            fetch('/api/consultations').then(r => r.json()),
            fetch('/api/medications').then(r => r.json()),
            fetch('/api/support').then(r => r.json()),
            fetch('/api/patients/register', { // This returns profile
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Patient',
                    email: user.primaryEmailAddress?.emailAddress,
                })
            }).then(r => r.json())
        ]).then(([consRes, medRes, supRes, profRes]) => {
            const now = new Date();
            const upcoming = (consRes.consultations || []).filter(
                (c: any) => c.status === 'scheduled' && new Date(c.scheduled_at) >= now
            );
            const activeMeds = (medRes.medications || []).filter((m: any) => m.is_active);
            const pendingDeliveries = activeMeds.filter((m: any) => m.delivery_status !== 'delivered');
            const openTickets = (supRes.tickets || []).filter((t: any) => t.status === 'open' || t.status === 'in_progress');

            setStats({
                upcomingConsultations: upcoming.length,
                activeMedications: activeMeds.length,
                pendingDeliveries: pendingDeliveries.length,
                openTickets: openTickets.length,
                nextConsultation: upcoming[0] || null,
                profile: profRes.patient || null
            });
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [isLoaded, user]);

    if (!isLoaded || loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    const genderAvatar = stats?.profile?.gender === 'Female'
        ? 'https://avatar.iran.liara.run/public/girl'
        : 'https://avatar.iran.liara.run/public/boy';

    return (
        <Box>
            {/* Header with Avatar */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                    src={genderAvatar}
                    sx={{ width: 80, height: 80, border: '4px solid white', boxShadow: 2 }}
                />
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary.main">
                        Welcome, {user?.firstName || 'Patient'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Overall Health Summary & Active Treatment
                    </Typography>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <VideoCameraFrontIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">{stats?.upcomingConsultations || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Upcoming Consults</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <MedicationIcon color="secondary" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">{stats?.activeMedications || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Active Medications</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <LocalShippingIcon color="warning" sx={{ fontSize: 36, mb: 1 }} />
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
                {/* Clinical Summary */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                            <HealthAndSafetyIcon color="primary" /> My Health Records
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Primary Condition</Typography>
                                <Typography variant="body1" fontWeight="500">{stats?.profile?.health_condition || 'Not specified'}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" color="text.secondary">Other Conditions</Typography>
                                <Typography variant="body1">{stats?.profile?.other_health_conditions || 'None recorded'}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Divider sx={{ my: 1, borderStyle: 'dotted' }} />
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Family History</Typography>
                                <Typography variant="body1">{stats?.profile?.family_history || 'Not shared'}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Hospitalization History</Typography>
                                <Typography variant="body1">{stats?.profile?.hospitalization_history || 'None recorded'}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Next Consultation</Typography>
                        <Divider sx={{ mb: 2 }} />
                        {stats?.nextConsultation ? (
                            <Box>
                                <Typography variant="body1" fontWeight="bold">{stats.nextConsultation.title}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                    <CalendarTodayIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(stats.nextConsultation.scheduled_at).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={stats.nextConsultation.consultation_type}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ mt: 1 }}
                                />
                                {stats.nextConsultation.meeting_link && (
                                    <Button
                                        href={stats.nextConsultation.meeting_link}
                                        target="_blank"
                                        variant="contained"
                                        size="small"
                                        sx={{ mt: 2, display: 'block' }}
                                    >
                                        Join Meeting
                                    </Button>
                                )}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary">No upcoming consultations scheduled.</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Quick Actions */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Quick Navigation</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Button component={Link} href="/patient/diet" variant="outlined" startIcon={<RestaurantMenuIcon />} fullWidth sx={{ justifyContent: 'flex-start' }}>
                                My Diet Plan
                            </Button>
                            <Button component={Link} href="/patient/medications" variant="outlined" startIcon={<MedicationIcon />} fullWidth sx={{ justifyContent: 'flex-start' }}>
                                Prescribed Medications
                            </Button>
                            <Button component={Link} href="/patient/consultations" variant="outlined" startIcon={<VideoCameraFrontIcon />} fullWidth sx={{ justifyContent: 'flex-start' }}>
                                Visit History
                            </Button>
                            <Button component={Link} href="/patient/support" variant="outlined" startIcon={<SupportAgentIcon />} fullWidth sx={{ justifyContent: 'flex-start' }}>
                                Help & Support
                            </Button>
                        </Box>
                        <Box sx={{ mt: 4, p: 2, bgcolor: 'primary.light', borderRadius: 2, opacity: 0.8 }}>
                            <Typography variant="caption" color="primary.contrastText" sx={{ display: 'block', fontWeight: 'bold' }}>
                                NOTICE
                            </Typography>
                            <Typography variant="caption" color="primary.contrastText">
                                Your records are managed by your treating physician. Contact support for any profile updates.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
