import { Typography, Paper, Box, Divider, List, ListItem, ListItemText, ListItemIcon, Grid } from '@mui/material';
import FileUploader from '../../../../components/dashboard/FileUploader';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function DocumentsPage() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                My Documents
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom>Upload New Document</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <FileUploader />
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 4, minHeight: '300px' }}>
                        <Typography variant="h6" gutterBottom>Uploaded Files</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            <ListItem>
                                <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
                                <ListItemText primary="No documents found" secondary="Uploaded documents will appear here" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
