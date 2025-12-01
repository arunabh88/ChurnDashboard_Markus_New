'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, TrendingUp, Eye, X, UserPlus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  actions?: Array<{ label: string; onClick: () => void }>;
}

type CopilotContext = 'dashboard' | 'analyse' | 'act';

interface CopilotConfig {
  prompt: string;
  quickActions: Array<{ label: string; icon: React.ReactNode }>;
}

interface RetentionCopilotProps {
  onClose?: () => void;
  context?: CopilotContext;
}

export default function RetentionCopilot({ onClose, context }: RetentionCopilotProps) {
  const contextKey: CopilotContext = context ?? 'dashboard';
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const config = useMemo<CopilotConfig>(() => {
    switch (contextKey) {
      case 'analyse':
        return {
          prompt:
            "You're in diagnostics mode. Ask me to explain churn spikes, surface signal drivers, compare segments, or create actions for specific triggers.",
          quickActions: [
            { label: 'Explain this signal', icon: <TrendingUp size={16} /> },
            { label: "What's driving churn in Trial segment?", icon: <Eye size={16} /> },
            { label: 'Create action for this segment', icon: <Sparkles size={16} /> },
            { label: 'Compare segment performance', icon: <UserPlus size={16} /> },
          ],
        };
      case 'act':
        return {
          prompt:
            "Ready to execute. Ask why campaigns are underperforming, recommend playbooks, clone winning campaigns, or review performance trends.",
          quickActions: [
            { label: 'Why is this campaign underperforming?', icon: <TrendingUp size={16} /> },
            { label: 'Recommend playbook for Trial segment', icon: <Sparkles size={16} /> },
            { label: 'Clone and optimize Loyalty Discount', icon: <User size={16} /> },
            { label: 'Review performance trends', icon: <Eye size={16} /> },
          ],
        };
      default:
        return {
          prompt:
            "Hi! I'm your Retention AI Agent. I can help identify at-risk subscribers and suggest targeted retention strategies. What would you like to explore?",
          quickActions: [
            { label: 'Show trial-phase risks', icon: <TrendingUp size={16} /> },
            { label: 'High-value churners', icon: <User size={16} /> },
            { label: 'Content engagement gaps', icon: <Eye size={16} /> },
          ],
        };
    }
  }, [contextKey]);

  const generateAIResponse = useCallback(
    (input: string): string => {
    const lowerInput = input.toLowerCase();
    
      // Analyse context responses
      if (contextKey === 'analyse') {
        if (lowerInput.includes('explain') && lowerInput.includes('signal')) {
          return 'The "Onboarding confusion" signal is critical because 70% of trial churn occurs in days 8-12. Root cause: users struggle with device setup and content discovery. Recommended action: Launch onboarding tutorial campaign targeting Trial segment.';
        }
        if (lowerInput.includes('driving churn') || (lowerInput.includes('trial') && lowerInput.includes('segment'))) {
          return 'Trial segment churn is driven by: (1) Onboarding confusion (42% weight), (2) Content misalignment (28% weight), (3) Device setup issues (18% weight). Total 2,100 users at risk. Create intervention targeting these triggers?';
        }
        if (lowerInput.includes('create action') || lowerInput.includes('action for')) {
          return 'I can help create an action for the selected segment. Based on the signal matrix, I recommend the "Onboarding Personalisation" playbook for Trial users, expected +8.4% lift with 2.9× ROI. Should I open the action wizard?';
        }
        if (lowerInput.includes('compare') || lowerInput.includes('performance')) {
          return 'Comparing segments: Trial has highest churn risk (72%) but lowest CLTV. Established has lowest churn (0.85%) but highest revenue at risk. Focus on Trial for immediate impact, Established for revenue protection.';
        }
        if (lowerInput.includes('churn spike')) {
          return 'The latest churn spike occurred between 12–18 April, driven by billing retries and sports package downgrades. Consider targeted credits and in-app reassurance messaging.';
        }
        if (lowerInput.includes('signals') && lowerInput.includes('new')) {
          return 'New segment churn is driven by engagement drop-offs after week 3, payment churn retries, and login friction on connected TVs. Prioritize onboarding nudge journeys for these signals.';
        }
      }
      
      // Act context responses
      if (contextKey === 'act') {
        if (lowerInput.includes('underperforming') || lowerInput.includes('why is this campaign')) {
          return 'The "Loyalty Discount Campaign" is underperforming (Expected +12%, Actual +4.2%). Possible reasons: (1) Wrong segment targeting - too broad, (2) Timing issue - launched during competitor promotion, (3) Creative mismatch. Recommend: Pause campaign, adjust targeting to high-CLTV only, relaunch with updated creative.';
        }
        if (lowerInput.includes('recommend playbook') || (lowerInput.includes('playbook') && lowerInput.includes('trial'))) {
          return 'For Trial segment, recommend "Onboarding Personalisation" playbook. Expected +8.4% retention lift, 2.9× ROI. Similar campaigns showed +15% avg lift. Targets onboarding confusion and content misalignment triggers. Launch now?';
        }
        if (lowerInput.includes('clone') || lowerInput.includes('optimize')) {
          return 'Cloning "High CLTV Loyalty Upgrade" campaign. This campaign delivered +5.4% actual lift (exceeded +5.0% forecast). Optimizations: (1) Narrow segment to highest CLTV tier, (2) Extend campaign window, (3) Add concierge touchpoint. Ready to configure?';
        }
        if (lowerInput.includes('review') || lowerInput.includes('performance trends')) {
          return 'Performance trends: 6/8 campaigns on-track (75%), 2 underperforming. Best performer: "Ad-supported Downgrade Offer" (+4.6% actual vs +4.0% expected). Worst: "Loyalty Discount Campaign" (+4.2% vs +12% expected). Focus on optimizing underperformers.';
        }
        if (lowerInput.includes('worked best') && lowerInput.includes('last month')) {
          return 'The Loyalty Upgrade campaign delivered the strongest lift last month (+5.4% retention, 3.1× ROI). A/B experimentation also showed concierge outreach outperforming email by 1.8×.';
        }
      }
    if (lowerInput.includes('trial') || lowerInput.includes('risk')) {
      return "Found 2,100 trial-phase users inactive for 2+ weeks. Suggest personalized onboarding playlist + welcome call. Expected retention lift: +18%.";
    }
    if (lowerInput.includes('high-value') || lowerInput.includes('premium')) {
      return "Identified 840 high-value subscribers (CLTV >£500) showing 76% churn risk. Recommend loyalty discount + exclusive content access. Potential revenue save: £520K.";
    }
    if (lowerInput.includes('content')) {
      return "6,800 users show content fatigue. Top recommendation: Launch 'Discover Mode' with AI-curated playlists. Similar campaigns showed +10% retention.";
    }
    
      if (contextKey === 'analyse') {
        return 'I can explain root-cause signals, compare cohorts, or build a new investigative segment. What should we explore next?';
      }
      if (contextKey === 'act') {
        return 'Need a campaign comparison, a fresh playbook, or an automation trigger? Just ask and I’ll set it up.';
      }
      return "I've analyzed your query. Would you like me to create a targeted retention campaign for this segment?";
    },
    [contextKey]
  );

  const submitMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) {
        return;
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse: Message = {
          id: `${Date.now()}-ai`,
          role: 'ai',
          content: generateAIResponse(trimmed),
          actions: config.quickActions.map(({ label }) => ({
            label,
            onClick: () => submitMessage(label),
          })),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1200);
    },
    [config.quickActions, generateAIResponse]
  );

  const createIntroMessage = useCallback(
    (): Message => ({
      id: 'intro',
      role: 'ai',
      content: config.prompt,
      actions: config.quickActions.map(({ label }) => ({
        label,
        onClick: () => submitMessage(label),
      })),
    }),
    [config, submitMessage]
  );

  useEffect(() => {
    setMessages([createIntroMessage()]);
    setIsTyping(false);
    setInputValue('');
  }, [createIntroMessage]);

  const handleSendMessage = () => {
    submitMessage(inputValue);
  };

  return (
    <div className="glass-card rounded-xl p-6 flex flex-col overflow-hidden min-h-[700px] lg:min-h-[780px] lg:max-h-[calc(100vh-60px)]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3 pb-4 border-b border-sky-500/20">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center"
          >
            {/* Salesforce Agentforce Icon */}
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main Agent Symbol - Stylized "A" with modern tech design */}
              <path d="M24 4L8 14V28L24 38L40 28V14L24 4Z" fill="white" fillOpacity="0.9"/>
              <path d="M24 12L16 17V27L24 32L32 27V17L24 12Z" fill="url(#agentGradient)"/>
              <circle cx="24" cy="20" r="3" fill="white"/>
              <path d="M24 24L18 28H30L24 24Z" fill="white"/>
              <defs>
                <linearGradient id="agentGradient" x1="16" y1="12" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0ea5e9" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#3b82f6" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Agentforce
              <Sparkles size={16} className="text-sky-400" />
            </h2>
            <p className="text-gray-400 text-sm">Powered by Einstein AI</p>
          </div>
        </div>

        {onClose && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-2 text-sky-200 hover:bg-sky-500/20 transition-colors"
            aria-label="Close Agentforce panel"
          >
            <X size={16} />
          </motion.button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'ai' 
                  ? 'bg-gradient-to-br from-sky-400 to-blue-600' 
                  : 'bg-gradient-to-br from-purple-400 to-pink-600'
              }`}>
                {message.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
              </div>

              {/* Message Content */}
              <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`max-w-[80%] p-4 rounded-xl ${
                  message.role === 'ai'
                    ? 'bg-navy-900/50 border border-sky-500/20'
                    : 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/30'
                }`}>
                  <p className="text-gray-200 text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Action Buttons */}
                  {message.actions && message.role === 'ai' && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 px-3 py-1.5 rounded-lg border border-sky-500/30 transition-colors"
                        >
                          {action.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-navy-900/50 border border-sky-500/20 rounded-xl p-4">
              <div className="flex gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-sky-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-sky-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-sky-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-3">
        {config.quickActions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => submitMessage(action.label)}
            className="flex items-center gap-2 text-xs bg-navy-900/50 border border-sky-500/20 text-sky-300 px-3 py-2 rounded-lg hover:bg-sky-500/10 transition-colors"
          >
            {action.icon}
            {action.label}
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything about subscriber retention..."
          className="flex-1 bg-navy-900/50 border border-sky-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sky-400 transition-colors"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </motion.button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(14, 165, 233, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(14, 165, 233, 0.5);
        }
      `}</style>
    </div>
  );
}

