'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const HeaderBar = dynamic(() => import('@/components/HeaderBar'), { ssr: false });
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const ThemeStyles = dynamic(() => import('@/components/ThemeStyles'), { ssr: false });
import JourneyMap from '@/components/JourneyMap';
import MultiSignalMatrix from '@/components/MultiSignalMatrix';
import DecisionLayer from '@/components/DecisionLayer';
import ActionCenter from '@/components/ActionCenter';
import RetentionCopilot from '@/components/RetentionCopilot';
import ABExperimentation from '@/components/ABExperimentation';
import ChurnValidation from '@/components/ChurnValidation';
import ChurnAnalysisPage from '@/components/ChurnAnalysisPage';
import SubscribersPage from '@/components/SubscribersPage';
import AnalyticsPage from '@/components/AnalyticsPage';

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <main className="min-h-screen">
      <ThemeStyles />
      <div className="max-w-[1920px] mx-auto">
        {/* Navigation Header */}
        <Navigation activePage={activePage} onPageChange={setActivePage} />
        
        {/* Main Content */}
        <div className="px-4 md:px-8">
          {/* Dashboard Page */}
          {activePage === 'dashboard' && (
            <>
              {/* Header */}
              <HeaderBar />

              {/* Journey Map - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <JourneyMap />
              </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Dashboard Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Multi-Signal Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MultiSignalMatrix />
            </motion.div>

            {/* Decision Layer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <DecisionLayer />
            </motion.div>

            {/* Action Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ActionCenter />
            </motion.div>

            {/* Two Column Grid for Experimentation & Validation */}
            <div className="grid grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ABExperimentation />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <ChurnValidation />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Agentforce (Sticky) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-8"
            >
              <RetentionCopilot />
            </motion.div>
          </div>
        </div>

              {/* Footer */}
              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-center text-gray-500 text-sm pb-8"
              >
                <p>Sky TV Retention Intelligence Dashboard · Powered by Salesforce Einstein & Data Cloud</p>
                <p className="mt-2">© 2025 Sky TV · Built with Next.js, React, and Tailwind CSS</p>
              </motion.footer>
            </>
          )}

          {/* Churn Analysis Page */}
          {activePage === 'churn' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChurnAnalysisPage />
            </motion.div>
          )}

          {/* Subscribers Page */}
          {activePage === 'subscribers' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SubscribersPage />
            </motion.div>
          )}

          {/* Analytics Page */}
          {activePage === 'analytics' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnalyticsPage />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

