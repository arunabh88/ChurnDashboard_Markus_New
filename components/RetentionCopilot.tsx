'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, TrendingUp, Eye, Zap } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  actions?: Array<{ label: string; onClick: () => void }>;
}

export default function RetentionCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hi! I'm your Retention AI Agent. I can help you identify at-risk subscribers and suggest targeted retention strategies. What would you like to explore?",
      actions: [
        { label: 'Show trial-phase risks', onClick: () => {} },
        { label: 'High-value churners', onClick: () => {} },
        { label: 'Content engagement gaps', onClick: () => {} },
      ],
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: generateAIResponse(inputValue),
        actions: [
          { label: 'View Segment', onClick: () => {} },
          { label: 'Trigger Workflow', onClick: () => {} },
          { label: 'Run A/B Test', onClick: () => {} },
        ],
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('trial') || lowerInput.includes('risk')) {
      return "Found 2,100 trial-phase users inactive for 2+ weeks. Suggest personalized onboarding playlist + welcome call. Expected retention lift: +18%.";
    }
    if (lowerInput.includes('high-value') || lowerInput.includes('premium')) {
      return "Identified 840 high-value subscribers (CLTV >£500) showing 76% churn risk. Recommend loyalty discount + exclusive content access. Potential revenue save: £520K.";
    }
    if (lowerInput.includes('content')) {
      return "6,800 users show content fatigue. Top recommendation: Launch 'Discover Mode' with AI-curated playlists. Similar campaigns showed +10% retention.";
    }
    
    return "I've analyzed your query. Would you like me to create a targeted retention campaign for this segment?";
  };

  const quickActions = [
    { icon: <TrendingUp size={16} />, label: 'Show high-risk users' },
    { icon: <Eye size={16} />, label: 'Segment analysis' },
    { icon: <Zap size={16} />, label: 'Quick win opportunities' },
  ];

  return (
    <div className="glass-card rounded-xl p-6 h-[900px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sky-500/20">
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
        {quickActions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInputValue(action.label)}
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

