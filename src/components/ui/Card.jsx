/**
 * Card Component - Neubrutalism Style
 */

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Card({
  children,
  className,
  hover = false,
  onClick,
  ...props
}) {
  const classes = cn(
    'card',
    hover && 'card-hover cursor-pointer',
    className
  );

  const Component = onClick ? motion.div : 'div';

  return (
    <Component
      className={classes}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-xl font-bold', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn('text-slate-600 text-sm mt-1', className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('mt-4 pt-4 border-t-2 border-slate-200', className)}>
      {children}
    </div>
  );
}
