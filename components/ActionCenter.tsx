'use client';

import { motion } from 'framer-motion';
import { Gift, Tv, DollarSign, MessageCircle, Play, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Action {
  id: string;
  title: string;
  description: string;
  expectedLift: number;
  icon: React.ReactNode;
  type: 'discount' | 'content' | 'pricing' | 'feedback';
}

export default function ActionCenter() {
  const [autoAction, setAutoAction] = useState(false);
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  const actions: Action[] = [
    {
      id: '1',
      title: 'Offer Loyalty Discount',
      description: 'Provide 20% discount to high-value subscribers at risk',
      expectedLift: 12,
      icon: <Gift size={24} />,
      type: 'discount',
    },
    {
      id: '2',
      title: 'Launch Re-engagement Campaign',
      description: '"Because you liked..." personalized content recommendations',
      expectedLift: 18,
      icon: <Tv size={24} />,
      type: 'content',
    },
    {
      id: '3',
      title: 'Introduce Ad-supported Plan',
      description: 'Lower-cost tier for price-sensitive segments',
      expectedLift: 15,
      icon: <DollarSign size={24} />,
      type: 'pricing',
    },
    {
      id: '4',
      title: 'Trigger Exit Feedback',
      description: 'One-click survey to understand churn reasons',
      expectedLift: 8,
      icon: <MessageCircle size={24} />,
      type: 'feedback',
    },
  ];

  const handleTriggerAction = (actionId: string) => {
    setShowAIPrompt(true);
    setTimeout(() => setShowAIPrompt(false), 5000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount': return 'from-purple-500 to-pink-500';
      case 'content': return 'from-blue-500 to-cyan-500';
      case 'pricing': return 'from-green-500 to-emerald-500';
      case 'feedback': return 'from-orange-500 to-yellow-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Action Center</h2>
          <p className="text-gray-400">AI-driven retention recommendations</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-300 text-sm">Auto Action</span>
            <div
              onClick={() => setAutoAction(!autoAction)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                autoAction ? 'bg-sky-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: autoAction ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
              />
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-navy-900/50 border border-sky-500/20 rounded-lg p-6 cursor-pointer relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getTypeColor(action.type)} opacity-10 rounded-full blur-2xl`} />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getTypeColor(action.type)}`}>
                  {action.icon}
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Expected Lift</p>
                  <p className="text-2xl font-bold text-green-400">+{action.expectedLift}%</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{action.description}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTriggerAction(action.id)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold action-center-button"
              >
                <Play size={16} />
                <span className="text-white">Trigger Action Now</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Prompt */}
      {showAIPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 p-6 bg-gradient-to-r from-sky-500/20 to-blue-600/20 border-2 border-sky-400 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={32} className="text-sky-400" />
            </motion.div>
            <div className="flex-1">
              <p className="text-white font-semibold text-lg mb-2">AI Einstein is ready</p>
              <p className="text-gray-300 mb-4">
                Would you like me to run this playbook for all users with churn risk &gt;70% and CLTV &gt;£200?
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-sky-500 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  <Zap size={16} />
                  Yes, Run Playbook
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAIPrompt(false)}
                  className="px-6 py-2 rounded-lg font-semibold border border-sky-500 text-sky-400"
                >
                  Customize First
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}


