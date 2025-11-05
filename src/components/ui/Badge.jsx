/**
 * Badge Component
 */

import { cn } from '../../lib/utils';

export default function Badge({ children, className, variant = 'default' }) {
  return (
    <span className={cn('badge', className)}>
      {children}
    </span>
  );
}
