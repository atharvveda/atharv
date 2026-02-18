'use client';

import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Divider, Chip, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CookieIcon from '@mui/icons-material/Cookie';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/diet')
            .then(r => r.json())
            .then(data => {
                setDiet(data.diet || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                My Diet Plan
            </Typography>

            {diet.length === 0 ? (
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
            ) : (
                <Grid container spacing={3}>
                    {mealTypes.map(type => {
                        const items = groupedDiet[type];
                        if (!items || items.length === 0) return null;
                        return (
                            <Grid size={{ xs: 12, md: 6 }} key={type}>
                                <Card sx={{ height: '100%' }}>
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
            )}
        </Box>
    );
}
