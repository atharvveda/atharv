'use client';

import { useEffect, useState } from 'react';
import {
    Typography, Paper, Box, Chip, CircularProgress,
    Divider, alpha, Card, CardContent, Stepper, Step, StepLabel,
} from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const STEP_LABELS = ['On the Way', 'Nearest Local Facility', 'Delivered'];
const DELIVERY_STEPS = ['on_the_way', 'nearest_local_facility', 'delivered'];

function statusLabel(status: string) {
    if (status === 'nearest_local_facility') return 'Nearest Local Facility';
    if (status === 'delivered') return 'Delivered';
    return 'On the Way';
}

function statusColor(status: string): 'warning' | 'info' | 'success' {
    if (status === 'nearest_local_facility') return 'info';
    if (status === 'delivered') return 'success';
    return 'warning';
}

function statusBg(status: string) {
    if (status === 'nearest_local_facility') return { from: '#e3f2fd', to: '#e8f4fd', border: 'info.light', accent: '#0288d1' };
    if (status === 'delivered') return { from: '#e8f5e9', to: '#f1f8e9', border: 'success.light', accent: '#2e7d32' };
    return { from: '#fff8e1', to: '#fffde7', border: 'warning.light', accent: '#f57c00' };
}

// ─── Single medication card ───────────────────────────────────────────────────
function MedCard({ med }: { med: any }) {
    const status = med.delivery_status || 'on_the_way';
    const isDelivered = status === 'delivered';
    const activeStep = DELIVERY_STEPS.indexOf(status);
    const bg = statusBg(status);

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 3,
                borderRadius: 3,
                borderColor: bg.border,
                borderWidth: 1.5,
                overflow: 'hidden',
                boxShadow: `0 4px 20px ${alpha(bg.accent, 0.08)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: `0 8px 32px ${alpha(bg.accent, 0.15)}`,
                    transform: 'translateY(-2px)',
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    px: 3, py: 2,
                    background: `linear-gradient(135deg, ${bg.from} 0%, ${bg.to} 100%)`,
                    borderBottom: '1px solid', borderColor: 'divider',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <MedicationIcon color="primary" />
                    <Box>
                        <Typography variant="h6" fontWeight={700} lineHeight={1.2}>{med.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {med.dosage}{med.frequency ? ` · ${med.frequency}` : ''}
                        </Typography>
                    </Box>
                </Box>
                <Chip
                    label={statusLabel(status)}
                    color={statusColor(status)}
                    size="small"
                    sx={{ fontWeight: 700, px: 1 }}
                />
            </Box>

            <CardContent sx={{ px: 3, pt: 2.5, pb: '20px !important' }}>
                {/* Stepper */}
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                    {STEP_LABELS.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {med.tracking_number && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                        Tracking #: <strong>{med.tracking_number}</strong>
                    </Typography>
                )}

                <Divider sx={{ mb: 2 }} />

                {/* Not yet delivered — hide prescription */}
                {!isDelivered && (
                    <Box
                        sx={{
                            display: 'flex', alignItems: 'flex-start', gap: 1.5,
                            p: 2.5, borderRadius: 2,
                            bgcolor: alpha(bg.accent, 0.06),
                            border: '1px dashed', borderColor: bg.border,
                        }}
                    >
                        <InfoOutlinedIcon sx={{ color: bg.accent, mt: 0.2, flexShrink: 0 }} />
                        <Box>
                            <Typography variant="subtitle2" fontWeight={700} sx={{ color: bg.accent }}>
                                {status === 'on_the_way' ? 'Heading towards nearest local facility!' : 'Arrived at your nearest local facility!'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {status === 'on_the_way'
                                    ? 'Your package is currently in transport and approaching the distribution center.'
                                    : 'Your medication has reached the local hub and will be out for final delivery soon.'}
                                {" Prescription details will appear once delivered."}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Delivered — show prescription */}
                {isDelivered && (
                    <Box>
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
                            {med.start_date && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">Start Date</Typography>
                                    <Typography variant="body2" fontWeight={600}>{med.start_date}</Typography>
                                </Box>
                            )}
                            {med.end_date && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">End Date</Typography>
                                    <Typography variant="body2" fontWeight={600}>{med.end_date}</Typography>
                                </Box>
                            )}
                            {med.instructions && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">Instructions</Typography>
                                    <Typography variant="body2" fontWeight={600}>{med.instructions}</Typography>
                                </Box>
                            )}
                        </Box>

                        {med.prescription ? (
                            <Box
                                sx={{
                                    p: 2.5, borderRadius: 2,
                                    bgcolor: alpha('#2e7d32', 0.05),
                                    border: '1px solid', borderColor: alpha('#2e7d32', 0.2),
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <DescriptionIcon fontSize="small" color="success" />
                                    <Typography variant="subtitle2" fontWeight={700} color="success.dark">
                                        Prescription &amp; Usage Instructions
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                                    {med.prescription}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                No prescription notes added by your doctor yet.
                            </Typography>
                        )}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MedicationsPage() {
    const [medications, setMedications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/medications')
            .then(r => r.json())
            .then(data => {
                if (data.error) { setError(data.error); }
                else { setMedications(data.medications || []); }
                setLoading(false);
            })
            .catch(() => { setError('Failed to load medications.'); setLoading(false); });
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    if (error) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    const activeMeds = medications.filter(m => m.is_active);
    const pastMeds = medications.filter(m => !m.is_active);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} gutterBottom>My Medications</Typography>
                <Typography variant="body2" color="text.secondary">
                    View your prescribed medicines, delivery status, and prescriptions below.
                </Typography>
            </Box>

            {medications.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                    <MedicationIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No medications prescribed yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your prescriptions will appear here once your doctor assigns them.
                    </Typography>
                </Paper>
            ) : (
                <>
                    {activeMeds.length > 0 && (
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MedicationIcon fontSize="small" color="primary" />
                                Active Medications ({activeMeds.length})
                            </Typography>
                            {activeMeds.map(med => <MedCard key={med.id} med={med} />)}
                        </Box>
                    )}

                    {pastMeds.length > 0 && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700} color="text.secondary" sx={{ mb: 2 }}>
                                Past Medications
                            </Typography>
                            {pastMeds.map(med => (
                                <Paper key={med.id} variant="outlined" sx={{
                                    p: 2, mb: 1.5, opacity: 0.7, borderRadius: 2,
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', flexWrap: 'wrap', gap: 1,
                                }}>
                                    <Box>
                                        <Typography variant="body2" fontWeight={700}>{med.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">{med.dosage}</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {med.start_date} — {med.end_date || 'Ongoing'}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
