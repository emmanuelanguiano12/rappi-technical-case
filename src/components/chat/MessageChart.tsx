'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartData } from '@/lib/types';

const COLORS = ['#FF441A', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

interface Props {
  chart: ChartData;
}

/**
 * Renders a Recharts line or bar chart from structured chart_data returned by
 * the Bedrock Agent. Line charts are used for temporal trends; bar charts for
 * comparisons and rankings.
 */
export default function MessageChart({ chart }: Props) {
  const ChartComponent = chart.type === 'line' ? LineChart : BarChart;

  return (
    <div className="mt-3 p-3 bg-white rounded-xl border border-gray-200">
      <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
        {chart.title}
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <ChartComponent data={chart.data as Record<string, string | number>[]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey={chart.x_key}
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#111827',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F9FAFB',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {chart.series.map((s, i) =>
            chart.type === 'line' ? (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color ?? COLORS[i % COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ) : (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color ?? COLORS[i % COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}
