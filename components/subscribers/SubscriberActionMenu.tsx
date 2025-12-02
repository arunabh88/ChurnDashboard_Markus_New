'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Mail, BookOpen, Users, Eye, Flag, X } from 'lucide-react';
import { Subscriber } from '@/lib/data/subscribers';

interface SubscriberActionMenuProps {
  subscriber: Subscriber;
  onAction: (action: string, subscriber: Subscriber) => void;
  onClose?: () => void;
}

export function SubscriberActionMenu({ subscriber, onAction, onClose }: SubscriberActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const actions = [
    {
      id: 'email',
      label: 'Send Personalized Email',
      icon: <Mail size={16} />,
      available: true,
    },
    {
      id: 'playbook',
      label: 'Apply Retention Playbook',
      icon: <BookOpen size={16} />,
      available: subscriber.risk === 'Critical' || subscriber.risk === 'High' || subscriber.risk === 'Medium',
    },
    {
      id: 'campaign',
      label: 'Add to Campaign',
      icon: <Users size={16} />,
      available: true,
    },
    {
      id: 'profile',
      label: 'View Full Profile',
      icon: <Eye size={16} />,
      available: true,
    },
    {
      id: 'review',
      label: 'Mark for Review',
      icon: <Flag size={16} />,
      available: true,
    },
  ].filter((action) => action.available);

  const handleAction = (actionId: string) => {
    onAction(actionId, subscriber);
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/25 transition-colors"
      >
        Take Action
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 z-50 rounded-xl border border-sky-500/30 bg-navy-900/95 backdrop-blur-lg shadow-[0_12px_32px_rgba(8,47,73,0.4)] overflow-hidden"
            >
              <div className="p-2">
                {actions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.15)' }}
                    onClick={() => handleAction(action.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white rounded-lg transition-colors hover:bg-sky-500/15"
                  >
                    <span className="text-sky-400">{action.icon}</span>
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

