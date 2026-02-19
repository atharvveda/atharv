'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
    Typography, Box, Button, Chip, CircularProgress, Grid,
    Card, CardContent, alpha, Divider, FormControl, Select, MenuItem
} from '@mui/material';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

/* ── Stat Card ── */
const StatCard = ({
    icon, title, value, color, delay,
}: {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: string;
    delay: string;
}) => (
    <Card
        sx={{
            height: '100%',
            borderRadius: 4,
            border: '1px solid',
            borderColor: alpha(color, 0.12),
            boxShadow: `0 4px 24px ${alpha(color, 0.08)}`,
            transition: 'all 0.3s ease',
            animation: `fadeInUp 0.55s ease forwards ${delay}`,
            opacity: 0,
            '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(18px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
            },
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 12px 32px ${alpha(color, 0.16)}`,
                borderColor: alpha(color, 0.28),
            },
        }}
    >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(color, 0.1),
                    color,
                    mb: 2,
                }}
            >
                {icon}
            </Box>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 0.5, fontSize: { xs: '1.9rem', md: '2.5rem' } }}>
                {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

/* ── Pending Request Card ── */
const PendingCard = ({
    request, onApprove, loading,
}: {
    request: any;
    onApprove: (id: string) => void;
    loading: boolean;
}) => (
    <Card
        sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: alpha('#FF9800', 0.2),
            boxShadow: `0 4px 20px ${alpha('#FF9800', 0.06)}`,
            transition: 'all 0.25s ease',
            '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: `0 10px 28px ${alpha('#FF9800', 0.12)}`,
            },
        }}
    >
        <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
                <Box>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.3 }}>
                        {request.patient_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {request.title}
                    </Typography>
                </Box>
                <Chip
                    label={request.consultation_type || 'Video'}
                    size="small"
                    sx={{
                        bgcolor: alpha('#FF9800', 0.1),
                        color: '#E65100',
                        fontWeight: 700,
                        borderRadius: 1.5,
                        textTransform: 'capitalize',
                        fontSize: '0.7rem',
                        flexShrink: 0,
                        ml: 1,
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    p: 1.2,
                    bgcolor: alpha('#FF9800', 0.05),
                    borderRadius: 2,
                    mb: 2,
                }}
            >
                <AccessTimeIcon sx={{ fontSize: 14, color: '#E65100' }} />
                <Typography variant="caption" fontWeight={600} color="#E65100">
                    IST: {formatToIST(request.scheduled_at)}
                </Typography>
            </Box>
            <Button
                variant="contained"
                size="small"
                fullWidth
                startIcon={loading ? <CircularProgress size={14} color="inherit" /> : <CheckCircleOutlineIcon />}
                onClick={() => onApprove(request.id)}
                disabled={loading}
                sx={{
                    borderRadius: 2.5,
                    py: 1,
                    bgcolor: '#2E7D32',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    boxShadow: '0 4px 12px rgba(46, 125, 50, 0.25)',
                    '&:hover': { bgcolor: '#1B5E20', boxShadow: '0 6px 16px rgba(27, 94, 32, 0.3)' },
                    transition: 'all 0.2s',
                }}
            >
                {loading ? 'Approving…' : 'Approve & Schedule'}
            </Button>
        </CardContent>
    </Card>
);

/* ── Consultation Row ── */
const ConsultationRow = ({ c }: { c: any }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            mb: 1.5,
            borderRadius: 3,
            bgcolor: alpha('#1B5E20', 0.03),
            border: '1px solid',
            borderColor: alpha('#1B5E20', 0.07),
            transition: 'all 0.2s',
            '&:hover': { bgcolor: alpha('#1B5E20', 0.06), borderColor: alpha('#1B5E20', 0.15) },
        }}
    >
        <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                bgcolor: alpha('#1B5E20', 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}
        >
            <VideoCameraFrontIcon sx={{ fontSize: 18, color: '#1B5E20' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={700} noWrap>{c.title}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
                IST: {formatToIST(c.scheduled_at)} · {c.consultation_type}
            </Typography>
        </Box>
        <Chip
            label="Scheduled"
            size="small"
            sx={{
                bgcolor: alpha('#2E7D32', 0.1),
                color: '#1B5E20',
                fontWeight: 700,
                borderRadius: 1.5,
                fontSize: '0.68rem',
                flexShrink: 0,
            }}
        />
    </Box>
);

/* ── Quick Action Button ── */
const QuickAction = ({ label, href, icon, color }: { label: string; href: string; icon: React.ReactNode; color: string }) => (
    <Button
        component={Link}
        href={href}
        variant="outlined"
        fullWidth
        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
        sx={{
            justifyContent: 'flex-start',
            py: 1.5,
            px: 2.5,
            borderRadius: 3,
            borderColor: alpha(color, 0.15),
            color: 'text.primary',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            bgcolor: 'white',
            '&:hover': {
                bgcolor: alpha(color, 0.05),
                borderColor: color,
                transform: 'translateX(4px)',
                boxShadow: `0 4px 12px ${alpha(color, 0.1)}`,
            },
        }}
        startIcon={
            <Box sx={{ color, display: 'flex', p: 0.8, borderRadius: 1.5, bgcolor: alpha(color, 0.07) }}>
                {icon}
            </Box>
        }
    >
        <Typography variant="body2" fontWeight={700} sx={{ letterSpacing: 0.1 }}>{label}</Typography>
    </Button>
);

/* ── Utility ── */
function formatToIST(utcString: string) {
    return new Date(utcString).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
    });
}

/* ════════════════════════════════════════════════
   Main Component
════════════════════════════════════════════════ */
export default function DoctorDashboardPage() {
    const { user, isLoaded } = useUser();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoaded) return;
        refreshDashboard();
    }, [isLoaded]);

    const refreshDashboard = () => {
        Promise.all([
            fetch('/api/patients').then(r => r.json()),
            fetch('/api/consultations').then(r => r.json()),
            fetch('/api/support').then(r => r.json()),
            fetch('/api/medications').then(r => r.json()),
        ]).then(([patRes, consRes, supRes, medRes]) => {
            const now = new Date();
            const consultations = consRes.consultations || [];
            const patients = patRes.patients || [];

            const upcoming = consultations.filter(
                (c: any) => c.status === 'scheduled' && new Date(c.scheduled_at) >= now
            );

            const pendingRequests = consultations
                .filter((c: any) => c.status === 'requested')
                .map((req: any) => {
                    const patient = patients.find((p: any) => p.clerk_id === req.patient_clerk_id);
                    return { ...req, patient_name: patient ? patient.name : 'Unknown Patient' };
                });

            const openTickets = (supRes.tickets || []).filter(
                (t: any) => t.status === 'open' || t.status === 'in_progress'
            );

            // All active medications enriched with patient name
            const allMeds = (medRes.medications || []).filter((m: any) => m.is_active).map((m: any) => {
                const patient = patients.find((p: any) => p.clerk_id === m.patient_clerk_id);
                return { ...m, patient_name: patient ? patient.name : 'Unknown Patient' };
            });

            const pendingDeliveries = allMeds.filter((m: any) => m.delivery_status !== 'delivered');

            setStats({
                totalPatients: patients.length,
                upcomingConsultations: upcoming.length,
                pendingRequests,
                openTickets: openTickets.length,
                pendingDeliveries: pendingDeliveries.length,
                nextConsultations: upcoming.slice(0, 4),
                allMedications: allMeds,
            });
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    const handleApprove = async (id: string) => {
        setActionLoading(id);
        try {
            const res = await fetch('/api/consultations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: 'scheduled' }),
            });
            if (res.ok) refreshDashboard();
        } catch (e) {
            console.error('Approval Error:', e);
        } finally {
            setActionLoading(null);
        }
    };

    if (!isLoaded || loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
                <CircularProgress size={48} thickness={4} sx={{ color: '#1B5E20' }} />
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Loading dashboard…
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>

            {/* ── Welcome Header ── */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 2,
                    mb: { xs: 4, md: 5 },
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #0f3d22 0%, #1a5c33 100%)',
                    boxShadow: '0 8px 32px rgba(15, 61, 34, 0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: -40,
                        right: -40,
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.04)',
                        pointerEvents: 'none',
                    },
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                        variant="h5"
                        fontWeight={800}
                        sx={{ color: '#fff', mb: 0.5, letterSpacing: -0.4, fontSize: { xs: '1.3rem', md: '1.6rem' } }}
                    >
                        Welcome back, Dr.&nbsp;{user?.firstName || 'Doctor'} 👋
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                        Atharv Veda Clinical Dashboard · Today is&nbsp;
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    href="/doctor/enrollment"
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.2,
                        bgcolor: 'rgba(255,255,255,0.15)',
                        border: '1.5px solid rgba(255,255,255,0.25)',
                        color: '#fff',
                        fontWeight: 700,
                        backdropFilter: 'blur(8px)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        position: 'relative',
                        zIndex: 1,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.24)', border: '1.5px solid rgba(255,255,255,0.4)' },
                        transition: 'all 0.2s',
                    }}
                >
                    Enroll Patient
                </Button>
            </Box>

            {/* ── Stat Cards ── */}
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 4, md: 5 } }}>
                {[
                    { icon: <PeopleIcon />, title: 'Total Patients', value: stats?.totalPatients || 0, color: '#1B5E20', delay: '0s' },
                    { icon: <CalendarTodayIcon />, title: 'Upcoming Consultations', value: stats?.upcomingConsultations || 0, color: '#1976D2', delay: '0.08s' },
                    { icon: <LocalShippingIcon />, title: 'Pending Deliveries', value: stats?.pendingDeliveries || 0, color: '#E65100', delay: '0.16s' },
                    { icon: <SupportAgentIcon />, title: 'Open Tickets', value: stats?.openTickets || 0, color: '#7B1FA2', delay: '0.24s' },
                ].map((s) => (
                    <Grid size={{ xs: 6, md: 3 }} key={s.title}>
                        <StatCard {...s} />
                    </Grid>
                ))}
            </Grid>

            {/* ── Main Grid ── */}
            <Grid container spacing={{ xs: 2.5, md: 3 }}>

                {/* Pending Requests */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4, bgcolor: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                            <Typography variant="h6" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF6D00', boxShadow: '0 0 6px #FF6D00' }} />
                                Pending Requests
                            </Typography>
                            {(stats?.pendingRequests?.length || 0) > 0 && (
                                <Chip
                                    label={`${stats.pendingRequests.length} Awaiting`}
                                    size="small"
                                    sx={{ bgcolor: alpha('#FF9800', 0.1), color: '#E65100', fontWeight: 700, borderRadius: 1.5 }}
                                />
                            )}
                        </Box>
                        <Divider sx={{ mb: 2.5 }} />
                        {(stats?.pendingRequests || []).length === 0 ? (
                            <Box sx={{ py: 4, textAlign: 'center' }}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 40, color: alpha('#1B5E20', 0.25), mb: 1 }} />
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>All clear! No pending consultation requests.</Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {stats.pendingRequests.map((req: any) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={req.id}>
                                        <PendingCard
                                            request={req}
                                            onApprove={handleApprove}
                                            loading={actionLoading === req.id}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Grid>

                {/* ── Medication Deliveries ── */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4, bgcolor: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                            <Typography variant="h6" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#E65100', boxShadow: '0 0 6px #E65100' }} />
                                Medication Deliveries
                            </Typography>
                            {(stats?.pendingDeliveries || 0) > 0 && (
                                <Chip label={`${stats.pendingDeliveries} Pending`} size="small" sx={{ bgcolor: alpha('#E65100', 0.1), color: '#E65100', fontWeight: 700, borderRadius: 1.5 }} />
                            )}
                        </Box>
                        <Divider sx={{ mb: 2.5 }} />
                        {(stats?.allMedications || []).length === 0 ? (
                            <Box sx={{ py: 4, textAlign: 'center' }}>
                                <LocalShippingIcon sx={{ fontSize: 40, color: alpha('#E65100', 0.25), mb: 1 }} />
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>No active medications assigned to any patient.</Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {(stats.allMedications || []).map((med: any) => {
                                    const statusColor: Record<string, 'warning' | 'info' | 'success'> = {
                                        on_the_way: 'warning',
                                        nearest_local_facility: 'info',
                                        delivered: 'success',
                                    };
                                    const statusLabel: Record<string, string> = {
                                        on_the_way: '📦 On the Way',
                                        nearest_local_facility: '🏢 Nearest Local Facility',
                                        delivered: '✅ Delivered',
                                    };
                                    const currentStatus = med.delivery_status || 'on_the_way';
                                    return (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={med.id}>
                                            <Card variant="outlined" sx={{
                                                borderRadius: 3,
                                                borderColor: currentStatus === 'delivered' ? 'success.light' : currentStatus === 'nearest_local_facility' ? 'info.light' : 'warning.light',
                                                transition: 'all 0.2s',
                                                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' },
                                            }}>
                                                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                                                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 0.3 }}>{med.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                                                        Patient: <strong>{med.patient_name}</strong> · {med.dosage}
                                                    </Typography>
                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            value={currentStatus}
                                                            onChange={async (e) => {
                                                                const newStatus = e.target.value;
                                                                await fetch('/api/medications', {
                                                                    method: 'PUT',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ id: med.id, delivery_status: newStatus }),
                                                                });
                                                                refreshDashboard();
                                                            }}
                                                            renderValue={(val) => (
                                                                <Chip
                                                                    label={statusLabel[val] || val}
                                                                    size="small"
                                                                    color={statusColor[val] || 'default'}
                                                                    sx={{ fontWeight: 700 }}
                                                                />
                                                            )}
                                                        >
                                                            <MenuItem value="on_the_way">📦 On the Way</MenuItem>
                                                            <MenuItem value="nearest_local_facility">🏢 Nearest Local Facility</MenuItem>
                                                            <MenuItem value="delivered">✅ Delivered</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Box>
                </Grid>

                {/* Upcoming Consultations */}
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4, bgcolor: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
                        <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#1976D2', boxShadow: '0 0 6px #1976D2' }} />
                            Upcoming Consultations
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {(stats?.nextConsultations || []).length === 0 ? (
                            <Box sx={{ py: 4, textAlign: 'center' }}>
                                <CalendarTodayIcon sx={{ fontSize: 40, color: alpha('#1976D2', 0.25), mb: 1 }} />
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>No upcoming consultations scheduled.</Typography>
                            </Box>
                        ) : (
                            stats.nextConsultations.map((c: any) => <ConsultationRow key={c.id} c={c} />)
                        )}
                    </Box>
                </Grid>

                {/* Quick Actions */}
                <Grid size={{ xs: 12, lg: 5 }}>
                    <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4, bgcolor: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
                        <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#7B1FA2', boxShadow: '0 0 6px #7B1FA2' }} />
                            Quick Actions
                        </Typography>
                        <Divider sx={{ mb: 2.5 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <QuickAction label="View All Patients" href="/doctor/patients" icon={<PeopleIcon sx={{ fontSize: 18 }} />} color="#1B5E20" />
                            <QuickAction label="Document Vault" href="/doctor/documents" icon={<DescriptionIcon sx={{ fontSize: 18 }} />} color="#1976D2" />
                            <QuickAction label="Support Tickets" href="/doctor/support" icon={<SupportAgentIcon sx={{ fontSize: 18 }} />} color="#7B1FA2" />
                            <QuickAction label="Enroll New Patient" href="/doctor/enrollment" icon={<PersonAddIcon sx={{ fontSize: 18 }} />} color="#E65100" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
