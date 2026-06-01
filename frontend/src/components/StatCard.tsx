import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  delta: string;
  icon: LucideIcon;
  colorClass: string;
}

export default function StatCard({ title, value, subtitle, delta, icon: Icon, colorClass }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className={`rounded-2xl p-3 ${colorClass} text-white`}> 
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>{subtitle}</span>
        <span className="font-semibold text-slate-900">{delta}</span>
      </div>
    </div>
  );
}
