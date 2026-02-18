'use client';

import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Chip, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const deliverySteps = ['pending', 'processing', 'shipped', 'delivered'];

const deliveryColors: Record<string, 'default' | 'warning' | 'info' | 'success'> = {
    pending: 'default',
    processing: 'warning',
    shipped: 'info',
    delivered: 'success',
};

function DeliveryProgress({ status }: { status: string }) {
    const step = deliverySteps.indexOf(status);
    const progress = ((step + 1) / deliverySteps.length) * 100;
    return (
        <Box sx={{ width: '100%', minWidth: 120 }}>
            <LinearProgress
                variant="determinate"
                value={progress}
                color={status === 'delivered' ? 'success' : status === 'shipped' ? 'info' : 'warning'}
                sx={{ height: 6, borderRadius: 3, mb: 0.5 }}
            />
            <Chip label={status} size="small" color={deliveryColors[status] || 'default'} variant="outlined" sx={{ textTransform: 'capitalize' }} />
        </Box>
    );
}

export default function MedicationsPage() {
    const [medications, setMedications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/medications')
            .then(r => r.json())
            .then(data => {
                setMedications(data.medications || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    const activeMeds = medications.filter(m => m.is_active);
    const pastMeds = medications.filter(m => !m.is_active);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                My Medications
            </Typography>

            {medications.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                        <MedicationIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No medications prescribed yet.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your current prescriptions will appear here.
                        </Typography>
                    </Box>
                </Paper>
            ) : (
                <>
                    {activeMeds.length > 0 && (
                        <Paper sx={{ mb: 3 }}>
                            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MedicationIcon color="primary" />
                                <Typography variant="h6">Active Medications</Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Medication</strong></TableCell>
                                            <TableCell><strong>Dosage</strong></TableCell>
                                            <TableCell><strong>Frequency</strong></TableCell>
                                            <TableCell><strong>Instructions</strong></TableCell>
                                            <TableCell><strong>Delivery Status</strong></TableCell>
                                            <TableCell><strong>Tracking</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {activeMeds.map((med: any) => (
                                            <TableRow key={med.id}>
                                                <TableCell><strong>{med.name}</strong></TableCell>
                                                <TableCell>{med.dosage}</TableCell>
                                                <TableCell>{med.frequency}</TableCell>
                                                <TableCell>{med.instructions || '-'}</TableCell>
                                                <TableCell><DeliveryProgress status={med.delivery_status} /></TableCell>
                                                <TableCell>{med.tracking_number || '-'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    )}

                    {pastMeds.length > 0 && (
                        <Paper>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" color="text.secondary">Past Medications</Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Medication</TableCell>
                                            <TableCell>Dosage</TableCell>
                                            <TableCell>Duration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pastMeds.map((med: any) => (
                                            <TableRow key={med.id} sx={{ opacity: 0.7 }}>
                                                <TableCell>{med.name}</TableCell>
                                                <TableCell>{med.dosage}</TableCell>
                                                <TableCell>{med.start_date} — {med.end_date || 'Ongoing'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    )}
                </>
            )}
        </Box>
    );
}
