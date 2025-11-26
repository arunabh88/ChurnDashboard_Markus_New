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
type AnalyseMode = 'overview' | 'segments';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [analyseMode, setAnalyseMode] = useState<AnalyseMode>('overview');
  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (tab !== 'analyse') {
      setAnalyseMode('overview');
    }
  };
  const gridLayoutClass = `mx-auto transition-all duration-300 ${copilotOpen ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_450px] lg:gap-10' : ''}`;
  const contentColumnClass = `min-w-0 ${copilotOpen ? 'lg:pr-0' : ''}`;

  return (
    <main className="min-h-screen">
      <ThemeStyles />
      <div className="max-w-[1920px] mx-auto">
        {/* Navigation Header */}
        <Navigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          copilotOpen={copilotOpen}
          onToggleCopilot={() => setCopilotOpen((prev) => !prev)}
        />
        
        {/* Main Content */}
        <div className="px-4 md:px-8 pb-12">
          <div className={gridLayoutClass}>
            <div className={contentColumnClass}>
              {activeTab === 'dashboard' && (
                <DashboardView
                  onNavigate={(tab) => {
                    handleTabChange(tab);
                    if (tab === 'analyse') {
                      setAnalyseMode('overview');
                    }
                  }}
                  onViewSegments={() => {
                    handleTabChange('analyse');
                    setAnalyseMode('segments');
                  }}
                  onStageAction={(stage) => {
                    handleTabChange('act');
                  }}
                />
              )}

              {activeTab === 'analyse' && (
                <AnalyseView
                  mode={analyseMode}
                  onLaunchPlaybook={() => handleTabChange('act')}
                  onShowSegments={() => setAnalyseMode('segments')}
                  onBackToOverview={() => setAnalyseMode('overview')}
                />
              )}

              {activeTab === 'act' && (
                <ActionView onOpenNewAction={() => setCopilotOpen(true)} />
              )}
            </div>

                    {copilotOpen && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                          <RetentionCopilot onClose={() => setCopilotOpen(false)} />
                </div>
              </aside>
            )}
          </div>

                  {copilotOpen && (
            <div className="mt-8 lg:hidden">
                      <RetentionCopilot onClose={() => setCopilotOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

