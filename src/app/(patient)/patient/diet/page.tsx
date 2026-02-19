'use client';

import { useEffect, useState } from 'react';
import {
    Typography, Paper, Box, Divider, Chip, CircularProgress, Grid, Card, CardContent,
    Button, Alert
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CookieIcon from '@mui/icons-material/Cookie';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';

const mealIcons: Record<string, any> = {
    breakfast: <FreeBreakfastIcon />,
    lunch: <LunchDiningIcon />,
    dinner: <DinnerDiningIcon />,
    snacks: <CookieIcon />,
    drinks: <LocalCafeIcon />,
};

const mealColors: Record<string, string> = {
    breakfast: '#ff9800',
    lunch: '#4caf50',
    dinner: '#2196f3',
    snacks: '#e91e63',
    drinks: '#9c27b0',
};

export default function DietPage() {
    const [diet, setDiet] = useState<any[]>([]);
    const [pdfs, setPdfs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/diet').then(r => r.json()),
            fetch('/api/diet/pdf').then(r => r.json()),
        ]).then(([dietRes, pdfRes]) => {
            setDiet(dietRes.diet || []);
            setPdfs(pdfRes.files || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks', 'drinks'];
    const groupedDiet = mealTypes.reduce((acc, type) => {
        acc[type] = diet.filter(d => d.meal_type === type);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                My Diet Plan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Your personalized diet plan prescribed by the doctor.
            </Typography>

            {/* Diet Plan PDFs Section */}
            {pdfs.length > 0 && (
                <Paper sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'success.light', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <PictureAsPdfIcon color="error" />
                        <Typography variant="h6" fontWeight="bold">Diet Plan Documents</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        {pdfs.map((pdf: any, i: number) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Card variant="outlined" sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    p: 2, transition: 'box-shadow 0.2s',
                                    '&:hover': { boxShadow: 3 }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
                                        <PictureAsPdfIcon color="error" sx={{ fontSize: 32, flexShrink: 0 }} />
                                        <Box sx={{ overflow: 'hidden' }}>
                                            <Typography variant="body2" fontWeight="bold" noWrap>
                                                {pdf.name.replace(/^\d+-/, '')}
                                            </Typography>
                                            {pdf.created_at && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(pdf.created_at).toLocaleDateString()}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    {pdf.url && (
                                        <Button
                                            href={pdf.url}
                                            target="_blank"
                                            size="small"
                                            variant="contained"
                                            startIcon={<DownloadIcon />}
                                            sx={{ flexShrink: 0, ml: 1 }}
                                        >
                                            Download
                                        </Button>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}

            {/* Text-based diet entries */}
            {diet.length === 0 && pdfs.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                        <RestaurantMenuIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No diet plan assigned yet.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your doctor will upload your personalized diet chart soon.
                        </Typography>
                    </Box>
                </Paper>
            ) : diet.length > 0 && (
                <>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Meal Plan</Typography>
                    <Grid container spacing={3}>
                        {mealTypes.map(type => {
                            const items = groupedDiet[type];
                            if (!items || items.length === 0) return null;
                            return (
                                <Grid size={{ xs: 12, md: 6 }} key={type}>
                                    <Card sx={{ height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                <Box sx={{ color: mealColors[type] }}>{mealIcons[type]}</Box>
                                                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{type}</Typography>
                                            </Box>
                                            <Divider sx={{ mb: 2 }} />
                                            {items.map((item: any) => (
                                                <Box key={item.id} sx={{ mb: 2 }}>
                                                    <Typography variant="body1" fontWeight="bold">{item.items}</Typography>
                                                    {item.instructions && (
                                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                                            {item.instructions}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
        </Box>
    );
}
