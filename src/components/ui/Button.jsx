/**
 * Button Component - Neubrutalism Style
 */

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = 'btn';

  const variants = {
    primary: 'btn-primary',
    synergy: 'btn-synergy',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
