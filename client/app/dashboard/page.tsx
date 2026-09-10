import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Chat workspace',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
