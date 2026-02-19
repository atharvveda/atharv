'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Typography, Paper, Box, Tabs, Tab, TextField, Button, Grid, Divider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel,
    IconButton, Card, CardContent, Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
function TabPanel({ children, value, index }: TabPanelProps) {
    return value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;
}

export default function PatientDetailPage() {
    const params = useParams();
    const clerkId = params.clerkId as string;
    const [tab, setTab] = useState(0);
    const [patient, setPatient] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Diet state
    const [diet, setDiet] = useState<any[]>([]);
    const [dietPdfs, setDietPdfs] = useState<any[]>([]);
    const [pdfUploading, setPdfUploading] = useState(false);
    const [dietForm, setDietForm] = useState({ meal_type: 'breakfast', items: '', instructions: '' });

    // Medications state
    const [medications, setMedications] = useState<any[]>([]);
    const [medForm, setMedForm] = useState({ name: '', dosage: '', frequency: '', instructions: '', start_date: '', end_date: '' });

    // Consultations state
    const [consultations, setConsultations] = useState<any[]>([]);
    const [consForm, setConsForm] = useState({ title: '', description: '', consultation_type: 'video', scheduled_at: '', duration_minutes: 30, meeting_link: '' });

    const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; type: 'success' | 'error' }>({ open: false, msg: '', type: 'success' });

    const showAlert = (msg: string, type: 'success' | 'error' = 'success') => {
        setSnackbar({ open: true, msg, type });
    };

    const fetchPdfs = () => {
        fetch(`/api/diet/pdf?patientClerkId=${clerkId}`)
            .then(r => r.json())
            .then(data => setDietPdfs(data.files || []))
            .catch(() => { });
    };

    useEffect(() => {
        Promise.all([
            fetch(`/api/patients?clerkId=${clerkId}`).then(r => r.json()),
            fetch(`/api/diet?patientClerkId=${clerkId}`).then(r => r.json()),
            fetch(`/api/medications?patientClerkId=${clerkId}`).then(r => r.json()),
            fetch(`/api/consultations?patientClerkId=${clerkId}`).then(r => r.json()),
        ]).then(([patRes, dietRes, medRes, consRes]) => {
            setPatient(patRes.patient);
            setDiet(dietRes.diet || []);
            setMedications(medRes.medications || []);
            setConsultations(consRes.consultations || []);
            setLoading(false);
        }).catch(() => setLoading(false));
        fetchPdfs();
    }, [clerkId]);

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            showAlert('Only PDF files are allowed', 'error');
            return;
        }
        setPdfUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('patientClerkId', clerkId);
            const res = await fetch('/api/diet/pdf', { method: 'POST', body: fd });
            const data = await res.json();
            if (res.ok) {
                showAlert('Diet plan PDF uploaded successfully');
                fetchPdfs();
            } else {
                showAlert(data.error || 'Upload failed', 'error');
            }
        } catch {
            showAlert('Upload failed — network error', 'error');
        }
        setPdfUploading(false);
        e.target.value = '';
    };

    const deletePdf = async (path: string) => {
        await fetch(`/api/diet/pdf?path=${encodeURIComponent(path)}`, { method: 'DELETE' });
        showAlert('PDF removed');
        fetchPdfs();
    };

    // --- Diet Actions ---
    const addDiet = async () => {
        if (!dietForm.items.trim()) return;
        const res = await fetch('/api/diet', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...dietForm, patient_clerk_id: clerkId }),
        });
        const data = await res.json();
        if (data.entry) { setDiet(prev => [...prev, data.entry]); setDietForm({ meal_type: 'breakfast', items: '', instructions: '' }); showAlert('Diet entry added'); }
        else showAlert(data.error || 'Failed', 'error');
    };

    const deleteDiet = async (id: string) => {
        await fetch(`/api/diet?id=${id}`, { method: 'DELETE' });
        setDiet(prev => prev.filter(d => d.id !== id));
        showAlert('Diet entry removed');
    };

    // --- Medication Actions ---
    const addMedication = async () => {
        if (!medForm.name.trim() || !medForm.dosage.trim()) return;
        const res = await fetch('/api/medications', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...medForm, patient_clerk_id: clerkId }),
        });
        const data = await res.json();
        if (data.medication) { setMedications(prev => [data.medication, ...prev]); setMedForm({ name: '', dosage: '', frequency: '', instructions: '', start_date: '', end_date: '' }); showAlert('Medication added'); }
        else showAlert(data.error || 'Failed', 'error');
    };

    const updateDelivery = async (id: string, delivery_status: string, tracking_number?: string) => {
        const res = await fetch('/api/medications', {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, delivery_status, tracking_number }),
        });
        const data = await res.json();
        if (data.medication) {
            setMedications(prev => prev.map(m => m.id === id ? data.medication : m));
            showAlert('Delivery status updated');
        }
    };

    // --- Consultation Actions ---
    const addConsultation = async () => {
        if (!consForm.title.trim() || !consForm.scheduled_at) return;
        const res = await fetch('/api/consultations', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...consForm, patient_clerk_id: clerkId }),
        });
        const data = await res.json();
        if (data.consultation) { setConsultations(prev => [...prev, data.consultation]); setConsForm({ title: '', description: '', consultation_type: 'video', scheduled_at: '', duration_minutes: 30, meeting_link: '' }); showAlert('Consultation scheduled'); }
        else showAlert(data.error || 'Failed', 'error');
    };

    const updateConsultation = async (id: string, updates: any) => {
        const res = await fetch('/api/consultations', {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...updates }),
        });
        const data = await res.json();
        if (data.consultation) {
            setConsultations(prev => prev.map(c => c.id === id ? data.consultation : c));
            showAlert('Consultation updated');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Patient: {patient?.name || 'Unknown'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Email: {patient?.email || '-'} · Phone: {patient?.phone || '-'} · Age: {patient?.age || '-'}
            </Typography>



            <Paper sx={{ mt: 2 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
                    <Tab label="Diet Plan" />
                    <Tab label="Medications" />
                    <Tab label="Consultations" />
                </Tabs>

                {/* ===== DIET TAB ===== */}
                <TabPanel value={tab} index={0}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Add Diet Entry</Typography>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Meal Type</InputLabel>
                                    <Select value={dietForm.meal_type} label="Meal Type" onChange={e => setDietForm({ ...dietForm, meal_type: e.target.value })}>
                                        <MenuItem value="breakfast">Breakfast</MenuItem>
                                        <MenuItem value="lunch">Lunch</MenuItem>
                                        <MenuItem value="dinner">Dinner</MenuItem>
                                        <MenuItem value="snacks">Snacks</MenuItem>
                                        <MenuItem value="drinks">Drinks</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField fullWidth size="small" label="Items" value={dietForm.items} onChange={e => setDietForm({ ...dietForm, items: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField fullWidth size="small" label="Instructions" value={dietForm.instructions} onChange={e => setDietForm({ ...dietForm, instructions: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                                <Button variant="contained" fullWidth onClick={addDiet}>Add</Button>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {/* PDF Upload Section */}
                        <Box sx={{ mb: 3, p: 2.5, border: '2px dashed', borderColor: 'primary.light', borderRadius: 2, bgcolor: 'primary.50' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PictureAsPdfIcon color="error" />
                                    <Typography variant="subtitle1" fontWeight="bold">Diet Plan PDF</Typography>
                                </Box>
                                <Button
                                    component="label"
                                    variant="contained"
                                    size="small"
                                    startIcon={<UploadFileIcon />}
                                    disabled={pdfUploading}
                                >
                                    {pdfUploading ? 'Uploading...' : 'Upload PDF'}
                                    <input type="file" hidden accept="application/pdf" onChange={handlePdfUpload} />
                                </Button>
                            </Box>
                            {dietPdfs.length > 0 && (
                                <Box sx={{ mt: 1.5 }}>
                                    {dietPdfs.map((pdf: any, i: number) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PictureAsPdfIcon fontSize="small" color="error" />
                                                <Typography variant="body2">{pdf.name.replace(/^\d+-/, '')}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                {pdf.url && (
                                                    <IconButton size="small" href={pdf.url} target="_blank" color="primary">
                                                        <OpenInNewIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                                <IconButton size="small" color="error" onClick={() => deletePdf(`${clerkId}/${pdf.name}`)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                            {dietPdfs.length === 0 && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>No PDFs uploaded yet. Upload a diet plan for this patient.</Typography>
                            )}
                        </Box>

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Diet Entries</Typography>

                        {diet.length === 0 ? (
                            <Typography color="text.secondary">No diet entries yet.</Typography>
                        ) : (
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Meal</strong></TableCell>
                                            <TableCell><strong>Items</strong></TableCell>
                                            <TableCell><strong>Instructions</strong></TableCell>
                                            <TableCell align="center"><strong>Action</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {diet.map((d: any) => (
                                            <TableRow key={d.id}>
                                                <TableCell><Chip label={d.meal_type} size="small" sx={{ textTransform: 'capitalize' }} /></TableCell>
                                                <TableCell>{d.items}</TableCell>
                                                <TableCell>{d.instructions || '-'}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small" color="error" onClick={() => deleteDiet(d.id)}><DeleteIcon fontSize="small" /></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </TabPanel>

                {/* ===== MEDICATIONS TAB ===== */}
                <TabPanel value={tab} index={1}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Add Medication</Typography>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField fullWidth size="small" label="Name" value={medForm.name} onChange={e => setMedForm({ ...medForm, name: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                                <TextField fullWidth size="small" label="Dosage" value={medForm.dosage} onChange={e => setMedForm({ ...medForm, dosage: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                                <TextField fullWidth size="small" label="Frequency" value={medForm.frequency} onChange={e => setMedForm({ ...medForm, frequency: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                                <TextField fullWidth size="small" type="date" label="Start" InputLabelProps={{ shrink: true }} value={medForm.start_date} onChange={e => setMedForm({ ...medForm, start_date: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 1.5 }}>
                                <TextField fullWidth size="small" type="date" label="End" InputLabelProps={{ shrink: true }} value={medForm.end_date} onChange={e => setMedForm({ ...medForm, end_date: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 1.5 }}>
                                <Button variant="contained" fullWidth onClick={addMedication}>Add</Button>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {medications.length === 0 ? (
                            <Typography color="text.secondary">No medications prescribed.</Typography>
                        ) : (
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Medication</strong></TableCell>
                                            <TableCell><strong>Dosage</strong></TableCell>
                                            <TableCell><strong>Frequency</strong></TableCell>
                                            <TableCell><strong>Dates</strong></TableCell>
                                            <TableCell><strong>Delivery</strong></TableCell>
                                            <TableCell><strong>Tracking #</strong></TableCell>
                                            <TableCell><strong>Actions</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {medications.map((m: any) => (
                                            <TableRow key={m.id}>
                                                <TableCell><strong>{m.name}</strong></TableCell>
                                                <TableCell>{m.dosage}</TableCell>
                                                <TableCell>{m.frequency}</TableCell>
                                                <TableCell>{m.start_date} {m.end_date ? `— ${m.end_date}` : ''}</TableCell>
                                                <TableCell>
                                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                                        <Select value={m.delivery_status} onChange={e => updateDelivery(m.id, e.target.value as string, m.tracking_number)}>
                                                            <MenuItem value="pending">Pending</MenuItem>
                                                            <MenuItem value="processing">Processing</MenuItem>
                                                            <MenuItem value="shipped">Shipped</MenuItem>
                                                            <MenuItem value="delivered">Delivered</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small" placeholder="Enter #" defaultValue={m.tracking_number || ''}
                                                        onBlur={e => { if (e.target.value !== (m.tracking_number || '')) updateDelivery(m.id, m.delivery_status, e.target.value); }}
                                                        sx={{ width: 120 }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={m.is_active ? 'Active' : 'Inactive'} color={m.is_active ? 'success' : 'default'} size="small" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </TabPanel>

                {/* ===== CONSULTATIONS TAB ===== */}
                <TabPanel value={tab} index={2}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Schedule Consultation</Typography>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField fullWidth size="small" label="Title" value={consForm.title} onChange={e => setConsForm({ ...consForm, title: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Type</InputLabel>
                                    <Select value={consForm.consultation_type} label="Type" onChange={e => setConsForm({ ...consForm, consultation_type: e.target.value })}>
                                        <MenuItem value="video">Video</MenuItem>
                                        <MenuItem value="in-person">In-Person</MenuItem>
                                        <MenuItem value="phone">Phone</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2.5 }}>
                                <TextField fullWidth size="small" type="datetime-local" label="Date & Time" InputLabelProps={{ shrink: true }} value={consForm.scheduled_at} onChange={e => setConsForm({ ...consForm, scheduled_at: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2.5 }}>
                                <TextField fullWidth size="small" label="Meeting Link" value={consForm.meeting_link} onChange={e => setConsForm({ ...consForm, meeting_link: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                                <Button variant="contained" fullWidth onClick={addConsultation}>Schedule</Button>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {consultations.length === 0 ? (
                            <Typography color="text.secondary">No consultations scheduled.</Typography>
                        ) : (
                            consultations.map((c: any) => (
                                <Card key={c.id} variant="outlined" sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="subtitle1" fontWeight="bold">{c.title}</Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Chip label={c.consultation_type} size="small" variant="outlined" />
                                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                                    <Select value={c.status} onChange={e => updateConsultation(c.id, { status: e.target.value })}>
                                                        <MenuItem value="scheduled">Scheduled</MenuItem>
                                                        <MenuItem value="completed">Completed</MenuItem>
                                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(c.scheduled_at).toLocaleString()} · {c.duration_minutes} min
                                        </Typography>
                                        {c.description && <Typography variant="body2" sx={{ mt: 0.5 }}>{c.description}</Typography>}
                                        <Box sx={{ mt: 2 }}>
                                            <TextField
                                                fullWidth size="small" label="Doctor Remarks" multiline rows={2}
                                                defaultValue={c.doctor_remarks || ''}
                                                onBlur={e => { if (e.target.value !== (c.doctor_remarks || '')) updateConsultation(c.id, { doctor_remarks: e.target.value }); }}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </Box>
                </TabPanel>
            </Paper>
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
