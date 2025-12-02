'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const ThemeStyles = dynamic(() => import('@/components/ThemeStyles'), { ssr: false });
const RetentionCopilot = dynamic(() => import('@/components/RetentionCopilot'), { ssr: false });
import { DashboardView } from '@/components/views/DashboardView';
import { AnalyseView } from '@/components/views/AnalyseView';
import { ActionView } from '@/components/views/ActionView';
import { SubscriberListView } from '@/components/views/SubscriberListView';
import { ChurnRateDeepDive } from '@/components/views/ChurnRateDeepDive';
import { HighRiskSubscribersDeepDive } from '@/components/views/HighRiskSubscribersDeepDive';
import { EarlyLifecycleChurnDeepDive } from '@/components/views/EarlyLifecycleChurnDeepDive';
import { CltvCacDeepDive } from '@/components/views/CltvCacDeepDive';

type TabKey = 'dashboard' | 'analyse' | 'act';
type AnalyseMode = 'overview' | 'segments' | 'trial-triggers' | 'new-users-triggers' | 'established-users-triggers';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [analyseMode, setAnalyseMode] = useState<AnalyseMode>('overview');
  const [analyseFocus, setAnalyseFocus] = useState<string | null>(null);
  const [actionsFocus, setActionsFocus] = useState<string | null>(null);
  const [navigationSource, setNavigationSource] = useState<'dashboard' | 'analyse' | null>(null);
  const [subscribersView, setSubscribersView] = useState(false);
  const [churnRateView, setChurnRateView] = useState(false);
  const [highRiskView, setHighRiskView] = useState(false);
  const [earlyLifecycleView, setEarlyLifecycleView] = useState(false);
  const [cltvCacView, setCltvCacView] = useState(false);
  
  const handleTabChange = (tab: TabKey) => {
    // Close all deep dive views when navigating to a different tab
    if (subscribersView) {
      setSubscribersView(false);
    }
    if (churnRateView) {
      setChurnRateView(false);
    }
    if (highRiskView) {
      setHighRiskView(false);
    }
    if (earlyLifecycleView) {
      setEarlyLifecycleView(false);
    }
    if (cltvCacView) {
      setCltvCacView(false);
    }
    setActiveTab(tab);
    if (tab !== 'analyse') {
      setAnalyseMode('overview');
      setAnalyseFocus(null);
      setNavigationSource(null);
    }
    if (tab !== 'act') {
      setActionsFocus(null);
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
              {subscribersView ? (
                <SubscriberListView
                  onBack={() => {
                    setSubscribersView(false);
                    setActiveTab('dashboard');
                  }}
                  onNavigateToAction={(action, subscribers) => {
                    console.log('Navigate to action:', action, subscribers);
                    // Navigate to Action tab with pre-filled data
                    setActionsFocus(action);
                    handleTabChange('act');
                  }}
                />
              ) : churnRateView ? (
                <ChurnRateDeepDive
                  onBack={() => {
                    setChurnRateView(false);
                    setActiveTab('dashboard');
                  }}
                  onNavigateToAction={(action, context) => {
                    setActionsFocus(action);
                    handleTabChange('act');
                  }}
                  onNavigateToAnalyse={() => {
                    setNavigationSource('dashboard');
                    setAnalyseMode('overview');
                    setAnalyseFocus('monthly-churn');
                    handleTabChange('analyse');
                  }}
                />
              ) : highRiskView ? (
                <HighRiskSubscribersDeepDive
                  onBack={() => {
                    setHighRiskView(false);
                    setActiveTab('dashboard');
                  }}
                  onNavigateToAction={(action, subscribers) => {
                    setActionsFocus(action);
                    handleTabChange('act');
                  }}
                />
              ) : earlyLifecycleView ? (
                <EarlyLifecycleChurnDeepDive
                  onBack={() => {
                    setEarlyLifecycleView(false);
                    setActiveTab('dashboard');
                  }}
                  onNavigateToAction={(action, context) => {
                    setActionsFocus(action);
                    handleTabChange('act');
                  }}
                  onNavigateToDrilldown={(mode) => {
                    setNavigationSource('dashboard');
                    setAnalyseMode(mode);
                    handleTabChange('analyse');
                  }}
                />
              ) : cltvCacView ? (
                <CltvCacDeepDive
                  onBack={() => {
                    setCltvCacView(false);
                    setActiveTab('dashboard');
                  }}
                  onNavigateToAction={(action, context) => {
                    setActionsFocus(action);
                    handleTabChange('act');
                  }}
                />
              ) : activeTab === 'dashboard' ? (
                <DashboardView
                  onNavigateAnalyse={(anchor, mode = 'overview') => {
                    setNavigationSource('dashboard');
                    setAnalyseMode(mode);
                    setAnalyseFocus(anchor ?? null);
                    handleTabChange('analyse');
                  }}
                  onNavigateActions={(anchor) => {
                    setActionsFocus(anchor ?? null);
                    handleTabChange('act');
                  }}
                  onNavigateSubscribers={() => {
                    setSubscribersView(true);
                  }}
                  onNavigateChurnRate={() => {
                    setChurnRateView(true);
                  }}
                  onNavigateHighRisk={() => {
                    setHighRiskView(true);
                  }}
                  onNavigateEarlyLifecycle={() => {
                    setEarlyLifecycleView(true);
                  }}
                  onNavigateCltvCac={() => {
                    setCltvCacView(true);
                  }}
                />
              ) : activeTab === 'analyse' ? (
                <AnalyseView
                  mode={analyseMode}
                  navigationSource={navigationSource}
                  onLaunchPlaybook={() => handleTabChange('act')}
                  onShowSegments={() => {
                    setNavigationSource('analyse');
                    setAnalyseMode('segments');
                  }}
                  onBackToOverview={() => {
                    setAnalyseMode('overview');
                    setNavigationSource(null);
                  }}
                  onNavigateToDrilldown={(mode) => {
                    // If navigating to drill-down from Analyse tab, keep source as 'analyse'
                    if (navigationSource !== 'dashboard') {
                      setNavigationSource('analyse');
                    }
                    setAnalyseMode(mode);
                  }}
                  onNavigateToDashboard={() => handleTabChange('dashboard')}
                  focus={analyseFocus}
                />
              ) : activeTab === 'act' ? (
                <ActionView
                  onOpenNewAction={() => setCopilotOpen(true)}
                  focus={actionsFocus}
                  onReviewSegment={(segment) => {
                    setAnalyseFocus(segment.toLowerCase().replace(/\s+/g, '-'));
                    handleTabChange('analyse');
                  }}
                />
              ) : null}
            </div>

                    {copilotOpen && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                          <RetentionCopilot context={activeTab} onClose={() => setCopilotOpen(false)} />
                </div>
              </aside>
            )}
          </div>

                  {copilotOpen && (
            <div className="mt-8 lg:hidden">
                      <RetentionCopilot context={activeTab} onClose={() => setCopilotOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

