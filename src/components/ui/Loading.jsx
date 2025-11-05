/**
 * Loading Components
 */

import { cn } from '../../lib/utils';

export function LoadingSpinner({ size = 'md', className }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          sizes[size],
          'border-4 border-slate-300 border-t-corporate-600 rounded-full animate-spin'
        )}
      />
    </div>
  );
}

export function LoadingSkeleton({ className }) {
  return <div className={cn('skeleton', className)} />;
}

export function LoadingCard() {
  return (
    <div className="card space-y-4">
      <LoadingSkeleton className="h-6 w-1/3" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-2/3" />
      <LoadingSkeleton className="h-8 w-1/4" />
    </div>
  );
}

export function LoadingTable() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <LoadingSkeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}
