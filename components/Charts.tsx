import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { NetworkData, HardwareData } from '../types';

// --- Zone B: Civil Works Progress ---
interface CivilWorksChartProps {
  data: Array<{ name: string; value: number; fill: string }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-slate-200 font-medium">{label}</p>
        <p className="text-blue-400 font-bold">
          {new Intl.NumberFormat('en-US').format(payload[0].value)} m
        </p>
      </div>
    );
  }
  return null;
};

export const CivilWorksChart: React.FC<CivilWorksChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickFormatter={(val) => `${val / 1000}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.2 }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Zone C: Network Split ---
interface NetworkChartProps {
  data: NetworkData[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const NetworkDonutChart: React.FC<NetworkChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
             itemStyle={{ color: '#f1f5f9' }}
             formatter={(val: number) => new Intl.NumberFormat('en-US').format(val) + ' m'}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-8">
         <span className="text-xs text-slate-400">Total Network</span>
         <br/>
         <span className="text-lg font-bold text-white">124k</span>
      </div>
    </div>
  );
};

// --- Zone D: Hardware Assets ---
interface HardwareChartProps {
  data: HardwareData[];
}

export const HardwareChart: React.FC<HardwareChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} horizontal={true} vertical={true} />
          <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
          <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontWeight: 600 }} width={60} />
          <Tooltip 
             cursor={{ fill: '#334155', opacity: 0.2 }}
             contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
          />
          <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]}>
             {/* Note: Using a log scale in real app might be better given the disparity, but linear is honest here */}
             <Cell fill="#8b5cf6" /> {/* Poles */}
             <Cell fill="#ec4899" /> {/* HH */}
             <Cell fill="#14b8a6" /> {/* FDT */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};