import React, { useState } from 'react';
import { type LucideIcon } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  component: React.ReactNode;
}

interface SettingsLayoutProps {
  tabs: TabItem[];
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[500px]">
      
      {/* SIDEBAR TABS (Mobile: Horizontal Scroll, Desktop: Vertical List) */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white border border-border lg:sticky lg:top-6 overflow-hidden">
          <div className="flex lg:flex-col overflow-x-auto no-scrollbar divide-y divide-primary">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-3 px-4 py-4 lg:py-3 text-sm font-medium transition-all whitespace-nowrap
                    border-b lg:border-b-0 lg:border-r-4
                    ${isActive 
                      ? 'bg-primary/10 text-primary border-primary' 
                      : 'text-text-muted hover:bg-neutral-50 border-transparent hover:text-text-primary'}
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-primary' : 'text-text-muted'} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 bg-white border border-border p-6 lg:p-8">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <div className="mb-6 border-b border-border pb-4">
              <h2 className="text-xl font-bold text-text-primary font-cairo flex items-center gap-2">
                <tab.icon className="text-text-muted" />
                {tab.label}
              </h2>
            </div>
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};