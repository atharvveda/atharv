'use client';

import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, CircularProgress } from '@mui/material';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PatientsPage() {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/patients')
            .then(r => r.json())
            .then(data => {
                setPatients(data.patients || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Patients ({patients.length})
            </Typography>

            {patients.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">No patients registered yet.</Typography>
                </Paper>
            ) : (
                <Paper sx={{ width: '100%' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'grey.50' }}>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Phone</strong></TableCell>
                                    <TableCell><strong>Age</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Joined</strong></TableCell>
                                    <TableCell align="center"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients.map((patient: any) => (
                                    <TableRow key={patient.id} hover>
                                        <TableCell><strong>{patient.name}</strong></TableCell>
                                        <TableCell>{patient.email || '-'}</TableCell>
                                        <TableCell>{patient.phone || '-'}</TableCell>
                                        <TableCell>{patient.age || '-'}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={patient.status || 'active'}
                                                color={patient.status === 'active' ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{new Date(patient.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                component={Link}
                                                href={`/doctor/patient/${patient.clerk_id}`}
                                                variant="outlined"
                                                size="small"
                                                startIcon={<VisibilityIcon />}
                                            >
                                                Manage
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </Box>
    );
}
