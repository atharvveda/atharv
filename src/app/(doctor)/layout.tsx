import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './Providers';
import DashboardLayout, { MenuItem } from '../../components/dashboard/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DescriptionIcon from '@mui/icons-material/Description';

export const metadata: Metadata = {
    title: 'Doctor Dashboard | Atharv Veda',
    description: 'Doctor Dashboard for Atharv Veda',
    robots: {
        index: false,
        follow: false,
    },
};

const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: <DashboardIcon />, href: '/doctor/dashboard' },
    { label: 'Enrollment', icon: <PersonAddIcon />, href: '/doctor/enrollment' },
    { label: 'Patients', icon: <PeopleIcon />, href: '/doctor/patients' },
    { label: 'Document Vault', icon: <DescriptionIcon />, href: '/doctor/documents' },
    { label: 'Support Tickets', icon: <SupportAgentIcon />, href: '/doctor/support' },
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
                        <DashboardLayout title="Doctor Dashboard" menuItems={menuItems}>
                            {children}
                        </DashboardLayout>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
