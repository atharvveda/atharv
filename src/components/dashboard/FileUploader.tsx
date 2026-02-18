'use client';
import { useState } from 'react';
import { Button, Box, Typography, LinearProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUploader({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/documents', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Upload failed');
            }

            setMessage({ type: 'success', text: 'File uploaded successfully!' });
            setFile(null);
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to upload file.' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box>
            <input
                accept="application/pdf,image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                    Select File
                </Button>
            </label>
            {file && (
                <Box mt={2}>
                    <Typography variant="body2">{file.name}</Typography>
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={uploading}
                        sx={{ mt: 1 }}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </Box>
            )}
            {uploading && <LinearProgress sx={{ mt: 2 }} />}
            {message && (
                <Alert severity={message.type} sx={{ mt: 2 }}>
                    {message.text}
                </Alert>
            )}
        </Box>
    );
}
