import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session || session.role !== 'admin') {
        redirect('/login');
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
