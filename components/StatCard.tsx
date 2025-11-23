import * as React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  status: 'success' | 'warning' | 'danger' | 'neutral';
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subValue, icon: Icon, status, trend }) => {
  const statusColors = {
    success: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    warning: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    danger: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    neutral: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  };

  const iconColors = {
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    danger: 'text-rose-500',
    neutral: 'text-blue-500',
  };

  return (
    <div className={`p-6 rounded-xl border backdrop-blur-sm bg-slate-900/50 ${statusColors[status].split(' ')[2]} transition-all hover:shadow-lg hover:shadow-slate-900/20`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{value}</h3>
            {subValue && <span className="text-sm text-slate-500">{subValue}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${statusColors[status].split(' ')[1]}`}>
          <Icon className={`w-6 h-6 ${iconColors[status]}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-slate-800">
            <p className={`text-xs font-medium ${status === 'danger' ? 'text-rose-400' : 'text-slate-400'}`}>
                {trend}
            </p>
        </div>
      )}
    </div>
  );
};

export default StatCard;