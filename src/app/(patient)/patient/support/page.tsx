'use client';

import { useEffect, useState } from 'react';
import { Typography, Paper, Box, TextField, Button, Chip, CircularProgress, Divider, Card, CardContent, Alert, Grid, Snackbar } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const statusColors: Record<string, 'warning' | 'info' | 'success' | 'default'> = {
    open: 'warning',
    in_progress: 'info',
    resolved: 'success',
    closed: 'default',
};

export default function SupportPage() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; type: 'success' | 'error' }>({ open: false, msg: '', type: 'success' });

    const fetchTickets = () => {
        fetch('/api/support')
            .then(r => r.json())
            .then(data => {
                setTickets(data.tickets || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchTickets(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) return;
        setSubmitting(true);
        try {
            await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, message }),
            });
            setSubject('');
            setMessage('');
            setSnackbar({ open: true, msg: 'Ticket submitted successfully!', type: 'success' });
            fetchTickets();
        } catch {
            setSnackbar({ open: true, msg: 'Failed to submit ticket', type: 'error' });
        }
        setSubmitting(false);
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                Support
            </Typography>

            <Grid container spacing={3}>
                {/* Create Ticket */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom>Create a Support Ticket</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth label="Subject" margin="normal" required
                                value={subject} onChange={e => setSubject(e.target.value)}
                            />
                            <TextField
                                fullWidth label="Message" multiline rows={4} margin="normal" required
                                value={message} onChange={e => setMessage(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit Ticket'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Ticket History */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>My Tickets</Typography>
                        <Divider sx={{ mb: 2 }} />
                        {tickets.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <SupportAgentIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                                <Typography color="text.secondary">No tickets yet.</Typography>
                            </Box>
                        ) : (
                            tickets.map((ticket: any) => (
                                <Card key={ticket.id} sx={{ mb: 2 }} variant="outlined">
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="subtitle1" fontWeight="bold">{ticket.subject}</Typography>
                                            <Chip label={ticket.status.replace('_', ' ')} color={statusColors[ticket.status]} size="small" sx={{ textTransform: 'capitalize' }} />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{ticket.message}</Typography>
                                        <Typography variant="caption" color="text.disabled">
                                            Created: {new Date(ticket.created_at).toLocaleString()}
                                        </Typography>
                                        {ticket.doctor_reply && (
                                            <Box sx={{ mt: 1.5, p: 1.5, bgcolor: 'success.light', borderRadius: 1, opacity: 0.9 }}>
                                                <Typography variant="body2" sx={{ color: 'success.contrastText' }}>
                                                    <strong>Doctor Reply:</strong> {ticket.doctor_reply}
                                                </Typography>
                                                {ticket.replied_at && (
                                                    <Typography variant="caption" sx={{ color: 'success.contrastText', opacity: 0.8 }}>
                                                        Replied: {new Date(ticket.replied_at).toLocaleString()}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </Paper>
                </Grid>
            </Grid>
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
