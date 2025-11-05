/**
 * Stat Card Component - ENHANCED VERSION
 * Now with huge numbers, gradients, and animations!
 */

import { motion } from 'framer-motion';
import Card from '../ui/Card';
import AnimatedCounter, { AnimatedPercentage } from '../ui/AnimatedCounter';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'corporate',
  isPercentage = false,
  delay = 0
}) {
  const colorSchemes = {
    corporate: {
      bg: 'from-blue-500/10 via-blue-400/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
      iconBorder: 'border-blue-600',
      numberColor: 'text-blue-600',
      glow: 'shadow-blue-500/20',
      ring: 'ring-blue-500/30',
    },
    synergy: {
      bg: 'from-green-500/10 via-green-400/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-700',
      iconBorder: 'border-green-600',
      numberColor: 'text-green-600',
      glow: 'shadow-green-500/20',
      ring: 'ring-green-500/30',
    },
    warning: {
      bg: 'from-yellow-500/10 via-yellow-400/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      iconBorder: 'border-yellow-600',
      numberColor: 'text-yellow-600',
      glow: 'shadow-yellow-500/20',
      ring: 'ring-yellow-500/30',
    },
    danger: {
      bg: 'from-red-500/10 via-red-400/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-red-500 to-red-700',
      iconBorder: 'border-red-600',
      numberColor: 'text-red-600',
      glow: 'shadow-red-500/20',
      ring: 'ring-red-500/30',
    },
  };

  const scheme = colorSchemes[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card className={`
        relative overflow-hidden h-full
        border-4 border-slate-900
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200
        cursor-pointer
        ${scheme.glow}
      `}>
        {/* Gradient Background Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.bg} pointer-events-none`} />

        {/* Decorative Corner */}
        <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${scheme.bg} opacity-50 blur-2xl`} />

        <div className="relative">
          {/* Icon and Trend Row */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`
                p-4 rounded-xl
                ${scheme.iconBg}
                border-3 border-slate-900
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
              `}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
            </motion.div>

            {trend !== undefined && (
              <motion.div
                className={`
                  px-3 py-1.5 rounded-full text-sm font-bold
                  ${trend > 0 ? 'bg-green-100 text-green-700 border-2 border-green-600' : 'bg-red-100 text-red-700 border-2 border-red-600'}
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.3, type: "spring" }}
              >
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </motion.div>
            )}
          </div>

          {/* HUGE Number */}
          <div className={`text-7xl font-black mb-3 ${scheme.numberColor} tracking-tight leading-none`}>
            {isPercentage ? (
              <AnimatedPercentage value={value} duration={1.5} />
            ) : (
              <AnimatedCounter value={value} duration={1.5} />
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm text-slate-600 font-medium">
              {subtitle}
            </p>
          )}

          {/* Pulse Animation Ring */}
          <motion.div
            className={`absolute inset-0 rounded-lg border-4 ${scheme.iconBorder} opacity-0`}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay,
            }}
          />
        </div>
      </Card>
    </motion.div>
  );
}
