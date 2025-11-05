/**
 * Modal Component - Enterprise-Grade Dialog System™
 * Neubrutalism styling with maximum synergy
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`${maxWidth} w-full pointer-events-auto`}
            >
              <div className="bg-white border-4 border-slate-900 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b-3 border-slate-900 bg-gradient-to-r from-blue-50 to-green-50">
                  <h2 className="text-2xl font-black text-slate-900">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-lg border-2 border-slate-900 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
