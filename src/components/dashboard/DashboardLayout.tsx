'use client';

import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const DRAWER_WIDTH = 270;

/* ────────────────────────────────────────────────
   Styled components
──────────────────────────────────────────────── */

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    isDesktop?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isDesktop',
})<AppBarProps>(({ theme, open, isDesktop }) => ({
    background: 'linear-gradient(135deg, #0f3d22 0%, #1a5c33 50%, #0f3d22 100%)',
    boxShadow: '0 1px 0 rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.25)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isDesktop && open && {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isDesktop',
})<{ open?: boolean; isDesktop?: boolean }>(({ theme, open, isDesktop }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #f4f8f5 0%, #eef4f0 100%)',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isDesktop && {
        marginLeft: `-${DRAWER_WIDTH}px`,
        ...(open && {
            marginLeft: 0,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2, 1.5, 2.5),
    minHeight: 72,
}));

/* ────────────────────────────────────────────────
   Public interface
──────────────────────────────────────────────── */

export interface MenuItem {
    label: string;
    icon: React.ReactNode;
    href: string;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
    menuItems: MenuItem[];
}

/* ────────────────────────────────────────────────
   Component
──────────────────────────────────────────────── */

export default function DashboardLayout({ children, title, menuItems }: DashboardLayoutProps) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = React.useState(false); // start closed; opens on mount if desktop
    const pathname = usePathname();

    // On desktop: open sidebar by default; on mobile: keep closed
    React.useEffect(() => {
        setOpen(isDesktop);
    }, [isDesktop]);

    // Close sidebar when navigating on mobile
    React.useEffect(() => {
        if (!isDesktop) setOpen(false);
    }, [pathname, isDesktop]);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

    /* ── Sidebar content (shared between temporary & persistent) ── */
    const drawerContent = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, #0d2e18 0%, #163d24 60%, #0f3320 100%)',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <DrawerHeader>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            overflow: 'hidden',
                            flexShrink: 0,
                            border: '2px solid rgba(255,255,255,0.15)',
                        }}
                    >
                        <Image
                            src="/assets/uploads/dash_logo.jpeg"
                            alt="Atharv Veda Logo"
                            width={40}
                            height={40}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                            sx={{ color: '#fff', lineHeight: 1.1, letterSpacing: -0.3 }}
                        >
                            Atharv Veda
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 0.3 }}>
                            Health Portal
                        </Typography>
                    </Box>
                </Box>

                <IconButton
                    onClick={handleDrawerClose}
                    size="small"
                    sx={{
                        color: 'rgba(255,255,255,0.6)',
                        bgcolor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.15)',
                            color: '#fff',
                        },
                        transition: 'all 0.2s',
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DrawerHeader>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2, mb: 1 }} />

            {/* Nav Items */}
            <List sx={{ px: 1.5, pt: 1, flexGrow: 1, overflowY: 'auto' }}>
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                selected={active}
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1.4,
                                    px: 2,
                                    transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                                    ...(active && {
                                        background: 'linear-gradient(135deg, rgba(74,183,103,0.35) 0%, rgba(46,140,68,0.25) 100%)',
                                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            top: '15%',
                                            bottom: '15%',
                                            width: 3,
                                            borderRadius: '0 3px 3px 0',
                                            background: 'linear-gradient(180deg, #6fcf8a, #4ab867)',
                                        },
                                    }),
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.08)',
                                        color: '#fff',
                                        transform: 'translateX(3px)',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: active ? '#6fcf8a' : 'rgba(255,255,255,0.5)',
                                    },
                                    '&:hover .MuiListItemIcon-root': {
                                        color: '#6fcf8a',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 38, transition: 'color 0.2s' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: active ? 700 : 500,
                                        fontSize: '0.88rem',
                                        letterSpacing: 0.1,
                                    }}
                                />
                                {active && (
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            bgcolor: '#6fcf8a',
                                            flexShrink: 0,
                                            boxShadow: '0 0 6px #6fcf8a',
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Footer – Home link */}
            <Box sx={{ p: 2 }}>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />
                <ListItemButton
                    component={Link}
                    href="/"
                    sx={{
                        borderRadius: 2.5,
                        py: 1.2,
                        px: 2,
                        color: 'rgba(255,255,255,0.55)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            borderColor: 'rgba(255,255,255,0.18)',
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 34, color: 'rgba(255,255,255,0.45)' }}>
                        <HomeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Back to Home"
                        primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: 500 }}
                    />
                </ListItemButton>

                {/* User info strip */}
                <Box
                    sx={{
                        mt: 1.5,
                        p: 1.5,
                        borderRadius: 2.5,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                    }}
                >
                    <SignedIn>
                        <UserButton />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', flexGrow: 1 }}>
                            Account
                        </Typography>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* ── AppBar ── */}
            <AppBar position="fixed" open={open} isDesktop={isDesktop}>
                <Toolbar sx={{ minHeight: { xs: 60, sm: 64 }, gap: 1 }}>
                    {/* Hamburger – always shown on mobile; shown on desktop when closed */}
                    <IconButton
                        color="inherit"
                        aria-label="open sidebar"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            mr: 0.5,
                            ...(isDesktop && open && { display: 'none' }),
                            width: 38,
                            height: 38,
                            borderRadius: 1.5,
                            bgcolor: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.2s',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' },
                        }}
                    >
                        <MenuIcon sx={{ fontSize: 20 }} />
                    </IconButton>

                    {/* Logo pill (visible on mobile) */}
                    {!isDesktop && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 1.5,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    flexShrink: 0,
                                }}
                            >
                                <Image
                                    src="/assets/uploads/dash_logo.jpeg"
                                    alt="Logo"
                                    width={30}
                                    height={30}
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </Box>
                            <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                sx={{
                                    color: '#fff',
                                    letterSpacing: -0.2,
                                    fontSize: '0.9rem',
                                    maxWidth: 160,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {title}
                            </Typography>
                        </Box>
                    )}

                    {isDesktop && (
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: -0.3, fontSize: '1.05rem' }}
                        >
                            {title}
                        </Typography>
                    )}

                    {/* Right side: UserButton in AppBar (desktop/tablet only) */}
                    <Box sx={{ display: isDesktop ? 'flex' : 'none', alignItems: 'center', gap: 1 }}>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                    </Box>

                    {/* On mobile, UserButton is in sidebar footer; show nothing here */}
                    <Box sx={{ display: isDesktop ? 'none' : 'flex', alignItems: 'center' }}>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* ── Sidebar: TEMPORARY on mobile ── */}
            {!isDesktop && (
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={open}
                    onClose={handleDrawerClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            border: 'none',
                            boxShadow: '4px 0 40px rgba(0,0,0,0.4)',
                        },
                        '& .MuiBackdrop-root': {
                            backdropFilter: 'blur(4px)',
                            backgroundColor: 'rgba(0,0,0,0.55)',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* ── Sidebar: PERSISTENT on desktop ── */}
            {isDesktop && (
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            border: 'none',
                            boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* ── Main Content ── */}
            <Main open={open} isDesktop={isDesktop}>
                {/* Spacer matching AppBar height */}
                <Box sx={{ height: { xs: 60, sm: 64 } }} />
                {children}
            </Main>
        </Box>
    );
}
