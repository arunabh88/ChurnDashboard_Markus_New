'use client';

import { motion } from 'framer-motion';
import HeaderBar from '@/components/HeaderBar';
import JourneyMap from '@/components/JourneyMap';
import MultiSignalMatrix from '@/components/MultiSignalMatrix';
import DecisionLayer from '@/components/DecisionLayer';
import ActionCenter from '@/components/ActionCenter';
import RetentionCopilot from '@/components/RetentionCopilot';
import ABExperimentation from '@/components/ABExperimentation';
import ChurnValidation from '@/components/ChurnValidation';
import FeedbackWidget from '@/components/FeedbackWidget';
import MaturityTracker from '@/components/MaturityTracker';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <HeaderBar />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Dashboard Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Journey Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <JourneyMap />
            </motion.div>

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <FeedbackWidget />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <MaturityTracker />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Retention Copilot (Sticky) */}
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
      </div>
    </main>
  );
}

