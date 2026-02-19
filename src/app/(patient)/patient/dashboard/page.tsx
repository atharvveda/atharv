'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
    Typography, Paper, Box, Button, Divider, Chip, CircularProgress,
    Grid, Avatar, Card, CardContent, alpha, useTheme
} from '@mui/material';
import Link from 'next/link';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MedicationIcon from '@mui/icons-material/Medication';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoIcon from '@mui/icons-material/Info';

interface DashboardStats {
    upcomingConsultations: number;
    activeMedications: number;
    pendingDeliveries: number;
    openTickets: number;
    nextConsultation: any;
    profile: any;
}

const StatCard = ({ icon, title, value, color, delay }: { icon: any, title: string, value: number, color: string, delay: string }) => (
    <Card
        sx={{
            height: '100%',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.04)',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                borderColor: alpha(color, 0.3),
            },
            animation: `fadeInUp 0.6s ease forwards ${delay}`,
            opacity: 0,
            '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
            }
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box sx={{
                width: 50,
                height: 50,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(color, 0.1),
                color: color,
                mb: 2.5
            }}>
                {icon}
            </Box>
            <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>{value}</Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="500">{title}</Typography>
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const theme = useTheme();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded || !user) return;

        Promise.all([
            fetch('/api/consultations').then(r => r.json()),
            fetch('/api/medications').then(r => r.json()),
            fetch('/api/support').then(r => r.json()),
            fetch('/api/patients/register', {
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
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
                <CircularProgress size={50} thickness={4} sx={{ color: '#1B5E20' }} />
                <Typography variant="body2" color="text.secondary" sx={{ animate: 'pulse 1.5s infinite', '@keyframes pulse': { '0%': { opacity: 1 }, '50%': { opacity: 0.5 }, '100%': { opacity: 1 } } }}>
                    Analyzing Health Records...
                </Typography>
            </Box>
        );
    }

    const genderAvatar = stats?.profile?.gender === 'Female'
        ? 'https://avatar.iran.liara.run/public/girl'
        : 'https://avatar.iran.liara.run/public/boy';

    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
            {/* Header Section */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 3,
                mb: 6,
                p: { xs: 2.5, sm: 4 },
                borderRadius: 5,
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.04)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar
                        src={genderAvatar}
                        sx={{
                            width: { xs: 70, sm: 90 },
                            height: { xs: 70, sm: 90 },
                            border: '4px solid #fff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            bgcolor: '#f0f4f0'
                        }}
                    >
                        {user?.firstName?.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight="800" sx={{ color: '#1B5E20', mb: 0.5, letterSpacing: -0.5 }}>
                            Welcome back, {user?.firstName || 'Patient'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                            A healthier life starts with small, daily steps.
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<VideoCameraFrontIcon />}
                    component={Link}
                    href="/patient/consultations"
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.2,
                        bgcolor: '#1B5E20',
                        '&:hover': { bgcolor: '#144517' },
                        boxShadow: '0 8px 16px rgba(27, 94, 32, 0.2)'
                    }}
                >
                    Book Appointment
                </Button>
            </Box>

            {/* Quick Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<CalendarTodayIcon />} title="Upcoming Consultations" value={stats?.upcomingConsultations || 0} color="#1B5E20" delay="0s" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<MedicationIcon />} title="Active Medications" value={stats?.activeMedications || 0} color="#E91E63" delay="0.1s" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<LocalShippingIcon />} title="Pending Deliveries" value={stats?.pendingDeliveries || 0} color="#FF9800" delay="0.2s" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<SupportAgentIcon />} title="Support Tickets" value={stats?.openTickets || 0} color="#2196F3" delay="0.3s" />
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {/* Main Content Area */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {/* Health Profile Card */}
                    <Paper sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 5,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        border: '1px solid rgba(0,0,0,0.04)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <HealthAndSafetyIcon sx={{ color: '#1B5E20' }} /> Clinical Summary
                            </Typography>
                            <Chip label="Verified Profile" color="success" size="small" variant="outlined" sx={{ fontWeight: 600, borderRadius: 1.5 }} />
                        </Box>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ p: 2, bgcolor: '#f9fbf9', borderRadius: 3 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', mb: 1, display: 'block' }}>Primary Diagnosis</Typography>
                                    <Typography variant="body1" fontWeight="700" color="primary.dark">{stats?.profile?.health_condition || 'Not specified'}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ p: 2, bgcolor: '#f9fbf9', borderRadius: 3 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', mb: 1, display: 'block' }}>Clinical Status</Typography>
                                    <Typography variant="body1" fontWeight="700" color="success.main">Stable & Active</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, mb: 1, mt: 1 }}>Family Medical History</Typography>
                                <Typography variant="body1" sx={{ color: '#444', fontStyle: stats?.profile?.family_history ? 'normal' : 'italic' }}>
                                    {stats?.profile?.family_history || 'No significant history shared.'}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, mb: 1 }}>Previous Hospitalizations</Typography>
                                <Typography variant="body1" sx={{ color: '#444' }}>
                                    {stats?.profile?.hospitalization_history || 'No previous hospitalization records found.'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Next Consultation Card */}
                    <Paper sx={{
                        p: 4,
                        borderRadius: 5,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        border: '1px solid rgba(0,0,0,0.04)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ position: 'absolute', top: -10, right: -10, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: '50%' }}>
                            <CalendarTodayIcon sx={{ fontSize: 80, color: alpha(theme.palette.primary.main, 0.1) }} />
                        </Box>

                        <Typography variant="h6" fontWeight="700" gutterBottom>Upcoming Consultation</Typography>
                        <Divider sx={{ my: 2.5 }} />

                        {stats?.nextConsultation ? (
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 3 }}>
                                <Box>
                                    <Typography variant="h6" fontWeight="700" sx={{ mb: 1 }}>{stats.nextConsultation.title}</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                        <Chip
                                            icon={<CalendarTodayIcon sx={{ fontSize: '1rem !important' }} />}
                                            label={new Date(stats.nextConsultation.scheduled_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                            variant="outlined"
                                            size="small"
                                            sx={{ borderRadius: 1.5, fontWeight: 500 }}
                                        />
                                        <Chip
                                            label={stats.nextConsultation.consultation_type}
                                            color="primary"
                                            size="small"
                                            sx={{ textTransform: 'capitalize', fontWeight: 600, borderRadius: 1.5 }}
                                        />
                                    </Box>
                                </Box>
                                {stats.nextConsultation.meeting_link && (
                                    <Button
                                        variant="contained"
                                        href={stats.nextConsultation.meeting_link}
                                        target="_blank"
                                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
                                        sx={{ borderRadius: 2.5, px: 3, bgcolor: '#1B5E20' }}
                                    >
                                        Join Meeting
                                    </Button>
                                )}
                            </Box>
                        ) : (
                            <Box sx={{ py: 3, textAlign: 'center' }}>
                                <Typography variant="body1" color="text.secondary">No consultations scheduled for this week.</Typography>
                                <Button variant="text" sx={{ mt: 1, color: '#1B5E20', fontWeight: 600 }}>Schedule Now</Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Sidebar area */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        <Paper sx={{
                            p: 4,
                            borderRadius: 5,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            mb: 4
                        }}>
                            <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>Quick Actions</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {[
                                    { label: 'View Diet Plan', href: '/patient/diet', icon: <RestaurantMenuIcon />, color: '#4CAF50' },
                                    { label: 'Manage Medications', href: '/patient/medications', icon: <MedicationIcon />, color: '#E91E63' },
                                    { label: 'Support Tickets', href: '/patient/support', icon: <SupportAgentIcon />, color: '#2196F3' }
                                ].map((action, idx) => (
                                    <Button
                                        key={idx}
                                        component={Link}
                                        href={action.href}
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            justifyContent: 'flex-start',
                                            py: 1.5,
                                            px: 2,
                                            borderRadius: 3,
                                            borderColor: alpha(action.color, 0.2),
                                            color: 'text.primary',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                bgcolor: alpha(action.color, 0.04),
                                                borderColor: action.color,
                                                transform: 'scale(1.02)'
                                            }
                                        }}
                                        startIcon={<Box sx={{ color: action.color, display: 'flex' }}>{action.icon}</Box>}
                                    >
                                        <Typography variant="body2" fontWeight="600">{action.label}</Typography>
                                    </Button>
                                ))}
                            </Box>
                        </Paper>

                        <Box sx={{
                            p: 3,
                            borderRadius: 5,
                            background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <InfoIcon fontSize="small" />
                                    <Typography variant="subtitle2" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Notice</Typography>
                                </Box>
                                <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                                    Your records are strictly confidential and managed by Atharvveda Healthcare specialists. Contact our care team for any clinical updates.
                                </Typography>
                            </Box>
                            <Box sx={{ position: 'absolute', bottom: -20, right: -20, opacity: 0.1 }}>
                                <HealthAndSafetyIcon sx={{ fontSize: 120 }} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
