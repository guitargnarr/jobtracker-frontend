/**
 * Header Component with Mode Toggle
 */

import { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BarChart3, Users } from 'lucide-react';
import { getAuthStatus, setAuthMode } from '../../lib/api';
import Button from '../ui/Button';
import { toast } from 'sonner';

export default function Header() {
  const [mode, setMode] = useState('demo');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial auth status
    getAuthStatus()
      .then((data) => setMode(data.mode))
      .catch((error) => console.error('Failed to fetch auth status:', error));
  }, []);

  const toggleMode = async () => {
    setLoading(true);
    const newMode = mode === 'demo' ? 'real' : 'demo';

    try {
      const data = await setAuthMode(newMode);
      setMode(data.mode);
      toast.success(
        data.mode === 'demo'
          ? '🎭 Switched to Demo Mode - Fake data loaded'
          : '🔒 Switched to Real Mode - Live data loaded'
      );
    } catch (error) {
      toast.error('Failed to switch mode');
    } finally {
      setLoading(false);
    }
  };

  const isDemoMode = mode === 'demo';

  return (
    <header className="bg-white border-b-3 border-slate-900 shadow-brutal-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-corporate-600 rounded-lg border-2 border-slate-900 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Synergy Dashboard™ 3000
                </h1>
                <p className="text-xs text-slate-600">
                  Leveraging Paradigm Shifts
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLinkItem to="/" icon={<BarChart3 className="w-4 h-4" />}>
              Dashboard
            </NavLinkItem>
            <NavLinkItem to="/applications" icon={<Users className="w-4 h-4" />}>
              Applications
            </NavLinkItem>
          </nav>

          {/* Mode Toggle */}
          <div className="flex items-center gap-4">
            {isDemoMode && (
              <div className="hidden sm:block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border-2 border-slate-900">
                🎭 Demo Mode
              </div>
            )}

            <Button
              variant={isDemoMode ? 'synergy' : 'secondary'}
              size="sm"
              onClick={toggleMode}
              loading={loading}
            >
              {isDemoMode ? 'Switch to Real Data' : 'Switch to Demo'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLinkItem({ to, icon, children }) {
  return (
    <RouterNavLink to={to}>
      {({ isActive }) => (
        <motion.div
          className={`flex items-center gap-2 font-bold transition-all ${
            isActive
              ? 'text-corporate-600 border-b-3 border-corporate-600 pb-1'
              : 'text-slate-700 hover:text-corporate-600'
          }`}
          whileHover={{ y: -2 }}
        >
          {icon}
          {children}
        </motion.div>
      )}
    </RouterNavLink>
  );
}
