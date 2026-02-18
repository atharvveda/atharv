import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './Providers';
import DashboardLayout, { MenuItem } from '../../components/dashboard/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MedicationIcon from '@mui/icons-material/Medication';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import DescriptionIcon from '@mui/icons-material/Description';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const metadata: Metadata = {
    title: 'Patient Dashboard | Atharv Veda',
    description: 'Patient Dashboard for Atharv Veda',
    robots: {
        index: false,
        follow: false,
    },
};

const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: <DashboardIcon />, href: '/patient/dashboard' },
    { label: 'Diet Plan', icon: <RestaurantMenuIcon />, href: '/patient/diet' },
    { label: 'Medications', icon: <MedicationIcon />, href: '/patient/medications' },
    { label: 'Consultations', icon: <VideoCameraFrontIcon />, href: '/patient/consultations' },
    { label: 'Documents', icon: <DescriptionIcon />, href: '/patient/documents' },
    { label: 'Support', icon: <SupportAgentIcon />, href: '/patient/support' },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <Providers>
                        <DashboardLayout title="Patient Dashboard" menuItems={menuItems}>
                            {children}
                        </DashboardLayout>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
