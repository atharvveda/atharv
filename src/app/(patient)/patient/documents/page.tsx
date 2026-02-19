'use client';
import { useState, useEffect, useCallback } from 'react';
import { Typography, Paper, Box, Divider, List, ListItem, ListItemText, ListItemIcon, IconButton, Grid, CircularProgress, Chip, alpha } from '@mui/material';
import FileUploader from '../../../../components/dashboard/FileUploader';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import HistoryIcon from '@mui/icons-material/History';

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDocuments = useCallback(async () => {
        try {
            const res = await fetch('/api/documents');
            const data = await res.json();
            if (data.documents) {
                setDocuments(data.documents);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const formatSize = (bytes: number) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" fontWeight="800" sx={{ color: '#1B5E20', mb: 1 }}>
                    Document Vault
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Securely upload and manage your lab reports, prescriptions, and medical records.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper sx={{
                        p: 4,
                        borderRadius: 4,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.04)'
                    }}>
                        <Typography variant="h6" fontWeight="700" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HistoryIcon color="primary" /> Upload New Record
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Supported formats: PDF, JPG, PNG (Max 20MB)
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <FileUploader onUploadSuccess={fetchDocuments} />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{
                        p: 4,
                        borderRadius: 4,
                        minHeight: '400px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.04)'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" fontWeight="700">Recent Uploads</Typography>
                            <Chip label={`${documents.length} Files`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                        </Box>
                        <Divider sx={{ mb: 2 }} />

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                                <CircularProgress color="success" />
                            </Box>
                        ) : documents.length > 0 ? (
                            <List disablePadding>
                                {documents.map((doc, idx) => (
                                    <ListItem
                                        key={idx}
                                        divider={idx !== documents.length - 1}
                                        sx={{
                                            px: 2,
                                            py: 2,
                                            borderRadius: 2,
                                            transition: 'bgcolor 0.2s',
                                            '&:hover': { bgcolor: alpha('#1B5E20', 0.02) }
                                        }}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                component="a"
                                                href={doc.url}
                                                download
                                                target="_blank"
                                                sx={{ color: '#1B5E20' }}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemIcon sx={{ minWidth: 50 }}>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 2,
                                                bgcolor: alpha('#1B5E20', 0.08),
                                                color: '#1B5E20',
                                                display: 'flex'
                                            }}>
                                                <InsertDriveFileIcon />
                                            </Box>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="body1" fontWeight="600">{doc.name}</Typography>}
                                            secondary={
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                                    <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span>{formatSize(doc.size)}</span>
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Box sx={{ py: 8, textAlign: 'center' }}>
                                <InsertDriveFileIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2, opacity: 0.3 }} />
                                <Typography variant="body1" color="text.secondary" fontWeight="500">No documents found</Typography>
                                <Typography variant="body2" color="text.disabled">Your uploaded records will appear here.</Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
