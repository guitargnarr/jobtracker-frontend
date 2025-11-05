/**
 * Animated Counter Component
 * Counts up from 0 to target value with easing
 */

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 1.5, suffix = '' }) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

export function AnimatedPercentage({ value, duration = 1.5 }) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    current.toFixed(1)
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <motion.span>{display}</motion.span>%
    </motion.span>
  );
}
