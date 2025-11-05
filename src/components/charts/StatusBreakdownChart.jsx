/**
 * Status Breakdown Chart - Neubrutalism Pie Chart
 * Shows distribution of application statuses
 */

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { PieChartIcon } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { getStatusBreakdown } from '../../lib/api';
import { toast } from 'sonner';

// Neubrutalism color palette
const COLORS = [
  '#2563eb', // Corporate blue
  '#22c55e', // Synergy green
  '#f59e0b', // Warning amber
  '#ef4444', // Danger red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#84cc16', // Lime
];

export default function StatusBreakdownChart({ delay = 0 }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatusBreakdown();
  }, []);

  const fetchStatusBreakdown = async () => {
    try {
      const result = await getStatusBreakdown();

      // Transform data for recharts
      const chartData = result.map((item) => ({
        name: item.status,
        value: item.count,
        percentage: item.percentage,
      }));

      setData(chartData);
    } catch (error) {
      toast.error('Failed to load status breakdown');
    } finally {
      setLoading(false);
    }
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#0f172a"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-black text-sm"
        stroke="#fff"
        strokeWidth={3}
        paintOrder="stroke"
      >
        {`${percentage.toFixed(1)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse text-slate-400 text-lg font-bold">Loading breakdown...</div>
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
                <PieChartIcon className="w-6 h-6 text-purple-600" />
                Pipeline Segmentation Matrix™
              </CardTitle>
              <p className="text-base text-slate-600 mt-1 font-medium">
                Real-time opportunity lifecycle distribution with advanced categorization
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                stroke="#0f172a"
                strokeWidth={3}
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '3px solid #0f172a',
                  borderRadius: '0.5rem',
                  boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 1)',
                  fontWeight: 600,
                }}
                formatter={(value, name, props) => [
                  `${value} (${props.payload.percentage}%)`,
                  name
                ]}
              />
              <Legend
                wrapperStyle={{ fontWeight: 700 }}
                iconType="circle"
                formatter={(value, entry) => (
                  <span className="font-bold text-slate-900">
                    {value}: {entry.payload.value} ({entry.payload.percentage}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
