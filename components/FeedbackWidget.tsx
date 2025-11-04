'use client';

import { motion } from 'framer-motion';
import { DollarSign, Tv, Settings, Coffee, Gift, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackWidget() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const reasons = [
    { id: 'price', label: 'Price', icon: <DollarSign size={24} />, emoji: '💸' },
    { id: 'content', label: 'Content', icon: <Tv size={24} />, emoji: '📺' },
    { id: 'service', label: 'Service', icon: <Settings size={24} />, emoji: '⚙️' },
    { id: 'break', label: 'Taking a break', icon: <Coffee size={24} />, emoji: '💤' },
  ];

  const handleReasonSelect = (reasonId: string) => {
    setSelectedReason(reasonId);
    setTimeout(() => {
      setShowThankYou(true);
    }, 500);
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="max-w-2xl mx-auto">
        {!showThankYou ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <MessageSquare size={32} className="text-sky-400" />
                <h2 className="text-2xl font-bold text-white">We&apos;d Love Your Feedback</h2>
              </div>
              <p className="text-gray-400 text-lg">Before you go — mind sharing why?</p>
              <p className="text-gray-500 text-sm mt-2">Your feedback helps us improve our service</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reasons.map((reason, index) => (
                <motion.button
                  key={reason.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReasonSelect(reason.id)}
                  className={`relative bg-navy-900/50 border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedReason === reason.id
                      ? 'border-sky-400 bg-sky-500/20'
                      : 'border-sky-500/20 hover:border-sky-400/50'
                  }`}
                >
                  <div className="text-4xl mb-3">{reason.emoji}</div>
                  <div className="text-white font-semibold mb-2">{reason.label}</div>
                  
                  {selectedReason === reason.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <textarea
                placeholder="Any additional comments? (optional)"
                className="w-full bg-navy-900/50 border border-sky-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                rows={3}
              />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Gift size={48} className="text-white" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white mb-3">Thank You! 🎁</h3>
            <p className="text-gray-400 text-lg mb-6">
              Your feedback helps us improve. Here&apos;s a little something for you:
            </p>
            
            <div className="bg-gradient-to-r from-sky-500/20 to-blue-600/20 border-2 border-sky-400 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-sky-400 font-bold text-xl mb-2">1-Week Sky Go Pass</p>
              <p className="text-gray-300 text-sm mb-4">Watch your favorite shows on any device</p>
              <div className="bg-navy-900 border border-sky-500 rounded-lg p-3 mb-4">
                <p className="text-white font-mono text-lg tracking-wider">SKYTHANKS24</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Activate Pass
              </motion.button>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              We&apos;d love to have you back. Check your email for exclusive return offers.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

