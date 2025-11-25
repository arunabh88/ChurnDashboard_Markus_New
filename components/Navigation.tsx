'use client';

import { motion } from 'framer-motion';
import { Home, LineChart, Rocket, Settings, Bell, User, Sun, Moon, Bot } from 'lucide-react';
import { useTheme } from '@/app/providers';
import { useState, useEffect, type ReactNode } from 'react';

interface NavigationProps {
  activeTab: 'dashboard' | 'analyse' | 'act';
  onTabChange: (tab: 'dashboard' | 'analyse' | 'act') => void;
  copilotOpen: boolean;
  onToggleCopilot: () => void;
}

export default function Navigation({ activeTab, onTabChange, copilotOpen, onToggleCopilot }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems: Array<{ label: string; icon: ReactNode; id: NavigationProps['activeTab']; description: string }> = [
    { label: 'Dashboard', icon: <Home size={18} />, id: 'dashboard', description: 'Pulse & focus' },
    { label: 'Analyse', icon: <LineChart size={18} />, id: 'analyse', description: 'Deep dive' },
    { label: 'Act', icon: <Rocket size={18} />, id: 'act', description: 'Playbooks' },
  ];

  return (
    <nav className="glass-card border-b border-sky-500/20 mb-6 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center gap-8">
            {/* Sky TV Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center sky-tv-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sky-tv-icon">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sky TV</h1>
                <p className="text-xs text-gray-400">Retention Intelligence</p>
              </div>
            </motion.div>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all border ${
                    activeTab === item.id
                      ? 'border-sky-500/50 bg-sky-500/15 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">{item.label}</span>
                    <span className="text-[11px] text-gray-500">{item.description}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            )}

            {/* AI Co-Pilot Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleCopilot}
              className={`flex items-center justify-center px-3 py-2 rounded-lg border transition-colors ${
                copilotOpen
                  ? 'border-sky-500/60 bg-sky-500/20 text-sky-200'
                  : 'border-sky-500/20 text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              aria-label={copilotOpen ? 'Hide AI Co-Pilot' : 'Show AI Co-Pilot'}
              title={copilotOpen ? 'Hide AI Co-Pilot' : 'Show AI Co-Pilot'}
            >
              <Bot size={18} />
              <span className="sr-only">{copilotOpen ? 'Hide Co-Pilot' : 'Show Co-Pilot'}</span>
            </motion.button>

            {/* Notifications */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Settings */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors hidden md:block"
              aria-label="Settings"
            >
              <Settings size={20} />
            </motion.button>

            {/* User Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 pl-3 border-l border-sky-500/20"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">Retention Manager</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-sky-400 transition-all">
                <User size={20} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="px-4 pb-3 lg:hidden">
        <div className="flex items-center gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.label}
                onClick={() => onTabChange(item.id)}
                className={`flex min-w-[120px] flex-col items-start rounded-xl border px-4 py-3 text-left transition-colors ${
                  active
                    ? 'border-sky-500/40 bg-sky-500/15 text-sky-100'
                    : 'border-transparent bg-white/5 text-gray-300'
                }`}
              >
                <span className="text-sm font-semibold">{item.label}</span>
                <span className="text-[11px] text-gray-400">{item.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

