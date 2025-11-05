/**
 * Dashboard Page - ENHANCED WITH VISUAL SUPERPOWERS
 */

import { useState, useEffect } from 'react';
import { TrendingUp, Users, CheckCircle2, AlertTriangle, Mail, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getDashboardStats, triggerGmailScan } from '../lib/api';
import { formatDate } from '../lib/utils';
import { getStatusColor } from '../lib/constants';
import StatCard from '../components/dashboard/StatCard';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { LoadingCard } from '../components/ui/Loading';
import ApplicationTimelineChart from '../components/charts/ApplicationTimelineChart';
import StatusBreakdownChart from '../components/charts/StatusBreakdownChart';
import SourceBreakdownChart from '../components/charts/SourceBreakdownChart';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import useKonamiCode from '../hooks/useKonamiCode';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [synergyPoints, setSynergyPoints] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [godMode, setGodMode] = useState(false);

  // KONAMI CODE: ↑↑↓↓←→←→BA
  useKonamiCode(() => {
    setGodMode(true);
    setSynergyPoints(prev => prev + 9999);

    // EPIC CONFETTI STORM
    const duration = 5000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: Math.random(), x: Math.random() }
      });
    }, 100);

    toast.success('🎮 KONAMI CODE ACTIVATED!', {
      description: 'GOD MODE ENABLED • Synergy +9999 • Maximum Career Velocity Unlocked • You are now unstoppable',
      duration: 10000,
    });

    setTimeout(() => {
      toast.info('🏆 ULTIMATE ACHIEVEMENT', {
        description: 'You found the secret. Your networking prowess is now INFINITE. All paradigms have been shifted.',
      });
    }, 2000);
  });

  useEffect(() => {
    fetchStats();
  }, []);

  // Trigger confetti for 100+ apps milestone
  useEffect(() => {
    if (stats && stats.total_applications >= 100 && !confettiTriggered) {
      setTimeout(() => {
        triggerMilestoneConfetti();
        setConfettiTriggered(true);
      }, 1500);
    }
  }, [stats, confettiTriggered]);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const handleGmailScan = async () => {
    setScanning(true);
    toast.info('🚀 Initiating AI-Powered Email Intelligence Scan™...', {
      description: 'Leveraging machine learning paradigms for maximum synergy extraction',
    });
    try {
      const result = await triggerGmailScan(14);
      toast.success('✨ ' + result.message, {
        description: `Synergized ${result.new_applications} career touchpoints. Engagement velocity: +${(result.new_applications * 3.7).toFixed(1)}%`,
      });
      fetchStats();
    } catch (error) {
      toast.error('⚠️ Synergy Synchronization Failed', {
        description: 'The paradigm shift encountered an unexpected disruption',
      });
    } finally {
      setScanning(false);
    }
  };

  // CHAOS INTERACTION HANDLERS
  const boostProductivity = () => {
    const boosts = [
      'Productivity +500%! (Results may vary)',
      'Synergy levels MAXIMIZED! 🚀',
      'Career momentum: UNSTOPPABLE',
      'LinkedIn engagement: LEGENDARY',
      'Networking power: OVER 9000!',
      'Resume optimization: COMPLETE',
      'Interview confidence: INFINITE',
      'Salary negotiations: MASTER LEVEL'
    ];
    toast.success(boosts[Math.floor(Math.random() * boosts.length)], {
      description: 'Your career trajectory has been permanently enhanced',
    });
  };

  const shareOnLinkedIn = () => {
    const messages = [
      'Excited to announce my Career Velocity™ Score reached 89! 🎯 #Synergy #Growth',
      'Just hit 100+ Career Touchpoints™! The grind never stops 💪 #JobSearch #Hustle',
      'My Engagement Velocity is at an all-time high! Thanks to AI-powered optimization 🚀',
      'Thrilled to share that my Pipeline Optimization Score is now in the top 8% globally! 📈'
    ];
    toast.info('📣 Preparing LinkedIn Post...', {
      description: messages[Math.floor(Math.random() * messages.length)],
    });
  };

  const earnSynergyPoints = () => {
    const points = Math.floor(Math.random() * 50) + 10;
    setSynergyPoints(prev => prev + points);
    setClickCount(prev => prev + 1);

    if (clickCount > 0 && clickCount % 10 === 0) {
      toast.success(`🏆 ACHIEVEMENT: ${clickCount} Clicks!`, {
        description: `You've earned ${synergyPoints} total Synergy Points™`,
      });
    }
  };

  const randomNotification = () => {
    const notifications = [
      { title: '📊 Market Analysis Complete', desc: 'Your career trajectory is optimal' },
      { title: '🎯 New Opportunity Detected', desc: 'AI found 3 perfect matches (maybe)' },
      { title: '💡 Pro Tip Unlocked', desc: 'Have you tried leveraging synergies?' },
      { title: '🚀 Engagement Spike', desc: 'Your profile views increased by 420%' },
      { title: '⚡ System Update', desc: 'Synergy coefficients recalculated' },
    ];
    const notif = notifications[Math.floor(Math.random() * notifications.length)];
    toast.info(notif.title, { description: notif.desc });
  };

  const triggerMilestoneConfetti = () => {
    // Epic confetti burst for 100+ milestone
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Show MAXIMUM SYNERGY celebration toast
    toast.success('🏆 ACHIEVEMENT UNLOCKED: "The Hustler"', {
      description: '100+ Career Touchpoints™! Your synergy coefficient has reached LEGENDARY status. Leadership +250%, Networking Prowess: EXCEPTIONAL',
      duration: 5000,
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* MARQUEE MADNESS - TOP TICKER */}
      <div className="marquee bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 border-4 border-slate-900 rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="marquee-content font-black text-lg text-slate-900">
          🚀 BREAKING: Career Synergy Levels at ALL-TIME HIGH • 💼 Market Disruption in Progress •
          ⚡ AI-Powered Optimization: ACTIVE • 🎯 Success Probability: 99.7% •
          📈 Engagement Velocity: EXPONENTIAL • 💡 Pro Tip: Leverage More Synergies •
          🏆 Achievement Unlocked: Professional Excellence • ✨ Paradigm Shift: COMPLETE •
          🔥 Your Network Effect: MAXIMIZED • 🎪 Corporate Buzzword Generator: ONLINE •
          🚀 BREAKING: Career Synergy Levels at ALL-TIME HIGH • 💼 Market Disruption in Progress •
        </div>
      </div>

      {/* Hero Section with MAXIMUM CORPORATE ENERGY */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex-1">
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles
              className="w-10 h-10 text-yellow-500 animate-pulse cursor-pointer shake-on-hover"
              onClick={() => {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.3 }
                });
                toast.success('✨ SPARKLE POWER ACTIVATED!', {
                  description: 'Your aura is now 300% more synergistic',
                });
              }}
              title="Click for instant synergy!"
            />
            <div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tight">
                Career Velocity™ Dashboard
              </h1>
              <p className="text-sm text-slate-500 font-bold mt-1">
                v3.0.0 Enterprise Edition • ISO 9001 Certified • AI-Powered
              </p>
            </div>
          </motion.div>
          <motion.p
            className="text-lg text-slate-600 font-medium"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Leveraging <span className="text-blue-600 font-bold">best-in-class paradigm shifts</span> to
            <span className="text-green-600 font-bold"> synergize career momentum</span> through
            <span className="text-purple-600 font-bold"> AI-driven optimization frameworks</span> 🚀
          </motion.p>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <Button
            variant="synergy"
            onClick={handleGmailScan}
            loading={scanning}
            className="text-lg px-6 py-3"
            title="Activate AI-Powered Email Intelligence Suite™"
          >
            <Mail className="w-5 h-5 mr-2" />
            {scanning ? 'Synergizing...' : 'Activate Gmail Sync™'}
          </Button>
        </motion.div>
      </motion.div>

      {/* INTERACTIVE CHAOS BUTTONS™ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-slate-900 to-slate-700 border-4 border-yellow-400 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={boostProductivity}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-black rounded-lg border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shake-on-hover"
          >
            🚀 BOOST PRODUCTIVITY
          </button>

          <button
            onClick={shareOnLinkedIn}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-black rounded-lg border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shake-on-hover"
          >
            📣 SHARE ON LINKEDIN
          </button>

          <button
            onClick={randomNotification}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-black rounded-lg border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shake-on-hover"
          >
            🔔 RANDOM INSIGHT
          </button>

          <button
            onClick={earnSynergyPoints}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-black rounded-lg border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all glow-pulse"
            title="Click for Synergy Points™ (They do absolutely nothing)"
          >
            ✨ EARN SYNERGY
          </button>
        </div>

        <div className="flex items-center gap-3">
          {godMode && (
            <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-lg border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] glow-pulse animate-pulse">
              👑 GOD MODE
            </div>
          )}
          <div className="px-4 py-2 bg-yellow-400 text-slate-900 font-black rounded-lg border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="rainbow-text">⚡ SYNERGY POINTS™: {synergyPoints.toLocaleString()}</span>
          </div>
          <div className="px-4 py-2 bg-green-400 text-slate-900 font-black rounded-lg border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            🎯 Clicks: {clickCount}
          </div>
        </div>
      </motion.div>

      {/* ACHIEVEMENT UNLOCKED: Peak Performance Banner */}
      {stats?.total_applications >= 100 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-50 via-green-50 to-blue-50 border-4 border-yellow-500 rounded-lg p-6
                     shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-green-200/20 animate-pulse" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl">🏆</div>
              <div>
                <h4 className="font-black text-2xl text-slate-900 mb-1">
                  ACHIEVEMENT UNLOCKED: "The Hustler" • 100+ Career Touchpoints
                </h4>
                <p className="text-lg text-slate-700 font-semibold">
                  Your <span className="text-purple-600">synergy coefficient</span> has reached
                  <span className="text-green-600"> exponential optimization levels</span>.
                  Leadership skills <span className="text-blue-600">+250%</span>. Networking prowess: <span className="text-yellow-600">LEGENDARY</span>! 🚀
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enterprise Performance Metrics™ - AI-POWERED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div title="Career Touchpoints™: A proprietary metric measuring your total professional engagement footprint across all channels. Higher numbers indicate increased market presence and networking synergy. (Translation: Number of jobs you applied to)"
             className="cursor-help">
          <StatCard
            title="Career Touchpoints™"
            value={stats?.total_applications || 0}
            subtitle="Lifetime networking synergy"
            icon={Users}
            color="corporate"
            delay={0}
          />
        </div>

        <div title="Engagement Velocity: The rate at which your professional brand generates reciprocal interest from target organizations. Calculated using advanced AI algorithms to predict future success trajectories. (Translation: What % of companies responded to you)"
             className="cursor-help">
          <StatCard
            title="Engagement Velocity"
            value={stats?.response_rate || 0}
            subtitle="Market penetration coefficient"
            icon={TrendingUp}
            color="synergy"
            isPercentage={true}
            delay={0.1}
          />
        </div>

        <div title="Pipeline Optimization: Active career opportunities currently in various stages of the recruitment lifecycle, representing potential value realization vectors awaiting conversion. (Translation: How many applications haven't been rejected yet)"
             className="cursor-help">
          <StatCard
            title="Pipeline Optimization"
            value={stats?.active_opportunities || 0}
            subtitle="Pending value streams"
            icon={CheckCircle2}
            color="warning"
            delay={0.2}
          />
        </div>

        <div title="Synergy Score™: A revolutionary AI-calculated index combining engagement velocity, market momentum, and paradigm shift coefficients to produce a holistic career trajectory assessment. (Translation: A completely made-up number calculated from response_rate × 2.5 + 42. It means absolutely nothing but looks impressive!)"
             className="cursor-help">
          <StatCard
            title="Synergy Score™"
            value={Math.round((stats?.response_rate || 0) * 2.5 + 42)}
            subtitle="AI-calculated momentum index"
            icon={Zap}
            color="danger"
            delay={0.3}
          />
        </div>
      </div>

      {/* AI-POWERED INSIGHTS™ - ENTERPRISE INTELLIGENCE SUITE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-4 border-purple-500 rounded-lg p-6
                   shadow-[6px_6px_0px_0px_rgba(147,51,234,1)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/10 to-blue-200/10 animate-pulse" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
            <div>
              <h3 className="text-2xl font-black text-slate-900">AI-Powered Career Intelligence™</h3>
              <p className="text-sm text-slate-600 font-bold">
                Powered by Synergy ML v3.0 • Neural Network Analysis • Real-time Optimization
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() => toast.info('📊 Drilling Down...', { description: 'Market Fit Score calculated using proprietary synergy algorithms across 47 data points including aura density, vibe check results, and cosmic alignment factors.' })}
              className="bg-white/80 rounded-lg p-4 border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-4px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all shake-on-hover"
            >
              <div className="text-sm font-bold text-slate-600 mb-1">Market Fit Score</div>
              <div className="text-3xl font-black text-purple-600">
                {Math.round(((stats?.response_rate || 0) * 1.8) + 67)}%
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">↗ +12% vs industry avg</div>
            </div>

            <div
              onClick={() => toast.info('🌐 Analyzing Network...', { description: 'Networking Power index measures your connection velocity, reach optimization, and handshake-to-opportunity conversion rate. Current status: LEGENDARY.' })}
              className="bg-white/80 rounded-lg p-4 border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-4px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all shake-on-hover"
            >
              <div className="text-sm font-bold text-slate-600 mb-1">Networking Power</div>
              <div className="text-3xl font-black text-blue-600">
                {Math.round((stats?.total_applications || 0) * 0.73 + 15)}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Top 8% globally</div>
            </div>

            <div
              onClick={() => toast.success('🚀 Momentum Check!', { description: 'Your career momentum is accelerating at 420% year-over-year. The paradigm has been shifted. Excellence is inevitable.' })}
              className="bg-white/80 rounded-lg p-4 border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-4px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all shake-on-hover"
            >
              <div className="text-sm font-bold text-slate-600 mb-1">Career Momentum</div>
              <div className="text-3xl font-black text-green-600">
                {Math.round((stats?.active_opportunities || 0) * 4.2 + 88)}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">🚀 Accelerating</div>
            </div>

            <div
              onClick={() => toast.success('🎯 Prediction Model', { description: 'Our neural network analyzed 100 billion data points to determine your success probability. Results: EXTREMELY LIKELY. (Disclaimer: Results based on vibes)' })}
              className="bg-white/80 rounded-lg p-4 border-3 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-4px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all shake-on-hover"
            >
              <div className="text-sm font-bold text-slate-600 mb-1">Success Probability</div>
              <div className="text-3xl font-black text-yellow-600">
                {Math.min(99, Math.round(((stats?.total_applications || 0) * 0.5) + 42))}%
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">ML prediction model</div>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-semibold mt-4 text-center">
            💡 Pro Tip: Our AI suggests focusing on {['LinkedIn', 'referrals', 'company websites', 'networking events'][Math.floor(Math.random() * 4)]} for maximum ROI.
            Your optimal application rate: {Math.round((stats?.total_applications || 0) / 30 + 3)}/week
          </p>
        </div>
      </motion.div>

      {/* Recent Career Initiatives™ - REAL-TIME INTELLIGENCE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black">Active Career Initiatives™</CardTitle>
                <p className="text-base text-slate-600 mt-1 font-medium">
                  Real-time strategic partnership engagement pipeline
                </p>
              </div>
              <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {stats?.recent_applications?.slice(0, 5).map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg
                             border-3 border-slate-300 hover:border-blue-500 transition-all duration-200
                             hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
                  whileHover={{ x: 4, y: -2 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-lg text-slate-900">
                        {app.Company}
                      </h4>
                      <Badge className={getStatusColor(app.Status)}>
                        {app.Status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <p className="text-base text-slate-700 font-medium">
                      {app.Position_Title}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Applied {formatDate(app.Date_Applied)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {stats?.recent_applications?.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <Users className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium">No applications yet. Start applying!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategic Partnership Leaderboard™ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Strategic Partnership Leaderboard™</CardTitle>
            <p className="text-base text-slate-600 mt-1 font-medium">
              Organizations receiving maximum synergy investment
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {stats?.top_companies?.slice(0, 5).map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-xl font-black
                      ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white border-3 border-yellow-700' :
                        index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white border-3 border-slate-600' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white border-3 border-orange-700' :
                        'bg-blue-100 text-blue-800 border-2 border-blue-600'}
                      shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    `}>
                      {index + 1}
                    </div>
                    <span className="font-bold text-lg text-slate-900">
                      {company.company}
                    </span>
                  </div>
                  <span className="text-base text-slate-700 font-bold px-4 py-2 bg-slate-100 rounded-full border-2 border-slate-900">
                    {company.count} {company.count === 1 ? 'app' : 'apps'}
                  </span>
                </motion.div>
              ))}

              {stats?.top_companies?.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <p className="text-lg font-medium">No data yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Charts Grid - THE DATA VISUALIZATION EXPLOSION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationTimelineChart delay={0.9} />
        <StatusBreakdownChart delay={1.0} />
      </div>

      {/* Full-width Source Breakdown */}
      <SourceBreakdownChart delay={1.1} />

      {/* BOTTOM STOCK TICKER - CAREER METRICS™ */}
      <div className="marquee bg-slate-900 border-4 border-green-400 rounded-lg p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="marquee-content marquee-fast font-black text-base text-green-400">
          📊 CRVEL: {Math.round((stats?.response_rate || 0) * 2.5 + 42)} (+{(Math.random() * 5).toFixed(1)}%) •
          💼 SYNRG: {Math.round((stats?.total_applications || 0) * 0.73 + 15)} (+{(Math.random() * 3).toFixed(1)}%) •
          🎯 ENGMT: {Math.round(((stats?.response_rate || 0) * 1.8) + 67)} (-{(Math.random() * 2).toFixed(1)}%) •
          🚀 MOMNT: {Math.round((stats?.active_opportunities || 0) * 4.2 + 88)} (+{(Math.random() * 7).toFixed(1)}%) •
          ⚡ NETPW: {synergyPoints} (+{(Math.random() * 10).toFixed(1)}%) •
          🏆 SUCCESS: {Math.min(99, Math.round(((stats?.total_applications || 0) * 0.5) + 42))}% (+{(Math.random() * 1).toFixed(2)}%) •
          💡 INSIGHT: {clickCount * 3} (+{(Math.random() * 15).toFixed(1)}%) •
          📈 TREND: BULLISH • 🎪 MARKET: OPTIMAL • 🌟 OUTLOOK: EXCEPTIONAL •
          📊 CRVEL: {Math.round((stats?.response_rate || 0) * 2.5 + 42)} (+{(Math.random() * 5).toFixed(1)}%) •
        </div>
      </div>

      {/* ROTATING MOTIVATIONAL WISDOM™ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-4 border-purple-600 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <p className="text-xl font-black text-purple-900 italic">
          💡 "{['Synergize or be synergized', 'Disrupt the paradigm before it disrupts you', 'There is no "I" in synergy (wait, yes there is)', 'Touch base to circle back and move the needle', 'Leverage your core competencies to maximize ROI', 'Think outside the box while staying in your lane', 'Failure is just success in the wrong direction', 'Every rejection is a redirection toward your ultimate synergy'][Math.floor(Date.now() / 10000) % 8]}"
        </p>
        <p className="text-sm font-bold text-purple-700 mt-2">
          — Career Velocity™ AI Wisdom Engine v3.0
        </p>
      </motion.div>

      {/* BOTTOM DISCLAIMER (THE JOKE) */}
      <div className="text-center p-4 bg-slate-100 border-3 border-slate-900 rounded-lg">
        <p className="text-xs font-bold text-slate-600">
          ⚠️ DISCLAIMER: All metrics are either real or hilariously fabricated for comedic effect.
          Synergy Points™ have no monetary value. Your mileage may vary. Side effects may include increased confidence,
          improved networking, and an urge to use "synergy" in every conversation. Results not guaranteed.
          Past performance does not indicate future synergy. For entertainment purposes only. 🎪
        </p>
      </div>
    </div>
  );
}
