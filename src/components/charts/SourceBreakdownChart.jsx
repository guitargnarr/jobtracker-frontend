/**
 * Source Breakdown Chart - Neubrutalism Bar Chart
 * Shows application sources and response rates
 */

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { getSourceBreakdown } from '../../lib/api';
import { toast } from 'sonner';

// Gradient colors for bars
const BAR_COLORS = [
  '#2563eb', // Corporate blue
  '#22c55e', // Synergy green
  '#f59e0b', // Warning amber
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
];

export default function SourceBreakdownChart({ delay = 0 }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSourceBreakdown();
  }, []);

  const fetchSourceBreakdown = async () => {
    try {
      const result = await getSourceBreakdown();

      // Transform data for recharts
      const chartData = result.map((item) => ({
        source: item.source,
        Applications: item.applications,
        Responses: item.responses,
        'Response Rate': item.response_rate,
      }));

      setData(chartData);
    } catch (error) {
      toast.error('Failed to load source breakdown');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse text-slate-400 text-lg font-bold">Loading sources...</div>
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
                <BarChart3 className="w-6 h-6 text-green-600" />
                Channel Performance Dashboard™
              </CardTitle>
              <p className="text-base text-slate-600 mt-1 font-medium">
                Multi-channel acquisition efficiency metrics with ROI optimization
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                strokeWidth={2}
              />
              <XAxis
                dataKey="source"
                stroke="#0f172a"
                strokeWidth={2}
                tick={{ fill: '#0f172a', fontWeight: 600, fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={80}
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
                formatter={(value, name) => {
                  if (name === 'Response Rate') {
                    return `${value}%`;
                  }
                  return value;
                }}
              />
              <Legend
                wrapperStyle={{ fontWeight: 700 }}
                iconType="square"
              />
              <Bar
                dataKey="Applications"
                fill="#2563eb"
                stroke="#0f172a"
                strokeWidth={2}
                radius={[8, 8, 0, 0]}
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
              <Bar
                dataKey="Responses"
                fill="#22c55e"
                stroke="#0f172a"
                strokeWidth={2}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Response Rate Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {data?.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.1 + index * 0.05 }}
                className="p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border-3 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-xs font-bold text-slate-600 mb-1">{source.source}</div>
                <div className="text-2xl font-black text-green-600">
                  {source['Response Rate']}%
                </div>
                <div className="text-xs text-slate-500 font-medium">response rate</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
