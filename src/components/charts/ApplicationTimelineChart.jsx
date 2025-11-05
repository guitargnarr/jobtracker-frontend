/**
 * Application Timeline Chart - Neubrutalism Edition
 * Shows application and response trends over time
 */

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { getTimeline } from '../../lib/api';
import { toast } from 'sonner';

export default function ApplicationTimelineChart({ delay = 0 }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const result = await getTimeline(6);

      // Transform data for recharts
      const chartData = result.labels.map((label, index) => ({
        month: label,
        Applications: result.applications[index],
        Responses: result.responses[index],
      }));

      setData(chartData);
    } catch (error) {
      toast.error('Failed to load timeline');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse text-slate-400 text-lg font-bold">Loading timeline...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Career Velocity Analysis™
              </CardTitle>
              <p className="text-base text-slate-600 mt-1 font-medium">
                AI-powered longitudinal momentum tracking with predictive engagement forecasting
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                strokeWidth={2}
              />
              <XAxis
                dataKey="month"
                stroke="#0f172a"
                strokeWidth={2}
                tick={{ fill: '#0f172a', fontWeight: 600, fontSize: 12 }}
              />
              <YAxis
                stroke="#0f172a"
                strokeWidth={2}
                tick={{ fill: '#0f172a', fontWeight: 600, fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '3px solid #0f172a',
                  borderRadius: '0.5rem',
                  boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 1)',
                  fontWeight: 600,
                }}
                labelStyle={{ fontWeight: 700, color: '#0f172a' }}
              />
              <Legend
                wrapperStyle={{ fontWeight: 700 }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="Applications"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{
                  fill: '#2563eb',
                  strokeWidth: 3,
                  r: 6,
                  stroke: '#0f172a'
                }}
                activeDot={{
                  r: 8,
                  stroke: '#0f172a',
                  strokeWidth: 3
                }}
              />
              <Line
                type="monotone"
                dataKey="Responses"
                stroke="#22c55e"
                strokeWidth={4}
                dot={{
                  fill: '#22c55e',
                  strokeWidth: 3,
                  r: 6,
                  stroke: '#0f172a'
                }}
                activeDot={{
                  r: 8,
                  stroke: '#0f172a',
                  strokeWidth: 3
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
