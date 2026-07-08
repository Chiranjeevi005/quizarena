import React from "react";

interface UniversalPageTemplateProps {
  title: string;
  description?: string;
  headerActions?: React.ReactNode;
  toolbar?: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
  pagination?: React.ReactNode;
  inspectorDrawer?: React.ReactNode;
  footer?: React.ReactNode;
}

export const UniversalPageTemplate = ({
  title,
  description,
  headerActions,
  toolbar,
  filters,
  children,
  pagination,
  inspectorDrawer,
  footer,
}: UniversalPageTemplateProps) => {
  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      {/* Header & Description */}
      <header className="px-6 py-4 border-b border-gray-800 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="text-gray-400 mt-1 text-sm">{description}</p>}
        </div>
        {headerActions && <div className="flex items-center space-x-3">{headerActions}</div>}
      </header>

      {/* Toolbar & Filters */}
      {(toolbar || filters) && (
        <div className="px-6 py-3 border-b border-gray-800 flex justify-between items-center bg-gray-900/30">
          <div className="flex-1">{toolbar}</div>
          <div>{filters}</div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Inspector Drawer */}
        {inspectorDrawer && (
          <aside className="w-80 border-l border-gray-800 bg-gray-900/50 overflow-y-auto">
            {inspectorDrawer}
          </aside>
        )}
      </div>

      {/* Pagination & Footer */}
      {(pagination || footer) && (
        <footer className="px-6 py-3 border-t border-gray-800 flex justify-between items-center bg-gray-900/30">
          <div>{footer}</div>
          <div>{pagination}</div>
        </footer>
      )}
    </div>
  );
};
