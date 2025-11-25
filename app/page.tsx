'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const ThemeStyles = dynamic(() => import('@/components/ThemeStyles'), { ssr: false });
const RetentionCopilot = dynamic(() => import('@/components/RetentionCopilot'), { ssr: false });
import { DashboardView } from '@/components/views/DashboardView';
import { AnalyseView } from '@/components/views/AnalyseView';
import { ActionView } from '@/components/views/ActionView';

type TabKey = 'dashboard' | 'analyse' | 'act';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [copilotOpen, setCopilotOpen] = useState(true);
  const gridLayoutClass = `mx-auto transition-all duration-300 ${copilotOpen ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10' : ''}`;
  const contentColumnClass = `min-w-0 ${copilotOpen ? 'lg:pr-0' : ''}`;

  return (
    <main className="min-h-screen">
      <ThemeStyles />
      <div className="max-w-[1920px] mx-auto">
        {/* Navigation Header */}
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          copilotOpen={copilotOpen}
          onToggleCopilot={() => setCopilotOpen((prev) => !prev)}
        />
        
        {/* Main Content */}
        <div className="px-4 md:px-8 pb-12">
          <div className={gridLayoutClass}>
            <div className={contentColumnClass}>
              {activeTab === 'dashboard' && (
                <DashboardView onNavigate={(tab) => setActiveTab(tab)} />
              )}

              {activeTab === 'analyse' && (
                <AnalyseView
                  onLaunchPlaybook={() => setActiveTab('act')}
                  onAskCopilot={() => setCopilotOpen(true)}
                />
              )}

              {activeTab === 'act' && (
                <ActionView
                  onOpenNewAction={() => setCopilotOpen(true)}
                  onAskCopilot={() => setCopilotOpen(true)}
                />
              )}
            </div>

            {copilotOpen && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <RetentionCopilot />
                </div>
              </aside>
            )}
          </div>

          {copilotOpen && (
            <div className="mt-8 lg:hidden">
              <RetentionCopilot />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

