import React from 'react';
import { QuickActionRegistry } from '../../registry/QuickActionRegistry';
import { useAdmin } from '../../context/AdminContext';
import { WidgetRegistry } from '../../registry/WidgetRegistry';
import Link from 'next/link';
import { Plus, Users, Settings } from 'lucide-react';
import { DashboardReadModel } from '../DashboardReadModel';

// Register Default Actions
QuickActionRegistry.register({
  id: 'new-competition',
  title: 'New Competition',
  icon: Plus,
  href: '/super-admin/competitions/new',
  permission: 'view:competitions'
});

QuickActionRegistry.register({
  id: 'invite-sme',
  title: 'Invite SME',
  icon: Users,
  href: '/super-admin/people/invite',
  permission: 'view:people'
});

QuickActionRegistry.register({
  id: 'platform-settings',
  title: 'Platform Settings',
  icon: Settings,
  href: '/super-admin/settings',
  permission: 'view:settings'
});


export const QuickActionsWidget = ({ data }: { data: DashboardReadModel }) => {
  const { permissions, capabilities } = useAdmin();
  const actions = QuickActionRegistry.getActions(permissions, capabilities);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 md:col-span-2 xl:col-span-4">
      <h3 className="text-gray-400 text-sm font-medium mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <Link 
              key={action.id} 
              href={action.href}
              className="flex items-center space-x-2 bg-gray-950 border border-gray-800 hover:border-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-gray-200">{action.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

WidgetRegistry.register({
  id: 'quick-actions',
  title: 'Quick Actions',
  description: 'Fast links to common tasks',
  priority: 5,
  refreshInterval: 0,
  category: 'core',
  provider: QuickActionsWidget
});
