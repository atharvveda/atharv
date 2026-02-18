'use client';

import { useEffect, useState } from 'react';
import {
    Typography, Paper, Box, Card, CardContent, Chip, CircularProgress,
    Divider, TextField, Button, Alert, Grid, Snackbar
} from '@mui/material';

const statusColors: Record<string, 'warning' | 'info' | 'success' | 'default'> = {
    open: 'warning',
    in_progress: 'info',
    resolved: 'success',
    closed: 'default',
};

const priorityColors: Record<string, 'error' | 'warning' | 'info' | 'default'> = {
    urgent: 'error',
    high: 'warning',
    normal: 'info',
    low: 'default',
};

export default function DoctorSupportPage() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyMap, setReplyMap] = useState<Record<string, string>>({});
    const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; type: 'success' | 'error' }>({ open: false, msg: '', type: 'success' });

    useEffect(() => {
        fetch('/api/support')
            .then(r => r.json())
            .then(data => {
                setTickets(data.tickets || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleReply = async (ticketId: string, status: string) => {
        const reply = replyMap[ticketId];
        const res = await fetch('/api/support', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: ticketId, doctor_reply: reply, status }),
        });
        const data = await res.json();
        if (data.ticket) {
            setTickets(prev => prev.map(t => t.id === ticketId ? data.ticket : t));
            setReplyMap(prev => ({ ...prev, [ticketId]: '' }));
            setSnackbar({ open: true, msg: 'Reply sent successfully', type: 'success' });
        } else {
            setSnackbar({ open: true, msg: data.error || 'Failed to send reply', type: 'error' });
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress');
    const closedTickets = tickets.filter(t => t.status === 'resolved' || t.status === 'closed');

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Support Tickets ({tickets.length})
            </Typography>

            {tickets.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">No support tickets.</Typography>
                </Paper>
            ) : (
                <>
                    {openTickets.length > 0 && (
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom>Open Tickets ({openTickets.length})</Typography>
                            <Grid container spacing={2}>
                                {openTickets.map((ticket: any) => (
                                    <Grid size={{ xs: 12, md: 6 }} key={ticket.id}>
                                        <Card variant="outlined" sx={{ borderLeft: '4px solid #ff9800' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="subtitle1" fontWeight="bold">{ticket.subject}</Typography>
                                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                        <Chip label={ticket.priority} color={priorityColors[ticket.priority]} size="small" />
                                                        <Chip label={ticket.status.replace('_', ' ')} color={statusColors[ticket.status]} size="small" />
                                                    </Box>
                                                </Box>
                                                <Typography variant="body2" sx={{ mb: 1 }}>{ticket.message}</Typography>
                                                <Typography variant="caption" color="text.disabled">
                                                    Patient ID: {ticket.patient_clerk_id} · {new Date(ticket.created_at).toLocaleString()}
                                                </Typography>

                                                {ticket.doctor_reply && (
                                                    <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                                                        <Typography variant="body2"><strong>Your reply:</strong> {ticket.doctor_reply}</Typography>
                                                    </Box>
                                                )}

                                                <Divider sx={{ my: 1.5 }} />
                                                <TextField
                                                    fullWidth size="small" label="Reply to patient" multiline rows={2}
                                                    value={replyMap[ticket.id] || ''}
                                                    onChange={e => setReplyMap({ ...replyMap, [ticket.id]: e.target.value })}
                                                />
                                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                                    <Button size="small" variant="contained" onClick={() => handleReply(ticket.id, 'in_progress')}>Reply</Button>
                                                    <Button size="small" variant="outlined" color="success" onClick={() => handleReply(ticket.id, 'resolved')}>Resolve</Button>
                                                    <Button size="small" variant="outlined" color="error" onClick={() => handleReply(ticket.id, 'closed')}>Close</Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {closedTickets.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom color="text.secondary">Resolved/Closed ({closedTickets.length})</Typography>
                            {closedTickets.map((ticket: any) => (
                                <Paper key={ticket.id} sx={{ p: 2, mb: 1, opacity: 0.7 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body1">{ticket.subject}</Typography>
                                        <Chip label={ticket.status} color={statusColors[ticket.status]} size="small" />
                                    </Box>
                                    {ticket.doctor_reply && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Reply: {ticket.doctor_reply}</Typography>
                                    )}
                                </Paper>
                            ))}
                        </Box>
                    )}
                </>
            )}
            {/* Feedback Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: '100%' }}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
}
