'use client';

import { useState } from 'react';
import {
    Typography, Paper, Box, Grid, TextField, Button,
    MenuItem, Divider, CircularProgress, Alert, Snackbar
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export default function EnrollmentPage() {
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', type: 'success' as 'success' | 'error' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        health_condition: '',
        other_health_conditions: '',
        family_history: '',
        hospitalization_history: '',
        current_medication: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/doctor/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setSnackbar({ open: true, msg: 'Patient enrolled successfully!', type: 'success' });
                // Reset form
                setFormData({
                    name: '', email: '', password: '', phone: '', age: '', gender: '', address: '',
                    health_condition: '', other_health_conditions: '', family_history: '',
                    hospitalization_history: '', current_medication: ''
                });
            } else {
                setSnackbar({ open: true, msg: data.error || 'Enrollment failed', type: 'error' });
            }
        } catch (error) {
            setSnackbar({ open: true, msg: 'Network error occurred', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <PersonAddIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4" fontWeight="bold">Patient Enrollment</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    {/* Personal Information */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                                <PersonAddIcon fontSize="small" /> Personal Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Initial Password" name="password" value={formData.password} onChange={handleChange} required helperText="Provide this to the patient for their first login" />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <TextField fullWidth label="Age" type="number" name="age" value={formData.age} onChange={handleChange} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Full Address" name="address" value={formData.address} onChange={handleChange} multiline rows={2} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Clinical History */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                                <HealthAndSafetyIcon fontSize="small" color="secondary" /> Clinical History
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Primary Health Condition" name="health_condition" value={formData.health_condition} onChange={handleChange} multiline rows={2} placeholder="e.g. CKD Stage 3" />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Other Health Conditions" name="other_health_conditions" value={formData.other_health_conditions} onChange={handleChange} multiline rows={2} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Family Health History" name="family_history" value={formData.family_history} onChange={handleChange} multiline rows={2} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="History of Hospitalization" name="hospitalization_history" value={formData.hospitalization_history} onChange={handleChange} multiline rows={2} />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Current Medications (Enrollment Summary)" name="current_medication" value={formData.current_medication} onChange={handleChange} multiline rows={2} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Actions */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ px: 6, py: 1.5, borderRadius: 2 }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Enroll Patient'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.type} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
}
