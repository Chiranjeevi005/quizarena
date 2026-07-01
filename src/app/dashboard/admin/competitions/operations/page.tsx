import React from 'react';
import { PlatformDashboard } from '@/features/platform/operations/dashboard/PlatformDashboard';

export const metadata = {
  title: 'Platform Operations | QuizArena',
  description: 'Global observability, health monitoring, and incident response.',
};

export default function OperationsPage() {
  return <PlatformDashboard />;
}
